import { useEffect, useState } from 'react';
import { formatCurrency } from '../../../shared/utils.ts';
import InvoiceSummaryTable from '../../invoice/components/InvoiceSummaryTable.tsx';
import SummaryCard from '../components/SummaryCard.tsx';
import type { Dashboard } from '../dashboardType.ts';

export default function DashboardPage() {
  const [dashboard, setDashboard] = useState<Dashboard | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getDashboard() {
      try {
        const response = await fetch('/api/dashboard');

        if (!response.ok) {
          setError('Não foi possivel carregar faturas.');
          setLoading(false);
          return;
        }

        const datas = await response.json();
        setDashboard(datas);
      } catch {
        setError('Não foi possivel carregar faturas.');
      }
      setLoading(false);
    }
    getDashboard();
  }, []);
  if (loading) return <p>Carregando painel inicial...</p>;
  if (error || dashboard === null) return <p>{error}</p>;
  return (
    <>
      <h1>Painel Inicial</h1>

      <div>
        <SummaryCard
          label="Total recebido:"
          value={formatCurrency(dashboard.totals.paid)}
        />
        <SummaryCard
          label="Total pendente:"
          value={formatCurrency(dashboard.totals.pending)}
        />
        <SummaryCard
          label="Faturas:"
          value={String(dashboard.totals.invoiceCount)}
        />
        <SummaryCard
          label="Clientes:"
          value={String(dashboard.totals.customerCount)}
        />
      </div>

      <InvoiceSummaryTable
        title="Faturas Recentes"
        dataLabel="Emissão"
        invoices={dashboard.recentInvoices}
        date={(invoice) => invoice.issueDate}
      />

      <InvoiceSummaryTable
        title="Faturas Atrasadas"
        dataLabel="Vencimento"
        invoices={dashboard.overdueInvoices}
        date={(invoice) => invoice.dueDate}
      />
    </>
  );
}
