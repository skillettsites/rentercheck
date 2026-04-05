import { lookupPostcode } from './postcodes';

export interface BroadbandData {
  postcode: string;
  estimatedAvgDownload: number;
  estimatedAvgUpload: number;
  maxAvailableDown: number;
  maxAvailableUp: number;
  superfastAvailability: number;
  ultrafastAvailability: number;
  fullFibreAvailability: number;
  classification: 'urban' | 'rural';
  providers: string[];
  source: 'ofcom' | 'estimate';
  note: string;
}

// Ofcom Connected Nations API
const OFCOM_BASE = 'https://api-proxy.ofcom.org.uk/broadband/coverage';

function cleanEnv(val: string | undefined): string {
  return (val || '').replace(/\\n/g, '').replace(/\n/g, '').trim();
}

async function getOfcomData(postcode: string): Promise<BroadbandData | null> {
  const apiKey = cleanEnv(process.env.OFCOM_API_KEY);
  if (!apiKey) return null;

  try {
    const cleaned = postcode.replace(/\s+/g, '');
    const res = await fetch(`${OFCOM_BASE}/${encodeURIComponent(cleaned)}`, {
      headers: { 'Ocp-Apim-Subscription-Key': apiKey },
      next: { revalidate: 2592000 },
    });

    if (!res.ok) return null;

    const data = await res.json();
    if (!data || !data.Availability) return null;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const properties: any[] = Array.isArray(data.Availability)
      ? data.Availability
      : [data.Availability];

    if (properties.length === 0) return null;

    let totalBasicDown = 0;
    let totalBasicUp = 0;
    let totalMaxDown = 0;
    let totalMaxUp = 0;
    let superfastCount = 0;
    let ultrafastCount = 0;
    let fullFibreCount = 0;

    for (const prop of properties) {
      // Basic BB speed (what most connections actually deliver)
      const basicDown = Number(prop.MaxBbPredictedDown || 0);
      const basicUp = Number(prop.MaxBbPredictedUp || 0);
      totalBasicDown += basicDown;
      totalBasicUp += basicUp;

      // Max available speed (best possible, e.g. full fibre)
      const maxDown = Number(prop.MaxPredictedDown || prop.MaxSfbbPredictedDown || basicDown);
      const maxUp = Number(prop.MaxPredictedUp || prop.MaxSfbbPredictedUp || basicUp);
      totalMaxDown += maxDown;
      totalMaxUp += maxUp;

      if (Number(prop.MaxSfbbPredictedDown || 0) > 0) superfastCount++;
      if (Number(prop.MaxUfbbPredictedDown || 0) > 0) ultrafastCount++;
      if (Number(prop.MaxUfbbPredictedDown || 0) >= 1000) fullFibreCount++;
    }

    const count = properties.length;
    return {
      postcode: cleaned,
      estimatedAvgDownload: Math.round(totalBasicDown / count),
      estimatedAvgUpload: Math.round(totalBasicUp / count),
      maxAvailableDown: Math.round(totalMaxDown / count),
      maxAvailableUp: Math.round(totalMaxUp / count),
      superfastAvailability: Math.round((superfastCount / count) * 100),
      ultrafastAvailability: Math.round((ultrafastCount / count) * 100),
      fullFibreAvailability: Math.round((fullFibreCount / count) * 100),
      classification: 'urban',
      providers: [],
      source: 'ofcom',
      note: 'Real broadband data from Ofcom Connected Nations.',
    };
  } catch {
    return null;
  }
}

// Fallback: estimates based on urban/rural classification
const URBAN_STATS = { avgDownload: 80, avgUpload: 15, superfast: 95, ultrafast: 60, fullFibre: 45 };
const RURAL_STATS = { avgDownload: 30, avgUpload: 5, superfast: 75, ultrafast: 20, fullFibre: 15 };

function isUrban(ruralUrban: string): boolean {
  const lower = ruralUrban.toLowerCase();
  return lower.includes('urban') || lower.includes('major conurbation') || lower.includes('minor conurbation') || lower.includes('city and town');
}

async function estimateBroadband(postcode: string): Promise<BroadbandData | null> {
  try {
    const postcodeData = await lookupPostcode(postcode);
    if (!postcodeData) return null;

    const ruralUrban = postcodeData.rural_urban ?? '';
    const urban = isUrban(ruralUrban);
    const stats = urban ? URBAN_STATS : RURAL_STATS;

    return {
      postcode: postcodeData.postcode,
      estimatedAvgDownload: stats.avgDownload,
      estimatedAvgUpload: stats.avgUpload,
      maxAvailableDown: urban ? 1000 : 300,
      maxAvailableUp: urban ? 100 : 30,
      superfastAvailability: stats.superfast,
      ultrafastAvailability: stats.ultrafast,
      fullFibreAvailability: stats.fullFibre,
      classification: urban ? 'urban' : 'rural',
      providers: [],
      source: 'estimate',
      note: 'Estimates based on ONS urban/rural classification. Actual speeds may vary.',
    };
  } catch {
    return null;
  }
}

export async function getBroadbandData(postcode: string): Promise<BroadbandData | null> {
  const ofcomData = await getOfcomData(postcode);
  if (ofcomData) return ofcomData;
  return estimateBroadband(postcode);
}
