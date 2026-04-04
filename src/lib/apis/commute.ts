/**
 * Commute analysis helper module.
 * Geocodes two UK postcodes via postcodes.io, then estimates journey time,
 * cost, and carbon for driving, public transport, cycling, and walking.
 */

import { lookupPostcode, type PostcodeResult } from './postcodes';

// ── Types ────────────────────────────────────────────────────────────────────

export type TransportMode = 'driving' | 'publicTransport' | 'cycling' | 'walking';

export interface StationResult {
  name: string;
  distance: number; // metres
}

export interface ModeEstimate {
  mode: TransportMode;
  label: string;
  journeyMinutes: number;
  monthlyCost: number;
  annualCost: number;
  co2PerYear: number; // kg
  practical: boolean;
  note: string;
  pros: string[];
  cons: string[];
}

export interface CommuteReport {
  home: PostcodeResult;
  work: PostcodeResult;
  straightLineMiles: number;
  estimatedDrivingMiles: number;
  estimates: ModeEstimate[];
  homeStations: StationResult[];
  workStations: StationResult[];
  verdict: {
    bestValue: ModeEstimate | null;
    fastest: ModeEstimate | null;
    bestBalance: ModeEstimate | null;
  };
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function haversineDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371000; // metres
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function metresToMiles(m: number): number {
  return m / 1609.344;
}

function isLondon(region: string): boolean {
  return region?.toLowerCase() === 'london';
}

// ── Station Lookup (Overpass API) ────────────────────────────────────────────

interface OverpassElement {
  type: string;
  id: number;
  lat: number;
  lon: number;
  tags?: Record<string, string>;
  center?: { lat: number; lon: number };
}

interface OverpassResponse {
  elements: OverpassElement[];
}

async function fetchNearbyStations(
  lat: number,
  lng: number,
  radiusMetres: number
): Promise<StationResult[]> {
  try {
    const query = `[out:json][timeout:10];(node["railway"="station"](around:${radiusMetres},${lat},${lng});node["railway"="halt"](around:${radiusMetres},${lat},${lng});node["station"="subway"](around:${radiusMetres},${lat},${lng}););out;`;
    const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;
    const res = await fetch(url, { signal: AbortSignal.timeout(12000) });
    if (!res.ok) return [];
    const data: OverpassResponse = await res.json();

    const stations: StationResult[] = [];
    const seen = new Set<string>();

    for (const el of data.elements) {
      const name = el.tags?.name;
      if (!name) continue;
      const key = name.toLowerCase();
      if (seen.has(key)) continue;
      seen.add(key);

      const elLat = el.lat ?? el.center?.lat ?? lat;
      const elLng = el.lon ?? el.center?.lon ?? lng;
      const dist = haversineDistance(lat, lng, elLat, elLng);
      stations.push({ name, distance: Math.round(dist) });
    }

    return stations.sort((a, b) => a.distance - b.distance);
  } catch {
    return [];
  }
}

// ── Cost Helpers ─────────────────────────────────────────────────────────────

function estimateDrivingCost(
  distanceMiles: number,
  homeRegion: string
): number {
  const returnMiles = distanceMiles * 2;
  const fuelAndWear = returnMiles * 22 * 0.15;
  const isUrban =
    isLondon(homeRegion) ||
    ['West Midlands', 'Greater Manchester'].includes(homeRegion);
  const dailyParking = isUrban ? 12 : 6;
  const parking = dailyParking * 22;
  return Math.round(fuelAndWear + parking);
}

function estimatePublicTransportCost(
  distanceMiles: number,
  homeRegion: string,
  workRegion: string
): number {
  const bothLondon = isLondon(homeRegion) && isLondon(workRegion);
  if (bothLondon) {
    if (distanceMiles <= 5) return 160; // Zone 1-2
    if (distanceMiles <= 10) return 190; // Zone 1-3
    if (distanceMiles <= 15) return 230; // Zone 1-4
    if (distanceMiles <= 20) return 270; // Zone 1-5
    return 310; // Zone 1-6
  }
  if (isLondon(homeRegion) || isLondon(workRegion)) {
    // Train + tube combo
    return Math.round(distanceMiles * 0.25 * 2 * 22 + 80);
  }
  if (distanceMiles < 5) return 70; // Bus pass
  // National rail estimate
  return Math.round(distanceMiles * 0.25 * 2 * 22);
}

// ── Mode Estimators ──────────────────────────────────────────────────────────

function estimateDriving(
  drivingMiles: number,
  homeRegion: string
): ModeEstimate {
  const avgSpeedMph = 30;
  const journeyMinutes = Math.round((drivingMiles / avgSpeedMph) * 60);
  const monthlyCost = estimateDrivingCost(drivingMiles, homeRegion);
  const annualCost = monthlyCost * 12;
  const co2 = Math.round(drivingMiles * 2 * 22 * 12 * 0.21);

  return {
    mode: 'driving',
    label: 'Driving',
    journeyMinutes,
    monthlyCost,
    annualCost,
    co2PerYear: co2,
    practical: true,
    note: `Based on an average speed of ${avgSpeedMph}mph.`,
    pros: [
      'Door-to-door convenience',
      'Flexible departure times',
      'Comfortable in bad weather',
    ],
    cons: [
      'Parking costs add up quickly',
      'Traffic can be unpredictable',
      'Highest carbon footprint',
      monthlyCost > 300 ? 'Very expensive monthly cost' : 'Fuel and maintenance costs',
    ],
  };
}

function estimatePublicTransport(
  straightLineMiles: number,
  homeRegion: string,
  workRegion: string
): ModeEstimate {
  let avgSpeedMph: number;
  let note: string;

  const bothLondon = isLondon(homeRegion) && isLondon(workRegion);
  const oneLondon = isLondon(homeRegion) || isLondon(workRegion);
  const sameRegion = homeRegion === workRegion;

  if (bothLondon) {
    avgSpeedMph = 15;
    note = 'Estimated for Tube/bus travel including waiting time.';
  } else if (oneLondon) {
    avgSpeedMph = 30;
    note = 'Estimated for train + Tube including connections.';
  } else if (sameRegion) {
    avgSpeedMph = 25;
    note = 'Estimated for local bus or train travel.';
  } else {
    avgSpeedMph = 50;
    note = 'Estimated for inter-city train with 30 minutes for connections.';
  }

  const baseMins = Math.round((straightLineMiles / avgSpeedMph) * 60);
  const walkToStation = 15;
  const connectionTime = !sameRegion && !bothLondon ? 30 : 0;
  const journeyMinutes = baseMins + walkToStation + connectionTime;

  const monthlyCost = estimatePublicTransportCost(
    straightLineMiles,
    homeRegion,
    workRegion
  );
  const annualCost = monthlyCost * 12;
  const co2 = Math.round(straightLineMiles * 2 * 22 * 12 * 0.06);

  return {
    mode: 'publicTransport',
    label: 'Public Transport',
    journeyMinutes,
    monthlyCost,
    annualCost,
    co2PerYear: co2,
    practical: true,
    note,
    pros: [
      'Lower carbon footprint than driving',
      'Can use travel time productively',
      'No parking worries',
      bothLondon ? 'Frequent services in London' : 'Often cheaper than driving',
    ],
    cons: [
      'Less flexible on timing',
      'Can be crowded at peak times',
      journeyMinutes > 60 ? 'Long journey time' : 'Depends on service reliability',
      'Walking to and from stations in bad weather',
    ],
  };
}

function estimateCycling(straightLineMiles: number): ModeEstimate {
  const avgSpeedMph = 12;
  const journeyMinutes = Math.round((straightLineMiles / avgSpeedMph) * 60);
  const practical = straightLineMiles <= 15;
  const longCommute = straightLineMiles > 10;
  const eBikeNote = straightLineMiles > 5
    ? ' An e-bike could make this more comfortable.'
    : '';

  let note = `Based on average cycling speed of ${avgSpeedMph}mph.`;
  if (longCommute) {
    note += ' This is a long cycle commute; consider it carefully.';
  }
  note += eBikeNote;

  return {
    mode: 'cycling',
    label: 'Cycling',
    journeyMinutes,
    monthlyCost: 10,
    annualCost: 120,
    co2PerYear: 0,
    practical,
    note,
    pros: [
      'Virtually free commute',
      'Great exercise and health benefits',
      'Zero carbon emissions',
      'No traffic jams (can be faster in cities)',
    ],
    cons: [
      'Weather dependent',
      'Requires secure bike storage at work',
      longCommute ? 'Long distance; may arrive tired' : 'Need to change clothes at work',
      'Less practical for carrying heavy items',
    ],
  };
}

function estimateWalking(straightLineMiles: number): ModeEstimate {
  const avgSpeedMph = 3.5;
  const journeyMinutes = Math.round((straightLineMiles / avgSpeedMph) * 60);
  const practical = straightLineMiles <= 5;

  return {
    mode: 'walking',
    label: 'Walking',
    journeyMinutes,
    monthlyCost: 0,
    annualCost: 0,
    co2PerYear: 0,
    practical,
    note: practical
      ? `Based on walking speed of ${avgSpeedMph}mph.`
      : 'Not practical for this distance. Consider cycling or public transport instead.',
    pros: practical
      ? [
          'Completely free',
          'Best possible exercise',
          'Zero carbon emissions',
          'No equipment or tickets needed',
        ]
      : ['Free and healthy, but too far for a daily commute'],
    cons: practical
      ? [
          'Weather dependent',
          'Slower than all other modes',
          journeyMinutes > 30 ? 'Takes a significant chunk of your morning' : 'Limited by distance',
          'Difficult with heavy bags',
        ]
      : ['Not practical for this distance'],
  };
}

// ── Main Function ────────────────────────────────────────────────────────────

export async function generateCommuteReport(
  homePostcode: string,
  workPostcode: string,
  modes: TransportMode[]
): Promise<CommuteReport | null> {
  const [home, work] = await Promise.all([
    lookupPostcode(homePostcode),
    lookupPostcode(workPostcode),
  ]);

  if (!home || !work) return null;

  const straightLineMetres = haversineDistance(home.lat, home.lng, work.lat, work.lng);
  const straightLineMiles = metresToMiles(straightLineMetres);
  const estimatedDrivingMiles = straightLineMiles * 1.3;

  // Build estimates for each selected mode
  const estimates: ModeEstimate[] = [];

  if (modes.includes('driving')) {
    estimates.push(estimateDriving(estimatedDrivingMiles, home.region));
  }
  if (modes.includes('publicTransport')) {
    estimates.push(
      estimatePublicTransport(straightLineMiles, home.region, work.region)
    );
  }
  if (modes.includes('cycling')) {
    estimates.push(estimateCycling(straightLineMiles));
  }
  if (modes.includes('walking')) {
    estimates.push(estimateWalking(straightLineMiles));
  }

  // Fetch nearby stations in parallel
  const [homeStations, workStations] = await Promise.all([
    fetchNearbyStations(home.lat, home.lng, 2000),
    fetchNearbyStations(work.lat, work.lng, 1000),
  ]);

  // Compute verdict
  const practicalEstimates = estimates.filter((e) => e.practical);

  const cheapest = practicalEstimates.length > 0
    ? practicalEstimates.reduce((a, b) =>
        a.monthlyCost < b.monthlyCost ? a : b
      )
    : null;

  const fastest = practicalEstimates.length > 0
    ? practicalEstimates.reduce((a, b) =>
        a.journeyMinutes < b.journeyMinutes ? a : b
      )
    : null;

  // Best balance: lowest (normalised time + normalised cost)
  let bestBalance: ModeEstimate | null = null;
  if (practicalEstimates.length > 0) {
    const maxTime = Math.max(...practicalEstimates.map((e) => e.journeyMinutes));
    const maxCost = Math.max(...practicalEstimates.map((e) => e.monthlyCost));
    let bestScore = Infinity;
    for (const e of practicalEstimates) {
      const timeNorm = maxTime > 0 ? e.journeyMinutes / maxTime : 0;
      const costNorm = maxCost > 0 ? e.monthlyCost / maxCost : 0;
      const score = timeNorm * 0.5 + costNorm * 0.5;
      if (score < bestScore) {
        bestScore = score;
        bestBalance = e;
      }
    }
  }

  return {
    home,
    work,
    straightLineMiles: Math.round(straightLineMiles * 10) / 10,
    estimatedDrivingMiles: Math.round(estimatedDrivingMiles * 10) / 10,
    estimates,
    homeStations,
    workStations,
    verdict: {
      bestValue: cheapest,
      fastest,
      bestBalance,
    },
  };
}
