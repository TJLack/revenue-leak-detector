interface IndustryPreset {
  label: string;
  focusMessage: string;
  ctaAngle: string;
  benchmarkLeadRate: number;
  priorityNudge: string;
}

export const industryPresets: Record<string, IndustryPreset> = {
  roofing: {
    label: 'Roofing',
    focusMessage: 'Storm-driven demand spikes reward fast trust and mobile conversion flow.',
    ctaAngle: 'Turn quote requests into booked inspections faster.',
    benchmarkLeadRate: 0.042,
    priorityNudge: 'Show financing, warranties, and project proof above the fold.',
  },
  hvac: {
    label: 'HVAC',
    focusMessage: 'Emergency-intent traffic converts best with immediate CTA clarity.',
    ctaAngle: 'Capture high-intent repair and replacement leads before competitors.',
    benchmarkLeadRate: 0.045,
    priorityNudge: 'Highlight emergency service and same-day scheduling in hero content.',
  },
  plumbing: {
    label: 'Plumbing',
    focusMessage: 'Local intent is high, but response speed and trust decide winners.',
    ctaAngle: 'Win more urgent calls without increasing ad waste.',
    benchmarkLeadRate: 0.043,
    priorityNudge: 'Place click-to-call and service-area proof on every key page.',
  },
  cleaning: {
    label: 'Cleaning Company',
    focusMessage: 'Consistency and social proof drive recurring booking decisions.',
    ctaAngle: 'Grow recurring clients with stronger trust positioning.',
    benchmarkLeadRate: 0.035,
    priorityNudge: 'Use before-and-after visuals and testimonials near quote forms.',
  },
  remodeler: {
    label: 'Remodeler',
    focusMessage: 'Higher-ticket projects require confidence-building and authority content.',
    ctaAngle: 'Convert premium homeowners with better credibility signals.',
    benchmarkLeadRate: 0.028,
    priorityNudge: 'Feature portfolio depth, timelines, and process clarity prominently.',
  },
  default: {
    label: 'Local Service Business',
    focusMessage: 'Local growth depends on conversion clarity, trust, and search visibility.',
    ctaAngle: 'Recover missed opportunities already hitting your website.',
    benchmarkLeadRate: 0.036,
    priorityNudge: 'Improve CTA clarity and trust proof on top landing pages.',
  },
};

export const industryOptions = [
  'roofing',
  'hvac',
  'plumbing',
  'electrician',
  'pressure washing',
  'cleaning',
  'landscaping',
  'fencing',
  'remodeler',
  'foundation repair',
  'window and door',
  'concrete',
  'junk removal',
  'pest control',
  'pool service',
  'general contractor',
];
