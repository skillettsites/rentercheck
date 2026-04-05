/**
 * Index of Multiple Deprivation (IMD) data from a local pre-built JSON file.
 * Uses the LSOA code returned by postcodes.io to look up deprivation rank,
 * decile, and domain-level breakdowns for any area in England.
 */

import { existsSync, readFileSync } from 'fs';
import { join } from 'path';

export interface DeprivationData {
  lsoaCode: string;
  lsoaName: string;
  imdRank: number;
  imdDecile: number;
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

// Format in imd.json: LSOA -> [score, rank, decile, income, employment, education, health, crime, barriers, living]
let imdData: Record<string, number[]> | null = null;

function loadIMDData(): Record<string, number[]> {
  if (imdData) return imdData;

  try {
    const filePath = join(process.cwd(), 'src', 'data', 'imd.json');
    if (existsSync(filePath)) {
      const raw = readFileSync(filePath, 'utf-8');
      imdData = JSON.parse(raw);
      return imdData!;
    }
  } catch {
    // fall through
  }

  imdData = {};
  return imdData;
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
  if (!lsoaCode) return null;

  const data = loadIMDData();
  const entry = data[lsoaCode];

  if (!entry) return null;

  const [score, rank, decile, income, employment, education, health, crime, barriers, living] = entry;

  return {
    lsoaCode,
    lsoaName: lsoaCode,
    imdRank: rank,
    imdDecile: decile,
    imdScore: score,
    incomeRank: income,
    employmentRank: employment,
    educationRank: education,
    healthRank: health,
    crimeRank: crime,
    housingRank: barriers,
    livingEnvironmentRank: living,
    overallLabel: decileToLabel(decile),
  };
}
