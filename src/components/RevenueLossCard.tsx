import { RevenueEstimate } from '../types';

interface RevenueLossCardProps {
  revenue: RevenueEstimate;
}

const formatMoney = (value: number) => `$${value.toLocaleString()}`;

export const RevenueLossCard = ({ revenue }: RevenueLossCardProps) => (
  <section className="card">
    <h3>Estimated Revenue Leakage</h3>
    <p className="subheadline">
      Based on your inputs, your website may be costing you <strong>{formatMoney(revenue.lowMonthlyLoss)}</strong> to{' '}
      <strong>{formatMoney(revenue.highMonthlyLoss)}</strong> per month.
    </p>
    <p>
      That could mean <strong>{formatMoney(revenue.lowYearlyLoss)}</strong> to <strong>{formatMoney(revenue.highYearlyLoss)}</strong>{' '}
      per year in missed business.
    </p>
    <div className="stats-row">
      <div>
        <small>Current Leads / Month</small>
        <p>{revenue.currentLeads}</p>
      </div>
      <div>
        <small>Potential Leads / Month</small>
        <p>{revenue.potentialLeads}</p>
      </div>
      <div>
        <small>Missed Leads / Month</small>
        <p>{revenue.missedLeads}</p>
      </div>
    </div>
  </section>
);
