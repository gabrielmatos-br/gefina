import type { Invoice } from '../types/invoiceType';

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
