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
import TestPagination from './pages/Test';
import GenerateReport from './services/GenerateRepot';
import SelectProducts from './pages/Invoice_components/productmng';
import InvoiceGenerator from './pages/Test';
import GenerateInvoice from './pages/Invoice_components/GenerateInvoice';
import ClientApplication from './pages/client/ClientApp';
import ShopHome from './pages/client/Home';
import Orders from './pages/client/Orders';
import Cart from './pages/client/Cart';
import ShopNextLogin from './services/ShopNextLogin';


function App() {
  

  return (
    <Router>
      <Routes>
        {/* seprate routes here */}
        <Route path='/' element={<Login />} />
        <Route path='/login' element={<Login />} />
        <Route path='/invoice/selectproducts' element={<SelectProducts/>}/>
        <Route path='/form' element={<GenerateReport />} />
        <Route path="/invoice-view" element={<GenerateInvoice />} />
        <Route element={<Application />}>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/cashbook' element={<CashBook />} />
          <Route path='/expenses' element={<Expense />} />
          <Route path='/customers' element={<Customers />} />
          <Route path='/invoice' element={<Invoice />} />
          <Route path='/inventory' element={<Inventory />} />
          <Route path='/staff' element={<Staff />} />
        </Route>
        
        <Route path='/shopnext/login' element={<ShopNextLogin />} />
        <Route element={<ClientApplication/>}>
          {/* Pass addToCart and cart as props to ShopHome and Cart */}
          <Route path='/shopnext' element={<ShopHome />} />
          <Route path='/orders' element={<Orders />} />
          <Route path='/cart' element={<Cart/>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
