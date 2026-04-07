export type CategoryKey = 'conversion' | 'trust' | 'seo' | 'ai';

export interface BusinessInfo {
  businessName: string;
  websiteUrl: string;
  industry: string;
  city: string;
  state: string;
  averageJobValue: number;
  monthlyVisitors: number;
  closeRatePercent: number;
  monthlyMarketingSpend: number;
  biggestGrowthGoal: string;
}

export interface LeadInfo {
  name: string;
  email: string;
  phone: string;
}

export interface Question {
  id: string;
  category: CategoryKey;
  prompt: string;
  helpText?: string;
  weight: number;
  options: Array<{ label: string; value: number }>;
}

export type Answers = Record<string, number>;

export interface CategoryScore {
  label: string;
  value: number;
}

export interface RevenueEstimate {
  currentLeads: number;
  potentialLeads: number;
  missedLeads: number;
  lowMonthlyLoss: number;
  highMonthlyLoss: number;
  lowYearlyLoss: number;
  highYearlyLoss: number;
}

export interface Recommendation {
  plan: string;
  summary: string;
  priorities: string[];
}

export interface AuditResult {
  overallScore: number;
  growthUrgency: 'Low urgency' | 'Moderate urgency' | 'High urgency' | 'Critical';
  categoryScores: Record<CategoryKey, CategoryScore>;
  topIssues: string[];
  quickWins: string[];
  recommendation: Recommendation;
  revenue: RevenueEstimate;
  headlineInsight: string;
}
