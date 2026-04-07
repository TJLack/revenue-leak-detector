import { questions } from '../config/questions';
import { Answers, BusinessInfo, LeadInfo } from '../types';
import { BusinessInfoStep } from './BusinessInfoStep';
import { QuestionnaireStep } from './QuestionnaireStep';

interface MultiStepFormProps {
  step: number;
  business: BusinessInfo;
  onBusinessChange: (next: BusinessInfo) => void;
  answers: Answers;
  onAnswer: (id: string, value: number) => void;
  lead: LeadInfo;
  onLoadSample: () => void;
  onNext: () => void;
  onBack: () => void;
}

export const MultiStepForm = ({
  step,
  business,
  onBusinessChange,
  answers,
  onAnswer,
  lead,
  onLoadSample,
  onNext,
  onBack,
}: MultiStepFormProps) => {
  const answered = Object.keys(answers).length;
  const progress = step === 1 ? 35 : step === 2 ? 35 + Math.round((answered / questions.length) * 50) : 100;

  return (
    <section className="card stack gap-md">
      <div className="progress-row">
        <div>
          <p className="muted">Step {step} of 3</p>
          <h2>Website Revenue Leak Detector</h2>
        </div>
        <button className="btn btn-ghost" onClick={onLoadSample} type="button">
          Demo Mode
        </button>
      </div>
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>

      {step === 1 && <BusinessInfoStep value={business} onChange={onBusinessChange} />}
      {step === 2 && <QuestionnaireStep answers={answers} onAnswer={onAnswer} />}
      {step === 3 && (
        <div>
          <h3>Almost Done</h3>
          <p className="muted">
            Teaser unlocked for {lead.name || business.businessName || 'your business'}. Add contact details below to see
            the full action plan.
          </p>
        </div>
      )}

      <div className="actions-row">
        {step > 1 && (
          <button className="btn btn-ghost" onClick={onBack}>
            Back
          </button>
        )}
        {step < 3 && (
          <button className="btn btn-primary" onClick={onNext}>
            Continue
          </button>
        )}
      </div>
    </section>
  );
};
