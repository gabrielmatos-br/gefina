import { BrowserRouter, Link, Route, Routes } from 'react-router';

import DashboardPage from './features/dashboard/pages/DashboardPage.tsx';
import InvoicePage from './features/invoice/pages/InvoicePage.tsx';

export default function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Pagina Inicial</Link>
        <Link to="/faturas">Faturas</Link>
      </nav>

      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/faturas" element={<InvoicePage />} />
      </Routes>
    </BrowserRouter>
  );
}
