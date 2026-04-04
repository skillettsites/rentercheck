const BASE_URL = 'https://environment.data.gov.uk/flood-monitoring/id/floods';

export type FloodRiskLevel = 'low' | 'medium' | 'high';

export interface FloodArea {
  label: string;
  description: string;
  severity: string;
  severityLevel: number;
}

export interface FloodData {
  riskLevel: FloodRiskLevel;
  activeWarnings: number;
  nearestFloodArea: FloodArea | null;
  warnings: FloodArea[];
}

interface FloodApiItem {
  floodAreaID: string;
  description: string;
  severity: string;
  severityLevel: number;
  floodArea?: {
    label?: string;
    description?: string;
  };
}

interface FloodApiResponse {
  items: FloodApiItem[];
}

function determineSeverityLabel(level: number): string {
  switch (level) {
    case 1:
      return 'Severe Flood Warning';
    case 2:
      return 'Flood Warning';
    case 3:
      return 'Flood Alert';
    case 4:
      return 'Warning No Longer In Force';
    default:
      return 'Unknown';
  }
}

function determineRiskLevel(warnings: FloodArea[]): FloodRiskLevel {
  if (warnings.length === 0) {
    return 'low';
  }

  const hasSevere = warnings.some((w) => w.severityLevel <= 2);
  if (hasSevere) {
    return 'high';
  }

  return 'medium';
}

export async function getFloodRisk(lat: number, lng: number): Promise<FloodData | null> {
  try {
    const url = `${BASE_URL}?lat=${lat}&long=${lng}&dist=3`;

    const res = await fetch(url);

    if (!res.ok) {
      return null;
    }

    const data: FloodApiResponse = await res.json();
    const items = data.items ?? [];

    const warnings: FloodArea[] = items.map((item) => ({
      label: item.floodArea?.label ?? item.floodAreaID ?? 'Unknown area',
      description: item.description ?? item.floodArea?.description ?? '',
      severity: determineSeverityLabel(item.severityLevel),
      severityLevel: item.severityLevel,
    }));

    // Sort by severity (lowest number = most severe)
    warnings.sort((a, b) => a.severityLevel - b.severityLevel);

    const riskLevel = determineRiskLevel(warnings);
    const activeWarnings = warnings.filter((w) => w.severityLevel <= 3).length;
    const nearestFloodArea = warnings.length > 0 ? warnings[0] : null;

    return {
      riskLevel,
      activeWarnings,
      nearestFloodArea,
      warnings,
    };
  } catch {
    return null;
  }
}
