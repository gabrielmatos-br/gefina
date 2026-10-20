import { type Invoice } from "./invoicesType.ts";
import { formatCurrency, formatDate } from "./utils.ts";

interface InvoiceSummaryTableProps {
    title: string;
    dataLabel: string;
    invoices: Invoice[];
    date: (invoice: Invoice) => string
}

export default function InvoiceSummaryTable(props: InvoiceSummaryTableProps) {
    return <div>
        <h2>{props.title}</h2>

        <table>
            <thead>
                <tr>
                    <th>Cliente</th>
                    <th>Valor</th>
                    <th>{props.dataLabel}</th>
                </tr>
            </thead>
            <tbody>
                {props.invoices.map(invoice => (
                    <tr key={invoice.id}>
                        <td>{invoice.customer.name}</td>
                        <td>{formatCurrency(invoice.amount)}</td>
                        <td>{formatDate(props.date(invoice))}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>;
}