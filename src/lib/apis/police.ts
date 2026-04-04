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
    street: {
      id: number;
      name: string;
    };
  };
  context: string;
  outcome_status: {
    category: string;
    date: string;
  } | null;
  persistent_id: string;
  id: number;
  month: string;
}

function getDateTwoMonthsAgo(): string {
  const now = new Date();
  now.setMonth(now.getMonth() - 2);
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  return `${year}-${month}`;
}

export async function getCrimeData(lat: number, lng: number): Promise<CrimeData | null> {
  try {
    const date = getDateTwoMonthsAgo();
    const url = `${BASE_URL}/crimes-street/all-crime?lat=${lat}&lng=${lng}&date=${date}`;

    const res = await fetch(url);

    if (!res.ok) {
      return null;
    }

    const crimes: PoliceApiCrime[] = await res.json();
    const totalCrimes = crimes.length;

    if (totalCrimes === 0) {
      return {
        totalCrimes: 0,
        month: date,
        breakdown: [],
        topCategories: [],
      };
    }

    // Count by category
    const counts: Record<string, number> = {};
    for (const crime of crimes) {
      const cat = crime.category;
      counts[cat] = (counts[cat] ?? 0) + 1;
    }

    // Build breakdown sorted by count descending
    const breakdown: CrimeBreakdown[] = Object.entries(counts)
      .map(([category, count]) => ({
        category,
        label: CATEGORY_LABELS[category] ?? category.replace(/-/g, ' '),
        count,
        percentage: Math.round((count / totalCrimes) * 100),
      }))
      .sort((a, b) => b.count - a.count);

    const topCategories = breakdown.slice(0, 5);

    return {
      totalCrimes,
      month: date,
      breakdown,
      topCategories,
    };
  } catch {
    return null;
  }
}
