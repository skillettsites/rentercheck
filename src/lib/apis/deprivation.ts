/**
 * Index of Multiple Deprivation (IMD 2019) data from the ArcGIS Open Data API.
 * Uses the LSOA code returned by postcodes.io to look up deprivation rank,
 * decile, and domain-level breakdowns for any area in England.
 */

export interface DeprivationData {
  lsoaCode: string;
  lsoaName: string;
  imdRank: number;        // 1 = most deprived, 32,844 = least deprived
  imdDecile: number;      // 1 = most deprived 10%, 10 = least deprived 10%
  imdScore: number;
  incomeRank: number;
  employmentRank: number;
  educationRank: number;
  healthRank: number;
  crimeRank: number;
  housingRank: number;
  livingEnvironmentRank: number;
  overallLabel: 'Very Deprived' | 'Deprived' | 'Average' | 'Affluent' | 'Very Affluent';
}

interface ArcGISFeature {
  attributes: Record<string, unknown>;
}

interface ArcGISResponse {
  features?: ArcGISFeature[];
}

function decileToLabel(
  decile: number
): 'Very Deprived' | 'Deprived' | 'Average' | 'Affluent' | 'Very Affluent' {
  if (decile <= 2) return 'Very Deprived';
  if (decile <= 4) return 'Deprived';
  if (decile <= 6) return 'Average';
  if (decile <= 8) return 'Affluent';
  return 'Very Affluent';
}

export async function getDeprivationData(
  lsoaCode: string
): Promise<DeprivationData | null> {
  try {
    // ArcGIS Open Data endpoint for IMD 2019
    const baseUrl =
      'https://services1.arcgis.com/ESMARspQHYMw9BZ9/arcgis/rest/services/IMD_2019_1/FeatureServer/0/query';
    const params = new URLSearchParams({
      where: `lsoa11cd='${lsoaCode}'`,
      outFields: '*',
      f: 'json',
      resultRecordCount: '1',
    });

    const res = await fetch(`${baseUrl}?${params.toString()}`, {
      signal: AbortSignal.timeout(10000),
    });

    if (!res.ok) {
      return null;
    }

    const data: ArcGISResponse = await res.json();

    if (!data.features || data.features.length === 0) {
      return null;
    }

    const attrs = data.features[0].attributes;

    // Field names can vary slightly; try common patterns
    const imdRank = Number(attrs.IMDRank ?? attrs.IMD_Rank ?? attrs.imd_rank ?? 0);
    const imdDecile = Number(attrs.IMDDec0 ?? attrs.IMD_Decile ?? attrs.IMDDecil ?? attrs.imd_decile ?? 5);
    const imdScore = Number(attrs.IMDScore ?? attrs.IMD_Score ?? attrs.imd_score ?? 0);
    const lsoaName = String(attrs.lsoa11nm ?? attrs.LSOA_name ?? attrs.lsoa_name ?? lsoaCode);

    const incomeRank = Number(attrs.IncRank ?? attrs.Income_Rank ?? attrs.inc_rank ?? 0);
    const employmentRank = Number(attrs.EmpRank ?? attrs.Employment_Rank ?? attrs.emp_rank ?? 0);
    const educationRank = Number(attrs.EduRank ?? attrs.Education_Rank ?? attrs.edu_rank ?? 0);
    const healthRank = Number(attrs.HDDRank ?? attrs.Health_Rank ?? attrs.hdd_rank ?? 0);
    const crimeRank = Number(attrs.CriRank ?? attrs.Crime_Rank ?? attrs.cri_rank ?? 0);
    const housingRank = Number(attrs.BHSRank ?? attrs.Housing_Rank ?? attrs.bhs_rank ?? 0);
    const livingEnvironmentRank = Number(attrs.EnvRank ?? attrs.Living_Rank ?? attrs.env_rank ?? 0);

    return {
      lsoaCode,
      lsoaName,
      imdRank,
      imdDecile,
      imdScore,
      incomeRank,
      employmentRank,
      educationRank,
      healthRank,
      crimeRank,
      housingRank,
      livingEnvironmentRank,
      overallLabel: decileToLabel(imdDecile),
    };
  } catch {
    return null;
  }
}
