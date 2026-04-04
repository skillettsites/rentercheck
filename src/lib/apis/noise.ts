/**
 * Noise level estimation based on proximity to roads, railways,
 * and urban/rural classification.
 * Uses Overpass API to check for nearby noise sources.
 */

export interface NoiseSource {
  type: string;
  detail: string;
}

export interface NoiseData {
  level: 'Low' | 'Moderate' | 'High';
  score: number; // 0-100, lower is quieter
  sources: NoiseSource[];
  mitigation: string[];
  note: string;
}

interface OverpassElement {
  type: string;
  id: number;
  lat?: number;
  lon?: number;
  tags?: Record<string, string>;
}

interface OverpassResponse {
  elements: OverpassElement[];
}

export async function getNoiseData(
  lat: number,
  lng: number,
  ruralUrban?: string
): Promise<NoiseData> {
  const sources: NoiseSource[] = [];
  const mitigation: string[] = [];
  let noiseScore = 20; // baseline

  // Adjust for urban/rural classification
  const classification = (ruralUrban || '').toLowerCase();
  if (classification.includes('major conurbation') || classification.includes('city')) {
    noiseScore += 25;
    sources.push({ type: 'Urban', detail: 'Located in a major urban area' });
  } else if (classification.includes('urban') || classification.includes('conurbation')) {
    noiseScore += 15;
    sources.push({ type: 'Urban', detail: 'Located in an urban area' });
  } else if (classification.includes('town')) {
    noiseScore += 8;
  }
  // Rural areas keep low baseline

  try {
    // Check for major roads and railways nearby
    const query = `[out:json][timeout:10];(way["highway"~"motorway|trunk|primary"](around:500,${lat},${lng});way["railway"="rail"](around:300,${lat},${lng});node["aeroway"="aerodrome"](around:3000,${lat},${lng}););out tags;`;
    const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;

    const res = await fetch(url, {
      signal: AbortSignal.timeout(12000),
    });

    if (res.ok) {
      const data: OverpassResponse = await res.json();

      let hasMotorway = false;
      let hasTrunk = false;
      let hasPrimary = false;
      let hasRailway = false;
      let hasAirport = false;

      for (const el of data.elements) {
        const tags = el.tags || {};
        if (tags.highway === 'motorway') hasMotorway = true;
        if (tags.highway === 'trunk') hasTrunk = true;
        if (tags.highway === 'primary') hasPrimary = true;
        if (tags.railway === 'rail') hasRailway = true;
        if (tags.aeroway === 'aerodrome') hasAirport = true;
      }

      if (hasMotorway) {
        noiseScore += 30;
        sources.push({ type: 'Road', detail: 'Motorway within 500m' });
        mitigation.push('Check if property has double or triple glazing');
      }
      if (hasTrunk) {
        noiseScore += 20;
        sources.push({ type: 'Road', detail: 'Major A-road within 500m' });
        mitigation.push('Consider visiting at peak traffic times before committing');
      }
      if (hasPrimary) {
        noiseScore += 10;
        sources.push({ type: 'Road', detail: 'Primary road within 500m' });
      }
      if (hasRailway) {
        noiseScore += 20;
        sources.push({ type: 'Railway', detail: 'Railway line within 300m' });
        mitigation.push('Ask about train frequency and late-night services');
      }
      if (hasAirport) {
        noiseScore += 15;
        sources.push({ type: 'Aviation', detail: 'Airport within 3km' });
        mitigation.push('Check flight paths and restricted hours');
      }
    }
  } catch {
    // Continue with urban/rural estimate only
  }

  // Cap at 100
  noiseScore = Math.min(100, noiseScore);

  let level: NoiseData['level'];
  if (noiseScore <= 35) {
    level = 'Low';
  } else if (noiseScore <= 60) {
    level = 'Moderate';
  } else {
    level = 'High';
  }

  if (sources.length === 0) {
    sources.push({ type: 'General', detail: 'No major noise sources identified nearby' });
  }

  if (mitigation.length === 0 && level === 'Low') {
    mitigation.push('Area appears relatively quiet based on surrounding infrastructure');
  }

  return {
    level,
    score: noiseScore,
    sources,
    mitigation,
    note: 'Estimate based on proximity to roads, railways, airports, and area classification. Visit at different times for a real assessment.',
  };
}
