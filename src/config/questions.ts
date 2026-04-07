import { Question } from '../types';

const yesNo = [
  { label: 'No / Not really', value: 0.2 },
  { label: 'Partially', value: 0.6 },
  { label: 'Yes, strongly', value: 1 },
];

export const questions: Question[] = [
  { id: 'conv-cta', category: 'conversion', prompt: 'Is there a clear CTA above the fold?', weight: 1.2, options: yesNo },
  { id: 'conv-call', category: 'conversion', prompt: 'Can visitors easily call or submit a form on mobile?', weight: 1.2, options: yesNo },
  { id: 'conv-diff', category: 'conversion', prompt: 'Does the site quickly explain what makes you different?', weight: 0.9, options: yesNo },
  { id: 'conv-services', category: 'conversion', prompt: 'Do you have dedicated service pages for core offers?', weight: 1, options: yesNo },
  { id: 'conv-mobile', category: 'conversion', prompt: 'Is the experience fast and usable on mobile?', weight: 1.1, options: yesNo },

  { id: 'trust-reviews', category: 'trust', prompt: 'Do you prominently display reviews or testimonials?', weight: 1.1, options: yesNo },
  { id: 'trust-photos', category: 'trust', prompt: 'Do you show real team or project photos?', weight: 0.9, options: yesNo },
  { id: 'trust-proof', category: 'trust', prompt: 'Are licenses, guarantees, or certifications visible?', weight: 1, options: yesNo },
  { id: 'trust-contact', category: 'trust', prompt: 'Is contact info always easy to find?', weight: 1.1, options: yesNo },
  { id: 'trust-service-areas', category: 'trust', prompt: 'Do you clearly show service areas and who you serve?', weight: 0.9, options: yesNo },

  { id: 'seo-keywords', category: 'seo', prompt: 'Do key pages target city + service keywords?', weight: 1.2, options: yesNo },
  { id: 'seo-meta', category: 'seo', prompt: 'Are title tags and meta descriptions optimized?', weight: 1, options: yesNo },
  { id: 'seo-content', category: 'seo', prompt: 'Do you publish useful location/service content?', weight: 1, options: yesNo },
  { id: 'seo-faq', category: 'seo', prompt: 'Do you answer common questions with FAQs?', weight: 0.8, options: yesNo },
  { id: 'seo-links', category: 'seo', prompt: 'Do you use internal links between related pages?', weight: 0.8, options: yesNo },

  { id: 'ai-clarity', category: 'ai', prompt: 'Is your content clear about what you do and where you serve?', weight: 1.1, options: yesNo },
  { id: 'ai-headings', category: 'ai', prompt: 'Do headings clearly describe services and outcomes?', weight: 1, options: yesNo },
  { id: 'ai-answers', category: 'ai', prompt: 'Do you directly answer buyer questions on-page?', weight: 1, options: yesNo },
  { id: 'ai-depth', category: 'ai', prompt: 'Is content detailed enough for AI systems to understand expertise?', weight: 1.1, options: yesNo },
  { id: 'ai-authority', category: 'ai', prompt: 'Do you show authority and trust signals alongside content?', weight: 0.8, options: yesNo },
];
