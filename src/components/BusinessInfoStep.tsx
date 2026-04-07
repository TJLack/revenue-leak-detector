import { industryOptions } from '../config/industryPresets';
import { BusinessInfo } from '../types';

interface BusinessInfoStepProps {
  value: BusinessInfo;
  onChange: (next: BusinessInfo) => void;
}

const numberValue = (value: string) => Number(value || 0);

export const BusinessInfoStep = ({ value, onChange }: BusinessInfoStepProps) => {
  const update = <K extends keyof BusinessInfo>(key: K, next: BusinessInfo[K]) => onChange({ ...value, [key]: next });

  return (
    <div className="stack gap-md">
      <h3>Business Snapshot</h3>
      <p className="muted">Fast inputs, high-value output. Use estimates if needed.</p>
      <div className="form-grid">
        <label>
          Business name
          <input value={value.businessName} onChange={(e) => update('businessName', e.target.value)} />
        </label>
        <label>
          Website URL
          <input placeholder="https://..." value={value.websiteUrl} onChange={(e) => update('websiteUrl', e.target.value)} />
        </label>
        <label>
          Industry
          <select value={value.industry} onChange={(e) => update('industry', e.target.value)}>
            {industryOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <label>
          City
          <input value={value.city} onChange={(e) => update('city', e.target.value)} />
        </label>
        <label>
          State
          <input value={value.state} onChange={(e) => update('state', e.target.value)} />
        </label>
        <label>
          Average job value ($)
          <input
            type="number"
            min={100}
            value={value.averageJobValue}
            onChange={(e) => update('averageJobValue', numberValue(e.target.value))}
          />
        </label>
        <label>
          Estimated monthly website visitors
          <input
            type="number"
            min={100}
            value={value.monthlyVisitors}
            onChange={(e) => update('monthlyVisitors', numberValue(e.target.value))}
          />
        </label>
        <label>
          Close rate (%)
          <input
            type="number"
            min={1}
            max={100}
            value={value.closeRatePercent}
            onChange={(e) => update('closeRatePercent', numberValue(e.target.value))}
          />
        </label>
        <label>
          Monthly marketing spend ($)
          <input
            type="number"
            min={0}
            value={value.monthlyMarketingSpend}
            onChange={(e) => update('monthlyMarketingSpend', numberValue(e.target.value))}
          />
        </label>
        <label className="full-width">
          Biggest growth goal
          <input
            placeholder="Example: more high-ticket jobs each month"
            value={value.biggestGrowthGoal}
            onChange={(e) => update('biggestGrowthGoal', e.target.value)}
          />
        </label>
      </div>
    </div>
  );
};
