import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Resources/favicon.jpg';

const Sidebar = () => {
  // State to track if the sidebar is collapsed
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Toggle the collapse state
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <aside className={`bg-[#0B2948] dark:bg-[#041e39] text-white h-full transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'}`}>
      <div className="p-4 font-bold text-lg flex text-center gap-2">
        <button onClick={toggleSidebar} className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={Logo} className="h-10 rounded-full" alt="Logo" />
          {/* Show text only when not collapsed */}
          {!isCollapsed && (
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              InvoNext
            </span>
          )}
        </button>
      </div>

      <ul className={`ml-6 ${isCollapsed ? 'ml-0' : 'ml-6'}`}>
        <li className="p-2">
          <Link to="/cashbook" className="hover:bg-gray-700 block p-2 rounded text-m flex items-center">
            <i className="bx bxs-book-bookmark text-lg text-[#59D0FF]"></i>
            {/* Show text only when not collapsed */}
            {!isCollapsed && <span className="ml-2 text-[#d4d4d4]">CashBook</span>}
          </Link>
        </li>
        <li className="p-2">
          <Link to="/customers" className="hover:bg-gray-700 block p-2 rounded text-m flex items-center">
            <i className="bx bxs-group text-lg text-[#59D0FF]"></i>
            {!isCollapsed && <span className="ml-2">Customers</span>}
          </Link>
        </li>
        <li className="p-2">
          <Link to="/expenses" className="hover:bg-gray-700 block p-2 rounded text-m flex items-center">
            <i className="bx bxs-objects-vertical-bottom text-lg text-[#59D0FF]"></i>
            {!isCollapsed && <span className="ml-2">Expense</span>}
          </Link>
        </li>
        <li className="p-2">
          <Link to="/invoice" className="hover:bg-gray-700 block p-2 rounded text-m flex items-center">
            <i className="bx bxs-report text-lg text-[#59D0FF]"></i>
            {!isCollapsed && <span className="ml-2">Invoice</span>}
          </Link>
        </li>
        <li className="p-2">
          <Link to="/inventory" className="hover:bg-gray-700 block p-2 rounded text-m flex items-center">
            <i className="bx bx-package text-lg text-[#59D0FF]"></i>
            {!isCollapsed && <span className="ml-2">Inventory</span>}
          </Link>
        </li>
        <li className="p-2">
          <Link to="/staff" className="hover:bg-gray-700 block p-2 rounded text-m flex items-center">
          <i class='bx bx-street-view text-lg text-[#59D0FF]'></i>
            {!isCollapsed && <span className="ml-2">Staff</span>}
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
