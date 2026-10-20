import { type Invoice } from "./invoicesType";

export interface DashboardTotals {
    paid: number;
    pending: number;
    invoiceCount: number;
    customerCount: number;
}

export interface Dashboard {
    totals: DashboardTotals;
    recentInvoices: Invoice[];
    overdueInvoices: Invoice[];
}