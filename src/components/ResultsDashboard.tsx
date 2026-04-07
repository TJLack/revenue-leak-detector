import { AuditResult, BusinessInfo } from '../types';
import { RecommendationsCard } from './RecommendationsCard';
import { RevenueLossCard } from './RevenueLossCard';
import { ScoreCards } from './ScoreCards';

interface ResultsDashboardProps {
  business: BusinessInfo;
  result: AuditResult;
  locked: boolean;
}

export const ResultsDashboard = ({ business, result, locked }: ResultsDashboardProps) => (
  <section className="stack gap-lg">
    <div className="card">
      <h2>{business.businessName || 'Your Business'} Revenue Leak Report</h2>
      <p>{result.headlineInsight}</p>
      <p className="muted">Priority score: {100 - result.overallScore} opportunity points available.</p>
    </div>

    <ScoreCards result={result} />

    <div className={locked ? 'blur-wrap locked' : 'blur-wrap'}>
      <RevenueLossCard revenue={result.revenue} />
      <div className="grid-two">
        <section className="card">
          <h3>Top Issues Hurting Performance</h3>
          <ul>
            {result.topIssues.map((issue) => (
              <li key={issue}>{issue}</li>
            ))}
          </ul>
        </section>
        <section className="card">
          <h3>Top Quick Wins</h3>
          <ul>
            {result.quickWins.map((win) => (
              <li key={win}>{win}</li>
            ))}
          </ul>
        </section>
      </div>
      <RecommendationsCard result={result} />
    </div>
  </section>
);
