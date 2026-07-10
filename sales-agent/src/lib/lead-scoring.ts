export type Urgency = "Immediate" | "1-3 Months" | "3-6 Months" | "Just Exploring";
export type SalesTeamSize = "Just Me" | "2-5 Reps" | "6-15 Reps" | "16-50 Reps" | "50+ Reps";
export type Priority = "Hot" | "Warm" | "Cold";

export interface LeadData {
  leadVolume: number; // monthly leads needed
  urgency: Urgency;
  salesTeamSize: SalesTeamSize;
  hasPhone: boolean;
  messageLength: number;
}

export function calculateLeadScore(data: LeadData): number {
  let score = 0;

  // Lead Volume Scoring (Max 30)
  if (data.leadVolume >= 10000) {
    score += 30;
  } else if (data.leadVolume >= 5000) {
    score += 22;
  } else if (data.leadVolume >= 1000) {
    score += 15;
  } else if (data.leadVolume >= 100) {
    score += 8;
  }

  // Urgency Scoring (Max 30)
  switch (data.urgency) {
    case "Immediate":
      score += 30;
      break;
    case "1-3 Months":
      score += 18;
      break;
    case "3-6 Months":
      score += 10;
      break;
    case "Just Exploring":
      score += 5;
      break;
  }

  // Sales Team Size Scoring (Max 25)
  switch (data.salesTeamSize) {
    case "50+ Reps":
      score += 25;
      break;
    case "16-50 Reps":
      score += 18;
      break;
    case "6-15 Reps":
      score += 12;
      break;
    case "2-5 Reps":
      score += 6;
      break;
    case "Just Me":
      score += 3;
      break;
  }

  // Engagement / Info Scoring (Max 15)
  if (data.hasPhone) {
    score += 10;
  }
  if (data.messageLength > 50) {
    score += 5;
  }

  // Ensure score doesn't exceed 100
  return Math.min(score, 100);
}

export function determinePriority(score: number): Priority {
  if (score >= 75) return "Hot";
  if (score >= 50) return "Warm";
  return "Cold";
}
