import type { Invoice } from "./invoicesType";
import { situationLabel, formatCurrency, formatDate } from "./utils";

interface InvoiceRowProps {
    invoice: Invoice;
}

export default function InvoiceRow(props: InvoiceRowProps) {
    return <tr>
        <td>{props.invoice.customer.name}</td>
        <td>{formatCurrency(props.invoice.amount)}</td>
        <td>{formatDate(props.invoice.issueDate)}</td>
        <td>{formatDate(props.invoice.dueDate)}</td>
        <td>{situationLabel(props.invoice.situation)}</td>
    </tr>;
}