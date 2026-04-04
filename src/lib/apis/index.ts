import { lookupPostcode, validatePostcode, type PostcodeResult } from './postcodes';
import { getEPCData, type EPCData } from './epc';
import { getCrimeData, type CrimeData } from './police';
import { getFloodRisk, type FloodData } from './flood';
import { getBroadbandData, type BroadbandData } from './broadband';

export type { PostcodeResult } from './postcodes';
export type { EPCRecord, EPCSummary, EPCData } from './epc';
export type { CrimeBreakdown, CrimeData } from './police';
export type { FloodRiskLevel, FloodArea, FloodData } from './flood';
export type { BroadbandData } from './broadband';

export { lookupPostcode, validatePostcode } from './postcodes';
export { getEPCData } from './epc';
export { getCrimeData } from './police';
export { getFloodRisk } from './flood';
export { getBroadbandData } from './broadband';

export interface PropertyData {
  postcode: PostcodeResult | null;
  epc: EPCData | null;
  crime: CrimeData | null;
  flood: FloodData | null;
  broadband: BroadbandData | null;
  safetyScore: number | null;
}

interface ScoreComponents {
  epcScore: number;
  crimeScore: number;
  floodScore: number;
  broadbandScore: number;
  areaScore: number;
}

function computeEPCScore(epc: EPCData | null): number {
  if (!epc || epc.summary.averageEfficiency === 0) return 50;

  // Scale: 0-100 efficiency maps to 0-100 score
  return Math.min(100, Math.max(0, epc.summary.averageEfficiency));
}

function computeCrimeScore(crime: CrimeData | null): number {
  if (!crime) return 50;

  const total = crime.totalCrimes;

  // Scoring based on typical monthly crime counts for a 1-mile radius
  // < 50 crimes: very safe area
  // 50-150: average
  // 150-300: above average
  // 300+: high crime
  if (total <= 20) return 95;
  if (total <= 50) return 85;
  if (total <= 100) return 70;
  if (total <= 150) return 55;
  if (total <= 200) return 40;
  if (total <= 300) return 25;
  return 10;
}

function computeFloodScore(flood: FloodData | null): number {
  if (!flood) return 50;

  switch (flood.riskLevel) {
    case 'low':
      return 90;
    case 'medium':
      return 50;
    case 'high':
      return 15;
    default:
      return 50;
  }
}

function computeBroadbandScore(broadband: BroadbandData | null): number {
  if (!broadband) return 50;

  // Score based on average download speed
  const speed = broadband.estimatedAvgDownload;
  if (speed >= 100) return 95;
  if (speed >= 80) return 85;
  if (speed >= 50) return 70;
  if (speed >= 30) return 55;
  if (speed >= 10) return 35;
  return 20;
}

function computeAreaScore(
  postcode: PostcodeResult | null,
  components: Omit<ScoreComponents, 'areaScore'>
): number {
  if (!postcode) return 50;

  // Area quality is a weighted blend of the other scores
  // This gives a general "is this a good area to live in" measure
  const { epcScore, crimeScore, floodScore, broadbandScore } = components;
  return Math.round(
    epcScore * 0.25 + crimeScore * 0.4 + floodScore * 0.2 + broadbandScore * 0.15
  );
}

function computeSafetyScore(
  postcode: PostcodeResult | null,
  epc: EPCData | null,
  crime: CrimeData | null,
  flood: FloodData | null,
  broadband: BroadbandData | null
): number {
  const epcScore = computeEPCScore(epc);
  const crimeScore = computeCrimeScore(crime);
  const floodScore = computeFloodScore(flood);
  const broadbandScore = computeBroadbandScore(broadband);
  const areaScore = computeAreaScore(postcode, {
    epcScore,
    crimeScore,
    floodScore,
    broadbandScore,
  });

  // Weighted final score:
  // EPC rating: 25%, Crime level: 30%, Flood risk: 20%, Broadband: 10%, Area quality: 15%
  const score = Math.round(
    epcScore * 0.25 +
      crimeScore * 0.3 +
      floodScore * 0.2 +
      broadbandScore * 0.1 +
      areaScore * 0.15
  );

  return Math.min(100, Math.max(0, score));
}

export async function getPropertyData(postcode: string): Promise<PropertyData> {
  // First validate and look up the postcode to get coordinates
  const postcodeResult = await lookupPostcode(postcode);

  if (!postcodeResult) {
    return {
      postcode: null,
      epc: null,
      crime: null,
      flood: null,
      broadband: null,
      safetyScore: null,
    };
  }

  const { lat, lng } = postcodeResult;

  // Fetch all data sources in parallel
  const [epcResult, crimeResult, floodResult, broadbandResult] = await Promise.allSettled([
    getEPCData(postcode),
    getCrimeData(lat, lng),
    getFloodRisk(lat, lng),
    getBroadbandData(postcode),
  ]);

  const epc = epcResult.status === 'fulfilled' ? epcResult.value : null;
  const crime = crimeResult.status === 'fulfilled' ? crimeResult.value : null;
  const flood = floodResult.status === 'fulfilled' ? floodResult.value : null;
  const broadband = broadbandResult.status === 'fulfilled' ? broadbandResult.value : null;

  const safetyScore = computeSafetyScore(postcodeResult, epc, crime, flood, broadband);

  return {
    postcode: postcodeResult,
    epc,
    crime,
    flood,
    broadband,
    safetyScore,
  };
}
