import { lookupPostcode } from './postcodes';

export interface BroadbandData {
  postcode: string;
  estimatedAvgDownload: number;
  superfastAvailability: number;
  ultrafastAvailability: number;
  classification: 'urban' | 'rural';
  note: string;
}

const URBAN_STATS = {
  avgDownload: 80,
  superfast: 95,
  ultrafast: 60,
};

const RURAL_STATS = {
  avgDownload: 30,
  superfast: 75,
  ultrafast: 20,
};

function isUrban(ruralUrban: string): boolean {
  // postcodes.io rural_urban field uses ONS classification codes
  // Urban categories contain "Urban" in the description
  const lower = ruralUrban.toLowerCase();
  return lower.includes('urban') || lower.includes('major conurbation') || lower.includes('minor conurbation') || lower.includes('city and town');
}

export async function getBroadbandData(postcode: string): Promise<BroadbandData | null> {
  try {
    const postcodeData = await lookupPostcode(postcode);

    if (!postcodeData) {
      return null;
    }

    const ruralUrban = postcodeData.rural_urban ?? '';
    const urban = isUrban(ruralUrban);
    const stats = urban ? URBAN_STATS : RURAL_STATS;
    const classification = urban ? 'urban' : 'rural';

    return {
      postcode: postcodeData.postcode,
      estimatedAvgDownload: stats.avgDownload,
      superfastAvailability: stats.superfast,
      ultrafastAvailability: stats.ultrafast,
      classification,
      note: 'Estimates based on ONS urban/rural classification. Actual speeds may vary by provider and specific location.',
    };
  } catch {
    return null;
  }
}
