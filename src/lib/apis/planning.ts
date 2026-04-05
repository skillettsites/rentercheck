/**
 * Planning applications data using the PlanIt API (free, no key required).
 * Finds recent planning applications within 500m of a location.
 */

export interface PlanningApplication {
  reference: string;
  description: string;
  type: string;
  status: string;
  dateReceived: string;
}

export interface PlanningData {
  totalRecent: number;
  applications: PlanningApplication[];
  types: { type: string; count: number }[];
  hasMajorDevelopment: boolean;
  note: string;
}

interface PlanItApplication {
  uid?: string;
  description?: string;
  app_type?: string;
  status?: string;
  date_received?: string;
  [key: string]: unknown;
}

interface PlanItResponse {
  records?: PlanItApplication[];
  count?: number;
}

function categoriseType(appType: string, description: string): string {
  const desc = (description || '').toLowerCase();
  const type = (appType || '').toLowerCase();

  if (desc.includes('dwelling') || desc.includes('residential') || desc.includes('house') || desc.includes('flat')) {
    return 'Residential';
  }
  if (desc.includes('commercial') || desc.includes('office') || desc.includes('shop') || desc.includes('retail')) {
    return 'Commercial';
  }
  if (desc.includes('extension') || desc.includes('loft') || desc.includes('conservatory')) {
    return 'Extension';
  }
  if (desc.includes('tree') || desc.includes('hedge')) {
    return 'Trees/Landscaping';
  }
  if (desc.includes('road') || desc.includes('infrastructure') || desc.includes('highway')) {
    return 'Infrastructure';
  }
  if (type.includes('full') || type.includes('outline')) {
    return 'Full/Outline';
  }
  return 'Other';
}

function isMajorDevelopment(description: string): boolean {
  const desc = (description || '').toLowerCase();
  return (
    desc.includes('demolition') ||
    desc.includes('major') ||
    desc.includes('erection of') ||
    /\b\d{2,}\s*(dwelling|flat|unit|house)/i.test(desc) ||
    desc.includes('mixed use') ||
    desc.includes('industrial')
  );
}

export async function getPlanningData(lat: number, lng: number): Promise<PlanningData> {
  try {
    const url = `https://www.planit.org.uk/api/applics/json?lat=${lat}&lng=${lng}&radius=500&recent=3months&limit=20`;

    const res = await fetch(url, {
      signal: AbortSignal.timeout(5000),
    });

    if (!res.ok) {
      throw new Error(`PlanIt API returned ${res.status}`);
    }

    const data: PlanItResponse = await res.json();
    const records = data.records || [];

    const applications: PlanningApplication[] = records.slice(0, 10).map((app) => ({
      reference: app.uid || 'N/A',
      description: (app.description || 'No description').substring(0, 120),
      type: categoriseType(app.app_type || '', app.description || ''),
      status: app.status || 'Unknown',
      dateReceived: app.date_received || 'Unknown',
    }));

    // Count types
    const typeCounts: Record<string, number> = {};
    for (const app of applications) {
      typeCounts[app.type] = (typeCounts[app.type] || 0) + 1;
    }
    const types = Object.entries(typeCounts)
      .map(([type, count]) => ({ type, count }))
      .sort((a, b) => b.count - a.count);

    const hasMajor = records.some((app) => isMajorDevelopment(app.description || ''));

    return {
      totalRecent: data.count || records.length,
      applications,
      types,
      hasMajorDevelopment: hasMajor,
      note: 'Planning applications from the last 3 months within 500m. Source: PlanIt.',
    };
  } catch {
    return {
      totalRecent: 0,
      applications: [],
      types: [],
      hasMajorDevelopment: false,
      note: 'Unable to fetch planning data at this time.',
    };
  }
}
