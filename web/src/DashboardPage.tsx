import { useEffect, useState } from 'react';

import type { Dashboard } from './dashboardType.ts';
import InvoiceSummaryTable from './InvoiceSummaryTable.tsx';
import SummaryCard from './SummaryCard.tsx';

import { formatCurrency } from './utils.ts';

export default function DashboardPage() {
  const [dashboard, setDashboard] = useState<null | Dashboard>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getDashboard() {
      try {
        const response = await fetch('/api/dashboard');

        if (!response.ok) {
          setError('Não foi possível carregar faturas.');
          setLoading(false);
          return;
        }

        const datas = await response.json();
        setDashboard(datas);
      } catch {
        setError('Não foi possível carregar faturas.');
      }

      setLoading(false);
    }

    getDashboard();
  }, []);

  if (loading) return <p className='text-xl font-semibold text-text-muted uppercase'>Carregando...</p>;

  if (error || dashboard === null) return <p className='text-overdue'>{error}</p>;

  return (
    <>
      <h1 className='text-xl font-semibold mb-7 uppercase'>Painel Inicial</h1>

      <div className='flex gap-4'>
        <SummaryCard
          label='Total recebido:'
          value={formatCurrency(dashboard.totals.paid)}
        />
        <SummaryCard
          label='Total pendente:'
          value={formatCurrency(dashboard.totals.pending)}
        />
        <SummaryCard
          label='Faturas:'
          value={String(dashboard.totals.invoiceCount)}
        />
        <SummaryCard
          label='Clientes'
          value={String(dashboard.totals.customerCount)}
        />
      </div>

      <div className='flex gap-6 mt-8'>
        <InvoiceSummaryTable
          title='Faturas recentes'
          dateLabel='Emissão'
          invoices={dashboard.recentInvoices}
          date={(invoice) => invoice.issueDate}
        />

        <InvoiceSummaryTable
          title='Faturas atrasadas'
          dateLabel='Vencimento'
          invoices={dashboard.overdueInvoices}
          date={(invoice) => invoice.dueDate}
        />
      </div>

      <small className='fixed bottom-0 left-[calc(50%+120px)] -translate-x-1/2'>&copy; 2026. Gefina - Gestor Financeiro simples e eficiente.</small>
    </>
  );
}
