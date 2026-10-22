import type { Invoice } from '../invoicesType.ts';
import InvoiceRow from './InvoiceRow.tsx';

interface InvoiceTableProp {
  invoices: Invoice[];
}

export default function InvoiceTable(props: InvoiceTableProp) {
  return (
    <table>
      <thead>
        <tr>
          <th>Cliente</th>
          <th>Valor</th>
          <th>Data de Emissão</th>
          <th>Data de Vencimento</th>
          <th>Situação</th>
        </tr>
      </thead>
      <tbody>
        {props.invoices.map((invoice) => (
          <InvoiceRow key={invoice.id} invoice={invoice} />
        ))}
      </tbody>
    </table>
  );
}
