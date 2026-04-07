import { useMemo, useState } from 'react';
import { CTASection } from './components/CTASection';
import { HowItWorks } from './components/HowItWorks';
import { LandingSection } from './components/LandingSection';
import { LeadCaptureGate } from './components/LeadCaptureGate';
import { MultiStepForm } from './components/MultiStepForm';
import { ResultsDashboard } from './components/ResultsDashboard';
import { evaluateAudit, submitLeadToCRM } from './logic/scoring';
import { Answers, BusinessInfo, LeadInfo } from './types';

const initialBusiness: BusinessInfo = {
  businessName: '',
  websiteUrl: '',
  industry: 'roofing',
  city: '',
  state: 'TX',
  averageJobValue: 1800,
  monthlyVisitors: 1800,
  closeRatePercent: 35,
  monthlyMarketingSpend: 2500,
  biggestGrowthGoal: '',
};

const initialLead: LeadInfo = {
  name: '',
  email: '',
  phone: '',
};

const demoBusiness: BusinessInfo = {
  businessName: 'Lone Star Roofing Co.',
  websiteUrl: 'https://lonestarroofing.example',
  industry: 'roofing',
  city: 'Austin',
  state: 'TX',
  averageJobValue: 4200,
  monthlyVisitors: 2200,
  closeRatePercent: 32,
  monthlyMarketingSpend: 4000,
  biggestGrowthGoal: 'Generate 25+ qualified roofing inspections monthly',
};

const demoLead: LeadInfo = {
  name: 'Jordan Wells',
  email: 'jordan@example.com',
  phone: '(512) 555-0142',
};

const demoAnswers: Answers = {
  'conv-cta': 0.6,
  'conv-call': 1,
  'conv-diff': 0.6,
  'conv-services': 0.6,
  'conv-mobile': 0.6,
  'trust-reviews': 1,
  'trust-photos': 0.6,
  'trust-proof': 0.6,
  'trust-contact': 1,
  'trust-service-areas': 0.6,
  'seo-keywords': 0.6,
  'seo-meta': 0.6,
  'seo-content': 0.2,
  'seo-faq': 0.2,
  'seo-links': 0.6,
  'ai-clarity': 0.6,
  'ai-headings': 0.6,
  'ai-answers': 0.2,
  'ai-depth': 0.2,
  'ai-authority': 0.6,
};

function App() {
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(1);
  const [business, setBusiness] = useState<BusinessInfo>(initialBusiness);
  const [answers, setAnswers] = useState<Answers>({});
  const [lead, setLead] = useState<LeadInfo>(initialLead);
  const [unlocked, setUnlocked] = useState(false);

  const result = useMemo(() => evaluateAudit(business, answers), [business, answers]);

  const next = () => setStep((value) => Math.min(3, value + 1));
  const back = () => setStep((value) => Math.max(1, value - 1));

  const loadSample = () => {
    setBusiness(demoBusiness);
    setLead(demoLead);
    setAnswers(demoAnswers);
    setStarted(true);
    setStep(3);
  };

  const unlock = async () => {
    if (!lead.name || !lead.email || !lead.phone) return;
    await submitLeadToCRM(lead, business, result);
    setUnlocked(true);
  };

  return (
    <div className="app-shell">
      <header className="topbar">
        <p>Key City Digital</p>
        <span>Website Revenue Leak Detector</span>
      </header>

      <main className="layout">
        {!started ? (
          <>
            <LandingSection onStart={() => setStarted(true)} />
            <HowItWorks />
          </>
        ) : (
          <>
            <MultiStepForm
              step={step}
              business={business}
              onBusinessChange={setBusiness}
              answers={answers}
              onAnswer={(id, value) => setAnswers((prev) => ({ ...prev, [id]: value }))}
              lead={lead}
              onLoadSample={loadSample}
              onNext={next}
              onBack={back}
            />

            {step === 3 && (
              <>
                <ResultsDashboard business={business} result={result} locked={!unlocked} />
                {!unlocked && <LeadCaptureGate lead={lead} onChange={setLead} onUnlock={unlock} />}
                <CTASection />
              </>
            )}
          </>
        )}
      </main>

      <footer className="footer">© {new Date().getFullYear()} Key City Digital • Growth systems for local leaders.</footer>
    </div>
  );
}

export default App;
