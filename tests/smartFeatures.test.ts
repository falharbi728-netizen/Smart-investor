import { describe, it, expect } from "vitest";
import {
  calculateSmartInvestmentScore,
  scoreOpportunityForInvestor
} from "@/lib/smartFeatures";

describe("calculateSmartInvestmentScore", () => {
  it("gives higher score for higher ROI and lower risk", () => {
    const low = calculateSmartInvestmentScore({
      roi: 8,
      risk: 4,
      sectorGrowth: 2,
      locationDemand: 2
    });
    const high = calculateSmartInvestmentScore({
      roi: 20,
      risk: 1,
      sectorGrowth: 5,
      locationDemand: 5
    });
    expect(high).toBeGreaterThan(low);
  });
});

describe("scoreOpportunityForInvestor", () => {
  it("prefers opportunities that match budget and city", () => {
    const prefs = {
      budget: 1_000_000,
      preferredCities: ["Riyadh"],
      sectors: ["Logistics"],
      minRoi: 10,
      maxRisk: 3
    };

    const lowMatch = scoreOpportunityForInvestor(
      {
        id: "1",
        city: "Jeddah",
        sector: "Tourism",
        investmentCost: 2_000_000,
        expectedROI: 8,
        riskLevel: 4
      },
      prefs
    );

    const highMatch = scoreOpportunityForInvestor(
      {
        id: "2",
        city: "Riyadh",
        sector: "Logistics",
        investmentCost: 800_000,
        expectedROI: 15,
        riskLevel: 2
      },
      prefs
    );

    expect(highMatch).toBeGreaterThan(lowMatch);
  });
}

