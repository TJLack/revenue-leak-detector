interface LandingSectionProps {
  onStart: () => void;
}

export const LandingSection = ({ onStart }: LandingSectionProps) => (
  <section className="hero card">
    <p className="badge">Built for Local Businesses • Key City Digital</p>
    <h1>How Much Revenue Is Your Website Leaking?</h1>
    <p className="subheadline">
      See where your site is losing trust, traffic, and conversions in under 3 minutes. Get a personalized Website
      Revenue Leak Report with clear revenue impact and next-step strategy.
    </p>
    <div className="hero-actions">
      <button className="btn btn-primary" onClick={onStart}>
        Run My Free Revenue Leak Report
      </button>
      <p className="muted">No API keys. No fluff. Built for serious local growth.</p>
    </div>
  </section>
);
