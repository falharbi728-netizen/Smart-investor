export type SmartScoreInput = {
  roi: number; // expected ROI percentage
  risk: number; // 1 (low) - 5 (high)
  sectorGrowth: number; // 1 - 5
  locationDemand: number; // 1 - 5
};

export function calculateSmartInvestmentScore(input: SmartScoreInput): number {
  const roiWeight = 0.4;
  const riskWeight = 0.25;
  const growthWeight = 0.2;
  const locationWeight = 0.15;

  const normalizedRoi = Math.min(input.roi / 25, 1); // cap at 25%+
  const normalizedRisk = 1 - (input.risk - 1) / 4; // invert: lower risk => higher score
  const normalizedGrowth = (input.sectorGrowth - 1) / 4;
  const normalizedLocation = (input.locationDemand - 1) / 4;

  const score =
    normalizedRoi * roiWeight +
    normalizedRisk * riskWeight +
    normalizedGrowth * growthWeight +
    normalizedLocation * locationWeight;

  return Math.round(score * 100);
}

export type InvestorPreferences = {
  budget: number;
  preferredCities: string[];
  sectors: string[];
  minRoi?: number;
  maxRisk?: number;
};

export type OpportunityLike = {
  id: string;
  city: string;
  sector: string;
  investmentCost: number;
  expectedROI: number;
  riskLevel: number;
};

export function scoreOpportunityForInvestor(
  opp: OpportunityLike,
  prefs: InvestorPreferences
): number {
  let score = 0;

  if (opp.investmentCost <= prefs.budget) score += 25;
  if (prefs.preferredCities.includes(opp.city)) score += 20;
  if (!prefs.sectors.length || prefs.sectors.includes(opp.sector)) score += 20;
  if (!prefs.minRoi || opp.expectedROI >= prefs.minRoi) score += 20;
  if (!prefs.maxRisk || opp.riskLevel <= prefs.maxRisk) score += 15;

  return score;
}

