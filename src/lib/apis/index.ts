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
import { getDeprivationData, type DeprivationData } from './deprivation';
import { getHealthcareData, type HealthcareData } from './healthcare';
import { getGreenSpaceData, type GreenSpaceData } from './greenspace';
import { getAmenitiesData, type AmenitiesData } from './amenities';

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
export type { DeprivationData } from './deprivation';
export type { HealthcareFacility, HealthcareData } from './healthcare';
export type { GreenSpaceItem, GreenSpaceData } from './greenspace';
export type { AmenityItem, AmenitiesData } from './amenities';

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
export { getDeprivationData } from './deprivation';
export { getHealthcareData } from './healthcare';
export { getGreenSpaceData } from './greenspace';
export { getAmenitiesData } from './amenities';
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
  deprivation: DeprivationData | null;
  healthcare: HealthcareData | null;
  greenSpace: GreenSpaceData | null;
  amenities: AmenitiesData | null;
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
  return Math.max(0, Math.min(100, 100 - noise.score));
}

function computeDeprivationScore(deprivation: DeprivationData | null): number {
  if (!deprivation) return 50;
  // Decile 10 = least deprived = best score
  return Math.round((deprivation.imdDecile / 10) * 100);
}

function computeHealthcareScore(healthcare: HealthcareData | null): number {
  if (!healthcare) return 50;
  switch (healthcare.healthcareRating) {
    case 'Excellent':
      return 95;
    case 'Good':
      return 75;
    case 'Adequate':
      return 50;
    case 'Poor':
      return 25;
    default:
      return 50;
  }
}

function computeGreenSpaceScore(greenSpace: GreenSpaceData | null): number {
  if (!greenSpace) return 50;
  switch (greenSpace.greenSpaceScore) {
    case 'Excellent':
      return 95;
    case 'Good':
      return 75;
    case 'Average':
      return 50;
    case 'Poor':
      return 25;
    default:
      return 50;
  }
}

function computeAmenityScore(amenities: AmenitiesData | null): number {
  if (!amenities) return 50;
  switch (amenities.amenityScore) {
    case 'Excellent':
      return 95;
    case 'Good':
      return 75;
    case 'Average':
      return 50;
    case 'Poor':
      return 25;
    default:
      return 50;
  }
}

function computeSafetyScore(
  epc: EPCData | null,
  crime: CrimeData | null,
  flood: FloodData | null,
  broadband: BroadbandData | null,
  transport: TransportData | null,
  airQuality: AirQualityData | null,
  schools: SchoolsData | null,
  noise: NoiseData | null,
  deprivation: DeprivationData | null,
  healthcare: HealthcareData | null,
  greenSpace: GreenSpaceData | null,
  amenities: AmenitiesData | null
): number {
  const epcScore = computeEPCScore(epc);
  const crimeScore = computeCrimeScore(crime);
  const floodScore = computeFloodScore(flood);
  const broadbandScore = computeBroadbandScore(broadband);
  const transportScore = computeTransportScore(transport);
  const airQualityScore = computeAirQualityScore(airQuality);
  const schoolsScore = computeSchoolsScore(schools);
  const noiseScore = computeNoiseScore(noise);
  const deprivationScore = computeDeprivationScore(deprivation);
  const healthcareScore = computeHealthcareScore(healthcare);
  const greenSpaceScoreVal = computeGreenSpaceScore(greenSpace);
  const amenityScoreVal = computeAmenityScore(amenities);

  // Updated weights:
  // EPC 15%, Crime 20%, Flood 10%, Transport 10%, AQI 8%, Broadband 5%,
  // Schools 5%, Noise 5%, Deprivation 10%, Healthcare 5%, Green Space 4%, Amenities 3%
  const score = Math.round(
    epcScore * 0.15 +
      crimeScore * 0.20 +
      floodScore * 0.10 +
      broadbandScore * 0.05 +
      transportScore * 0.10 +
      airQualityScore * 0.08 +
      schoolsScore * 0.05 +
      noiseScore * 0.05 +
      deprivationScore * 0.10 +
      healthcareScore * 0.05 +
      greenSpaceScoreVal * 0.04 +
      amenityScoreVal * 0.03
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
      deprivation: null,
      healthcare: null,
      greenSpace: null,
      amenities: null,
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
    deprivationResult,
    healthcareResult,
    greenSpaceResult,
    amenitiesResult,
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
    getDeprivationData(postcodeResult.codes.lsoa),
    getHealthcareData(lat, lng),
    getGreenSpaceData(lat, lng),
    getAmenitiesData(lat, lng),
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
  const deprivation = deprivationResult.status === 'fulfilled' ? deprivationResult.value : null;
  const healthcare = healthcareResult.status === 'fulfilled' ? healthcareResult.value : null;
  const greenSpace = greenSpaceResult.status === 'fulfilled' ? greenSpaceResult.value : null;
  const amenities = amenitiesResult.status === 'fulfilled' ? amenitiesResult.value : null;

  const safetyScore = computeSafetyScore(
    epc,
    crime,
    flood,
    broadband,
    transport,
    airQuality,
    schools,
    noise,
    deprivation,
    healthcare,
    greenSpace,
    amenities
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
    deprivation,
    healthcare,
    greenSpace,
    amenities,
    safetyScore,
  };
}
