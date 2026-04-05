import { lookupPostcode } from './postcodes';

export interface BroadbandData {
  postcode: string;
  estimatedAvgDownload: number;
  estimatedAvgUpload: number;
  superfastAvailability: number;
  ultrafastAvailability: number;
  fullFibreAvailability: number;
  classification: 'urban' | 'rural';
  providers: string[];
  source: 'ofcom' | 'estimate';
  note: string;
}

// Ofcom Connected Nations API
// Register at https://api.ofcom.org.uk/ for a free key
// Header: Ocp-Apim-Subscription-Key
const OFCOM_BASE = 'https://api-proxy.ofcom.org.uk/broadband/coverage';

interface OfcomProperty {
  MaxBBPredictedDown?: string;
  MaxBBPredictedUp?: string;
  SFBB?: string;    // Superfast available? "Yes"/"No"
  UFBB?: string;    // Ultrafast available?
  FTTP?: string;    // Full fibre available?
  MaxSFBBPredictedDown?: string;
  Provider?: string;
}

async function getOfcomData(postcode: string): Promise<BroadbandData | null> {
  const apiKey = process.env.OFCOM_API_KEY;
  if (!apiKey) return null;

  try {
    const cleaned = postcode.replace(/\s+/g, '');
    const res = await fetch(`${OFCOM_BASE}/${encodeURIComponent(cleaned)}`, {
      headers: {
        'Ocp-Apim-Subscription-Key': apiKey.replace(/\\n/g, '').trim(),
      },
      next: { revalidate: 2592000 }, // cache 30 days
    });

    if (!res.ok) return null;

    const data = await res.json();
    if (!data || !data.Availability) return null;

    const properties: OfcomProperty[] = Array.isArray(data.Availability)
      ? data.Availability
      : [data.Availability];

    if (properties.length === 0) return null;

    let totalDown = 0;
    let totalUp = 0;
    let superfastCount = 0;
    let ultrafastCount = 0;
    let fullFibreCount = 0;
    const providerSet = new Set<string>();

    for (const prop of properties) {
      totalDown += parseFloat(prop.MaxBBPredictedDown || '0');
      totalUp += parseFloat(prop.MaxBBPredictedUp || '0');
      if (prop.SFBB === 'Yes') superfastCount++;
      if (prop.UFBB === 'Yes') ultrafastCount++;
      if (prop.FTTP === 'Yes') fullFibreCount++;
      if (prop.Provider) providerSet.add(prop.Provider);
    }

    const count = properties.length;
    return {
      postcode: cleaned,
      estimatedAvgDownload: Math.round(totalDown / count),
      estimatedAvgUpload: Math.round(totalUp / count),
      superfastAvailability: Math.round((superfastCount / count) * 100),
      ultrafastAvailability: Math.round((ultrafastCount / count) * 100),
      fullFibreAvailability: Math.round((fullFibreCount / count) * 100),
      classification: 'urban', // Ofcom gives real data, classification less relevant
      providers: Array.from(providerSet).slice(0, 5),
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
  // Try real Ofcom data first, fall back to estimates
  const ofcomData = await getOfcomData(postcode);
  if (ofcomData) return ofcomData;
  return estimateBroadband(postcode);
}
