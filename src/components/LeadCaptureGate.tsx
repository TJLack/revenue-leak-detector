import { LeadInfo } from '../types';

interface LeadCaptureGateProps {
  lead: LeadInfo;
  onChange: (next: LeadInfo) => void;
  onUnlock: () => void;
}

export const LeadCaptureGate = ({ lead, onChange, onUnlock }: LeadCaptureGateProps) => {
  const update = <K extends keyof LeadInfo>(key: K, value: LeadInfo[K]) => onChange({ ...lead, [key]: value });

  return (
    <div className="gate card">
      <h3>Unlock Full Results</h3>
      <p>
        Enter your details to access category breakdowns, missed revenue range, and your custom growth plan from Key
        City Digital.
      </p>
      <div className="form-grid">
        <label>
          Name
          <input value={lead.name} onChange={(e) => update('name', e.target.value)} />
        </label>
        <label>
          Email
          <input type="email" value={lead.email} onChange={(e) => update('email', e.target.value)} />
        </label>
        <label>
          Phone
          <input value={lead.phone} onChange={(e) => update('phone', e.target.value)} />
        </label>
      </div>
      <button className="btn btn-primary" onClick={onUnlock}>
        Unlock My Results
      </button>
      <p className="muted">Built for local businesses. Your data is used only to deliver your report and next steps.</p>
    </div>
  );
};
