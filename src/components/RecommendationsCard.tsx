import { AuditResult } from '../types';

interface RecommendationsCardProps {
  result: AuditResult;
}

export const RecommendationsCard = ({ result }: RecommendationsCardProps) => (
  <section className="card">
    <h3>Recommended Plan: {result.recommendation.plan}</h3>
    <p>{result.recommendation.summary}</p>
    <ul>
      {result.recommendation.priorities.map((priority) => (
        <li key={priority}>{priority}</li>
      ))}
    </ul>
  </section>
);
