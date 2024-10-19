
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import DashBoard from './components/Application';
import Test from './pages/Test';
import CashBook from './pages/Cashbook';
import Customers from './pages/Customers';
import Invoice from './pages/Invoice';
import { Login } from './services/CustomerService';
import SimpleForm from './pages/Test';
import Inventory from './pages/Inventory';
import Staff from './pages/Staff';
import Application from './components/Application';
import Dashboard from './pages/Dashboard';
import Expense from './pages/Expense';

function App() {

  return (
    <Router>
      <Routes>
        {/* seprate routes here */}
        <Route path='/' element={<Login />} />
        <Route path='/login' element={<Login />} />
        <Route path='/form' element={<Test />} />
        <Route element={<Application />}>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/cashbook' element={<CashBook />} />
          <Route path='/expenses' element={<Expense />} />
          <Route path='/customers' element={<Customers />} />
          <Route path='/invoice' element={<Invoice />} />
          <Route path='/inventory' element={<Inventory />} />
          <Route path='/staff' element={<Staff />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
