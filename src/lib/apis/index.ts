import { lookupPostcode, validatePostcode, type PostcodeResult } from './postcodes';
import { getEPCData, type EPCData } from './epc';
import { getCrimeData, type CrimeData } from './police';
import { getFloodRisk, type FloodData } from './flood';
import { getBroadbandData, type BroadbandData } from './broadband';
import { getCouncilTaxData, type CouncilTaxData } from './council-tax';
import { getSchoolsData, type SchoolsData } from './schools';
import { getTransportData, type TransportData } from './transport';
import { getNoiseData, type NoiseData } from './noise';
import { getAirQualityData, type AirQualityData } from './air-quality';
import { getPlanningData, type PlanningData } from './planning';

export type { PostcodeResult } from './postcodes';
export type { EPCRecord, EPCSummary, EPCData } from './epc';
export type { CrimeBreakdown, CrimeData } from './police';
export type { FloodRiskLevel, FloodArea, FloodData } from './flood';
export type { BroadbandData } from './broadband';
export type { CouncilTaxData } from './council-tax';
export type { SchoolInfo, SchoolsData } from './schools';
export type { StationInfo, TransportData } from './transport';
export type { NoiseSource, NoiseData } from './noise';
export type { AirQualityData } from './air-quality';
export type { PlanningApplication, PlanningData } from './planning';

export { lookupPostcode, validatePostcode } from './postcodes';
export { getEPCData } from './epc';
export { getCrimeData } from './police';
export { getFloodRisk } from './flood';
export { getBroadbandData } from './broadband';
export { getCouncilTaxData } from './council-tax';
export { getSchoolsData } from './schools';
export { getTransportData } from './transport';
export { getNoiseData } from './noise';
export { getAirQualityData } from './air-quality';
export { getPlanningData } from './planning';
export { generateCommuteReport } from './commute';
export type { TransportMode, ModeEstimate, CommuteReport, StationResult } from './commute';

export interface PropertyData {
  postcode: PostcodeResult | null;
  epc: EPCData | null;
  crime: CrimeData | null;
  flood: FloodData | null;
  broadband: BroadbandData | null;
  councilTax: CouncilTaxData | null;
  schools: SchoolsData | null;
  transport: TransportData | null;
  noise: NoiseData | null;
  airQuality: AirQualityData | null;
  planning: PlanningData | null;
  safetyScore: number | null;
}

function computeEPCScore(epc: EPCData | null): number {
  if (!epc || epc.summary.averageEfficiency === 0) return 50;
  return Math.min(100, Math.max(0, epc.summary.averageEfficiency));
}

function computeCrimeScore(crime: CrimeData | null): number {
  if (!crime) return 50;
  const total = crime.totalCrimes;
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
  const speed = broadband.estimatedAvgDownload;
  if (speed >= 100) return 95;
  if (speed >= 80) return 85;
  if (speed >= 50) return 70;
  if (speed >= 30) return 55;
  if (speed >= 10) return 35;
  return 20;
}

function computeTransportScore(transport: TransportData | null): number {
  if (!transport) return 50;
  switch (transport.rating) {
    case 'Excellent':
      return 95;
    case 'Good':
      return 75;
    case 'Moderate':
      return 50;
    case 'Poor':
      return 25;
    default:
      return 50;
  }
}

function computeAirQualityScore(airQuality: AirQualityData | null): number {
  if (!airQuality || airQuality.aqi === 0) return 50;
  // European AQI: 0-25 Good, 25-50 Moderate, 50-75 Poor, 75+ Very Poor
  // Invert so lower AQI = higher score
  if (airQuality.aqi <= 15) return 95;
  if (airQuality.aqi <= 25) return 85;
  if (airQuality.aqi <= 40) return 65;
  if (airQuality.aqi <= 50) return 50;
  if (airQuality.aqi <= 75) return 30;
  return 15;
}

function computeSchoolsScore(schools: SchoolsData | null): number {
  if (!schools) return 50;
  if (schools.totalWithin1km >= 5) return 90;
  if (schools.totalWithin1km >= 3) return 75;
  if (schools.totalWithin1km >= 1) return 55;
  return 30;
}

function computeNoiseScore(noise: NoiseData | null): number {
  if (!noise) return 50;
  // Invert noise score: lower noise = higher safety score
  return Math.max(0, Math.min(100, 100 - noise.score));
}

function computeAreaScore(
  postcode: PostcodeResult | null,
  epcScore: number,
  crimeScore: number,
  floodScore: number,
  broadbandScore: number
): number {
  if (!postcode) return 50;
  return Math.round(
    epcScore * 0.25 + crimeScore * 0.4 + floodScore * 0.2 + broadbandScore * 0.15
  );
}

function computeSafetyScore(
  postcode: PostcodeResult | null,
  epc: EPCData | null,
  crime: CrimeData | null,
  flood: FloodData | null,
  broadband: BroadbandData | null,
  transport: TransportData | null,
  airQuality: AirQualityData | null,
  schools: SchoolsData | null,
  noise: NoiseData | null
): number {
  const epcScore = computeEPCScore(epc);
  const crimeScore = computeCrimeScore(crime);
  const floodScore = computeFloodScore(flood);
  const broadbandScore = computeBroadbandScore(broadband);
  const transportScore = computeTransportScore(transport);
  const airQualityScore = computeAirQualityScore(airQuality);
  const schoolsScore = computeSchoolsScore(schools);
  const noiseScore = computeNoiseScore(noise);
  const areaScore = computeAreaScore(postcode, epcScore, crimeScore, floodScore, broadbandScore);

  // Weighted final score:
  // EPC: 20%, Crime: 25%, Flood: 15%, Broadband: 5%,
  // Transport: 10%, Air Quality: 10%, Schools: 5%, Noise: 5%, Area: 5%
  const score = Math.round(
    epcScore * 0.2 +
      crimeScore * 0.25 +
      floodScore * 0.15 +
      broadbandScore * 0.05 +
      transportScore * 0.1 +
      airQualityScore * 0.1 +
      schoolsScore * 0.05 +
      noiseScore * 0.05 +
      areaScore * 0.05
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
      councilTax: null,
      schools: null,
      transport: null,
      noise: null,
      airQuality: null,
      planning: null,
      safetyScore: null,
    };
  }

  const { lat, lng } = postcodeResult;

  // Fetch all data sources in parallel
  const [
    epcResult,
    crimeResult,
    floodResult,
    broadbandResult,
    councilTaxResult,
    schoolsResult,
    transportResult,
    noiseResult,
    airQualityResult,
    planningResult,
  ] = await Promise.allSettled([
    getEPCData(postcode),
    getCrimeData(lat, lng),
    getFloodRisk(lat, lng),
    getBroadbandData(postcode),
    getCouncilTaxData(postcode, postcodeResult.admin_district),
    getSchoolsData(lat, lng),
    getTransportData(lat, lng),
    getNoiseData(lat, lng, postcodeResult.rural_urban),
    getAirQualityData(lat, lng),
    getPlanningData(lat, lng),
  ]);

  const epc = epcResult.status === 'fulfilled' ? epcResult.value : null;
  const crime = crimeResult.status === 'fulfilled' ? crimeResult.value : null;
  const flood = floodResult.status === 'fulfilled' ? floodResult.value : null;
  const broadband = broadbandResult.status === 'fulfilled' ? broadbandResult.value : null;
  const councilTax = councilTaxResult.status === 'fulfilled' ? councilTaxResult.value : null;
  const schools = schoolsResult.status === 'fulfilled' ? schoolsResult.value : null;
  const transport = transportResult.status === 'fulfilled' ? transportResult.value : null;
  const noise = noiseResult.status === 'fulfilled' ? noiseResult.value : null;
  const airQuality = airQualityResult.status === 'fulfilled' ? airQualityResult.value : null;
  const planning = planningResult.status === 'fulfilled' ? planningResult.value : null;

  const safetyScore = computeSafetyScore(
    postcodeResult,
    epc,
    crime,
    flood,
    broadband,
    transport,
    airQuality,
    schools,
    noise
  );

  return {
    postcode: postcodeResult,
    epc,
    crime,
    flood,
    broadband,
    councilTax,
    schools,
    transport,
    noise,
    airQuality,
    planning,
    safetyScore,
  };
}
