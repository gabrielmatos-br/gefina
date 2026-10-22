import { BrowserRouter, Link, Route, Routes } from 'react-router';

import DashboardPage from './features/dashboard/pages/DashboardPage.tsx';
import InvoicePage from './features/invoice/pages/InvoicePage.tsx';

export default function App() {
  return (
    <BrowserRouter>
      <aside className='sidebar'>
        <header className='brand'>Gefina</header>
        <nav  className='menu'>
          <ul>
            <li>
              <Link to="/">Pagina Inicial</Link>
            </li>
          </ul>
          <ul>
            <li>
              <Link to="/faturas">Faturas</Link>
            </li>
          </ul>
        </nav>
      </aside>
      <main className='content'>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/faturas" element={<InvoicePage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
