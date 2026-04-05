const BASE_URL = 'https://data.police.uk/api';

export interface CrimeBreakdown {
  category: string;
  label: string;
  count: number;
  percentage: number;
}

export interface CrimeData {
  totalCrimes: number;
  month: string;
  breakdown: CrimeBreakdown[];
  topCategories: CrimeBreakdown[];
}

const CATEGORY_LABELS: Record<string, string> = {
  'anti-social-behaviour': 'Anti-social Behaviour',
  burglary: 'Burglary',
  'criminal-damage-arson': 'Criminal Damage & Arson',
  drugs: 'Drugs',
  'other-theft': 'Other Theft',
  'vehicle-crime': 'Vehicle Crime',
  'violent-crime': 'Violent Crime',
  robbery: 'Robbery',
  shoplifting: 'Shoplifting',
  'public-order': 'Public Order',
  'possession-of-weapons': 'Possession of Weapons',
  'other-crime': 'Other Crime',
  'bicycle-theft': 'Bicycle Theft',
  'theft-from-the-person': 'Theft from the Person',
};

interface PoliceApiCrime {
  category: string;
  location_type: string;
  location: {
    latitude: string;
    longitude: string;
    street: { id: number; name: string };
  };
  context: string;
  outcome_status: { category: string; date: string } | null;
  persistent_id: string;
  id: number;
  month: string;
}

// Get the latest available month from the Police API
async function getLatestAvailableMonth(): Promise<string> {
  try {
    const res = await fetch(`${BASE_URL}/crime-last-updated`, {
      signal: AbortSignal.timeout(5000),
    });
    if (res.ok) {
      const data = await res.json();
      if (data.date) {
        // API returns "2026-01-01", we need "2025-12" (data is for month before the update date)
        const date = new Date(data.date);
        date.setMonth(date.getMonth() - 1);
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      }
    }
  } catch {
    // fall through
  }
  // Fallback: 3 months ago
  const now = new Date();
  now.setMonth(now.getMonth() - 3);
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
}

export async function getCrimeData(lat: number, lng: number): Promise<CrimeData | null> {
  try {
    const date = await getLatestAvailableMonth();
    const url = `${BASE_URL}/crimes-street/all-crime?lat=${lat}&lng=${lng}&date=${date}`;

    const res = await fetch(url, {
      signal: AbortSignal.timeout(10000),
    });

    if (!res.ok) {
      // Try one month earlier if the latest month isn't available
      const fallbackDate = new Date(date + '-01');
      fallbackDate.setMonth(fallbackDate.getMonth() - 1);
      const fallbackStr = `${fallbackDate.getFullYear()}-${String(fallbackDate.getMonth() + 1).padStart(2, '0')}`;

      const fallbackRes = await fetch(
        `${BASE_URL}/crimes-street/all-crime?lat=${lat}&lng=${lng}&date=${fallbackStr}`,
        { signal: AbortSignal.timeout(10000) }
      );

      if (!fallbackRes.ok) return null;

      const crimes: PoliceApiCrime[] = await fallbackRes.json();
      return buildCrimeData(crimes, fallbackStr);
    }

    const crimes: PoliceApiCrime[] = await res.json();
    return buildCrimeData(crimes, date);
  } catch {
    return null;
  }
}

function buildCrimeData(crimes: PoliceApiCrime[], date: string): CrimeData {
  const totalCrimes = crimes.length;

  if (totalCrimes === 0) {
    return { totalCrimes: 0, month: date, breakdown: [], topCategories: [] };
  }

  const counts: Record<string, number> = {};
  for (const crime of crimes) {
    counts[crime.category] = (counts[crime.category] ?? 0) + 1;
  }

  const breakdown: CrimeBreakdown[] = Object.entries(counts)
    .map(([category, count]) => ({
      category,
      label: CATEGORY_LABELS[category] ?? category.replace(/-/g, ' '),
      count,
      percentage: Math.round((count / totalCrimes) * 100),
    }))
    .sort((a, b) => b.count - a.count);

  return {
    totalCrimes,
    month: date,
    breakdown,
    topCategories: breakdown.slice(0, 5),
  };
}
