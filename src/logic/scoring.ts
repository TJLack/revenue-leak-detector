import { benchmarkAssumptions, scoreWeights } from '../config/benchmarks';
import { industryPresets } from '../config/industryPresets';
import { questions } from '../config/questions';
import { Answers, AuditResult, BusinessInfo, CategoryKey, LeadInfo } from '../types';

const categoryLabels: Record<CategoryKey, string> = {
  conversion: 'Conversion Rate Potential',
  trust: 'Trust Signals',
  seo: 'SEO Foundation',
  ai: 'AI Readiness',
};

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const round = (value: number) => Math.round(value);

export const evaluateAudit = (business: BusinessInfo, answers: Answers): AuditResult => {
  const preset = industryPresets[business.industry] ?? industryPresets.default;

  const categoryRaw: Record<CategoryKey, { scored: number; total: number }> = {
    conversion: { scored: 0, total: 0 },
    trust: { scored: 0, total: 0 },
    seo: { scored: 0, total: 0 },
    ai: { scored: 0, total: 0 },
  };

  questions.forEach((q) => {
    const answer = answers[q.id] ?? 0.6;
    categoryRaw[q.category].scored += answer * q.weight;
    categoryRaw[q.category].total += q.weight;
  });

  const categoryScores = {
    conversion: {
      label: categoryLabels.conversion,
      value: round((categoryRaw.conversion.scored / categoryRaw.conversion.total) * 100),
    },
    trust: {
      label: categoryLabels.trust,
      value: round((categoryRaw.trust.scored / categoryRaw.trust.total) * 100),
    },
    seo: {
      label: categoryLabels.seo,
      value: round((categoryRaw.seo.scored / categoryRaw.seo.total) * 100),
    },
    ai: {
      label: categoryLabels.ai,
      value: round((categoryRaw.ai.scored / categoryRaw.ai.total) * 100),
    },
  };

  const weighted =
    categoryScores.conversion.value * scoreWeights.conversion +
    categoryScores.trust.value * scoreWeights.trust +
    categoryScores.seo.value * scoreWeights.seo +
    categoryScores.ai.value * scoreWeights.ai;

  const overallScore = clamp(round(weighted), 1, 99);

  const qualityFactor = overallScore / 100;
  const leakIntensity = 1 - qualityFactor;
  const lowLeakPercent = clamp(
    benchmarkAssumptions.lowLeakFloor +
      leakIntensity * (benchmarkAssumptions.lowLeakCeiling - benchmarkAssumptions.lowLeakFloor),
    0.05,
    0.45,
  );
  const highLeakPercent = clamp(
    benchmarkAssumptions.highLeakFloor +
      leakIntensity * (benchmarkAssumptions.highLeakCeiling - benchmarkAssumptions.highLeakFloor),
    0.1,
    0.6,
  );

  const baselineRate = preset.benchmarkLeadRate;
  const improvementFactor = clamp((overallScore - 45) / 80, -0.2, 0.3);
  const currentConversionRate = clamp(
    baselineRate + improvementFactor * 0.02,
    benchmarkAssumptions.baselineConversionRate,
    benchmarkAssumptions.bestCaseConversionRate,
  );

  const potentialConversionRate = clamp(currentConversionRate + 0.02, 0.04, 0.09);
  const currentLeads = business.monthlyVisitors * currentConversionRate;
  const potentialLeads = business.monthlyVisitors * potentialConversionRate;
  const possibleNewLeads = Math.max(0, potentialLeads - currentLeads);
  const missedLeads = round(possibleNewLeads * ((lowLeakPercent + highLeakPercent) / 2));

  const closeRate = clamp(business.closeRatePercent / 100, 0.05, 0.9);
  const lowMonthlyLoss = round(
    business.averageJobValue * closeRate * business.monthlyVisitors * lowLeakPercent * (currentConversionRate + 0.005),
  );
  const highMonthlyLoss = round(
    business.averageJobValue * closeRate * business.monthlyVisitors * highLeakPercent * (currentConversionRate + 0.015),
  );

  const topIssues = getTopIssues(categoryScores, preset.priorityNudge);
  const quickWins = getQuickWins(categoryScores);
  const recommendation = getRecommendation(categoryScores, business.monthlyVisitors);

  const growthUrgency = getGrowthUrgency(overallScore, highMonthlyLoss);

  return {
    overallScore,
    growthUrgency,
    categoryScores,
    topIssues,
    quickWins,
    recommendation,
    revenue: {
      currentLeads: round(currentLeads),
      potentialLeads: round(potentialLeads),
      missedLeads,
      lowMonthlyLoss,
      highMonthlyLoss,
      lowYearlyLoss: lowMonthlyLoss * 12,
      highYearlyLoss: highMonthlyLoss * 12,
    },
    headlineInsight: `${preset.focusMessage} Your current structure likely leaves qualified demand unconverted.`,
  };
};

const getTopIssues = (
  categoryScores: AuditResult['categoryScores'],
  industryNudge: string,
): string[] => {
  const issues: string[] = [];
  if (categoryScores.conversion.value < 65) issues.push('Conversion flow is leaking high-intent visitors before they contact you.');
  if (categoryScores.trust.value < 65) issues.push('Trust proof is too weak near key decision points on your pages.');
  if (categoryScores.seo.value < 65) issues.push('Local SEO structure is limiting visibility for service + city searches.');
  if (categoryScores.ai.value < 65) issues.push('AI search systems may struggle to interpret your authority and service relevance.');
  if (issues.length < 3) issues.push(industryNudge);
  return issues.slice(0, 3);
};

const getQuickWins = (categoryScores: AuditResult['categoryScores']): string[] => {
  const wins: string[] = [];
  if (categoryScores.conversion.value < 75) wins.push('Add a dominant above-the-fold CTA with click-to-call and short form options.');
  if (categoryScores.trust.value < 75) wins.push('Place review snippets, guarantees, and project proof near every lead action.');
  if (categoryScores.seo.value < 75) wins.push('Build/upgrade city + service pages with tighter keyword and internal link structure.');
  if (categoryScores.ai.value < 75) wins.push('Expand semantic service/location clarity using structured headings and FAQs.');
  wins.push('Deploy monthly growth tracking to tie traffic and lead flow to revenue outcomes.');
  return wins.slice(0, 3);
};

const getRecommendation = (
  categoryScores: AuditResult['categoryScores'],
  monthlyVisitors: number,
): AuditResult['recommendation'] => {
  const { conversion, trust, seo, ai } = categoryScores;

  if (conversion.value < 60 && trust.value < 60 && seo.value < 68) {
    return {
      plan: 'Full Growth Stack',
      summary: 'Multiple performance layers are under-optimized. You need coordinated website, SEO, and lead generation upgrades.',
      priorities: [
        'Rebuild core conversion journey on homepage + service pages',
        'Install stronger trust architecture and local proof blocks',
        'Launch location SEO content with technical cleanup and tracking',
      ],
    };
  }

  if (conversion.value < 62 || trust.value < 62) {
    return {
      plan: 'Website Fix Focus',
      summary: 'Lead intent exists, but page structure and trust signals are blocking conversion momentum.',
      priorities: [
        'Strengthen CTA hierarchy and mobile conversion UX',
        'Improve differentiation and offer clarity above the fold',
        'Integrate testimonials, badges, and proof near quote actions',
      ],
    };
  }

  if (seo.value < 62 && ai.value < 65) {
    return {
      plan: 'AI + SEO Authority Focus',
      summary: 'Discovery visibility is weak in both classic and AI-led search surfaces.',
      priorities: [
        'Build semantic service/location content clusters',
        'Tighten on-page SEO architecture and internal linking',
        'Publish authority-driven FAQ and trust-backed explainer content',
      ],
    };
  }

  if (seo.value < 65) {
    return {
      plan: 'Local SEO Focus',
      summary: 'Conversion quality is reasonable, but too little qualified traffic is reaching your pages.',
      priorities: [
        'Create city-specific service landing pages',
        'Improve metadata and topical keyword targeting',
        'Add consistent local relevance signals sitewide',
      ],
    };
  }

  if (monthlyVisitors < 1200 && conversion.value > 70 && trust.value > 70) {
    return {
      plan: 'Ads Amplification',
      summary: 'Your website foundation is strong enough to scale; now traffic volume is likely the bottleneck.',
      priorities: [
        'Launch high-intent local paid search campaigns',
        'Retarget non-converting visitors with offer-based creative',
        'Use CRM-ready tracking to optimize cost per qualified lead',
      ],
    };
  }

  return {
    plan: 'Performance Optimization Sprint',
    summary: 'You have a solid foundation and clear upside from targeted refinements.',
    priorities: [
      'Tighten weak pages with the highest traffic-to-lead dropoff',
      'Expand authority content for top-margin services',
      'Improve lead routing speed and follow-up automation',
    ],
  };
};

const getGrowthUrgency = (
  overallScore: number,
  highMonthlyLoss: number,
): AuditResult['growthUrgency'] => {
  if (overallScore < 45 || highMonthlyLoss >= 12000) return 'Critical';
  if (overallScore < 60 || highMonthlyLoss >= 7000) return 'High urgency';
  if (overallScore < 75 || highMonthlyLoss >= 3000) return 'Moderate urgency';
  return 'Low urgency';
};

// Placeholder to connect HubSpot, HighLevel, Zapier webhook, or custom API endpoint later.
export const submitLeadToCRM = async (
  lead: LeadInfo,
  business: BusinessInfo,
  result: AuditResult,
): Promise<void> => {
  void lead;
  void business;
  void result;
  return Promise.resolve();
};
