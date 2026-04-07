const steps = [
  {
    title: 'Share your business inputs',
    body: 'Tell us your service type, traffic, close rate, and average job value.',
  },
  {
    title: 'Answer 20 fast growth questions',
    body: 'We score conversion, trust, SEO, and AI-readiness with weighted logic.',
  },
  {
    title: 'Unlock your revenue leak report',
    body: 'See missed lead estimates, lost revenue ranges, and your best growth plan.',
  },
];

export const HowItWorks = () => (
  <section className="card">
    <h2>How It Works</h2>
    <div className="grid-three">
      {steps.map((step, index) => (
        <article key={step.title} className="mini-card">
          <span className="step-index">0{index + 1}</span>
          <h3>{step.title}</h3>
          <p>{step.body}</p>
        </article>
      ))}
    </div>
  </section>
);
