
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import DashBoard from './components/Dashboard';
import Test from './pages/Test';
import CashBook from './pages/Cashbook';
import Customers from './pages/Customers';
import Invoice from './pages/Invoice';

function App() {

  return (
   <Router>
    <Routes>
      {/* seprate routes here */}
      <Route element={<DashBoard/>}>
        <Route path='/' element={<Test/>}/>
        <Route path='/cashbook' element={<CashBook/>} />
        <Route path='/customers' element={<Customers/>} />
        <Route path='/invoice' element={<Invoice/>} />
      </Route>
    </Routes>
   </Router>
  );
}

export default App;
