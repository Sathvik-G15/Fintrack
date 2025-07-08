import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Transactions from './pages/Transactions';
import Dashboard from './pages/Dashboard';
import Budgets from './pages/Budgets';
import NotFound from './pages/NotFound';
import SetBudget from './pages/SetBudget';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/budgets" element={<Budgets />} />
          <Route path="/budgets/set" element={<SetBudget />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
