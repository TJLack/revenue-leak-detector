import { AuditResult } from '../types';

interface ScoreCardsProps {
  result: AuditResult;
}

export const ScoreCards = ({ result }: ScoreCardsProps) => (
  <div className="grid-four">
    <article className="mini-card accent">
      <h4>Overall Score</h4>
      <p className="score">{result.overallScore}</p>
      <p>{result.growthUrgency}</p>
    </article>
    {Object.values(result.categoryScores).map((score) => (
      <article key={score.label} className="mini-card">
        <h4>{score.label}</h4>
        <p className="score">{score.value}</p>
      </article>
    ))}
  </div>
);
