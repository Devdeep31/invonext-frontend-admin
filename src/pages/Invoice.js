import React, { useState } from 'react';
import '../styles/style.css';

const Invoice = () => {
    const [activeTab, setActiveTab] = useState('sales');

    // Function to change active tab
    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    return (
        <>


            <div className="p-2 w-full  text-left rtl:text-right text-gray-500 dark:text-gray-400 text-xs text-slate-500 uppercase  dark:text-slate-500 flex gap-4 font-bold">


                <h1 className="text-xl">Total Sales <span className="text-green-500">₹100,000.00</span></h1>
                <h1 className='text-xl'>Total Purchase <span className="text-green-500"> ₹10,000.00</span></h1>



            </div>

            {/* Tab header */}
            <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
                <ul className="flex flex-wrap -mb-px">

                    <li className="me-2">
                        <a
                            href="#"
                            className={`inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 ${activeTab === 'sales' ? 'text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500' : 'border-transparent'}`}
                            onClick={() => handleTabClick('sales')}
                            aria-current={activeTab === 'sales' ? 'page' : undefined}
                        >
                            Sales
                        </a>
                    </li>
                    <li className="me-2">
                        <a
                            href="#"
                            className={`inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 ${activeTab === 'purchase' ? 'text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500' : 'border-transparent'}`}
                            onClick={() => handleTabClick('purchase')}
                        >
                            Purchase
                        </a>
                    </li>
                </ul>
            </div>

            {/* Tab content */}
            <div className="p-4">
                {activeTab === 'sales' && <div>
                    <h1 className='text-xl font-bold text-gray-500'>Create Sales Invoice</h1>

                    <div class="pb-4 mt-10">
                        <label for="table-search" class="sr-only">Search</label>
                        <div class="relative mt-1">
                            <div class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                            </div>
                            <input type="text" id="table-search" class="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for sales invoice" />
                        </div>
                    </div>

                    {/* Table */}
                    <div class="max-h-[200px] overflow-y-auto custom-scrollbar">
                        <table class="w-[700px] text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 justify-between text-center">
                            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr class="sticky top-0 bg-gray-50 dark:bg-gray-700">
                                    <th scope="col" class="px-6 py-3">PURCHASE</th>
                                    <th scope="col" class="px-6 py-3">AMOUNT</th>
                                    <th scope="col" class="px-6 py-3">PAYMENT STATUS</th>
                                    <th scope="col" class="px-6 py-3">Details</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">Deep</th>
                                    <td class="px-6 py-4 text-green-400">₹0</td>
                                    <td class="px-6 py-4 text-red-500">Pending</td>
                                    <td><button class="text-gray-800 dark:text-white h-6 rounded p-1">View</button></td>
                                </tr>
                                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">Max</th>
                                    <td class="px-6 py-4 text-green-400">₹1000</td>
                                    <td class="px-6 py-4 text-green-400">Paid</td>
                                    <td><button class="text-gray-800 dark:text-white h-6 rounded p-1">View</button></td>
                                </tr>
                                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">Alex</th>
                                    <td class="px-6 py-4 text-green-400">₹250</td>
                                    <td class="px-6 py-4 text-green-400">Pending</td>
                                    <td><button class="text-gray-800 dark:text-white h-6 rounded p-1">View</button></td>
                                </tr>
                                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">Maria</th>
                                    <td class="px-6 py-4 text-green-400">₹500</td>
                                    <td class="px-6 py-4 text-red-500">Pending</td>
                                    <td><button class="text-gray-800 dark:text-white h-6 rounded p-1">View</button></td>
                                </tr>
                                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">Shrawni</th>
                                    <td class="px-6 py-4 text-green-400">₹1200</td>
                                    <td class="px-6 py-4 text-green-400">Paid</td>
                                    <td><button class="text-gray-800 dark:text-white h-6 rounded p-1">View</button></td>
                                </tr>

                            </tbody>
                        </table>

                    </div>

                    <div className='flex justify-end mt-4 w-[700px]'>
                        <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">+ Sales</button>
                    </div>
                </div>}
                {activeTab === 'purchase' && <div>
                    <h1 className='text-xl font-bold text-gray-500'>Create Purchase Invoice</h1>

                    <div class="pb-4 mt-10">
                        <label for="table-search" class="sr-only">Search</label>
                        <div class="relative mt-1">
                            <div class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                            </div>
                            <input type="text" id="table-search" class="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for purchase invoice" />
                        </div>
                    </div>

                    {/* Table */}
                    <div class="max-h-[200px] overflow-y-auto custom-scrollbar">
                        <table class="w-[700px] text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 justify-between text-center">
                            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr class="sticky top-0 bg-gray-50 dark:bg-gray-700">
                                    <th scope="col" class="px-6 py-3">PURCHASE</th>
                                    <th scope="col" class="px-6 py-3">AMOUNT</th>
                                    <th scope="col" class="px-6 py-3">PAYMENT STATUS</th>
                                    <th scope="col" class="px-6 py-3">Details</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">Lisa</th>
                                    <td class="px-6 py-4 text-green-400">₹0</td>
                                    <td class="px-6 py-4 text-red-500">Pending</td>
                                    <td><button class="text-gray-800 dark:text-white h-6 rounded p-1">View</button></td>
                                </tr>
                                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">Sharwari</th>
                                    <td class="px-6 py-4 text-green-400">₹1000</td>
                                    <td class="px-6 py-4 text-green-400">Paid</td>
                                    <td><button class="text-gray-800 dark:text-white h-6 rounded p-1">View</button></td>
                                </tr>
                                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">Alex</th>
                                    <td class="px-6 py-4 text-green-400">₹250</td>
                                    <td class="px-6 py-4 text-green-400">Paid</td>
                                    <td><button class="text-gray-800 dark:text-white h-6 rounded p-1">View</button></td>
                                </tr>
                                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">Maria</th>
                                    <td class="px-6 py-4 text-green-400">₹500</td>
                                    <td class="px-6 py-4 text-red-500">Pending</td>
                                    <td><button class="text-gray-800 dark:text-white h-6 rounded p-1">View</button></td>
                                </tr>
                                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">Sophia</th>
                                    <td class="px-6 py-4 text-green-400">₹1200</td>
                                    <td class="px-6 py-4 text-green-400">Paid</td>
                                    <td><button class="text-gray-800 dark:text-white h-6 rounded p-1">View</button></td>
                                </tr>

                            </tbody>
                        </table>
                    </div>

                    <div className='flex justify-end mt-4 w-[700px]'>
                        <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">+ Purchase</button>
                    </div>
                </div>}
            </div>



        </>
    );
};

export default Invoice;
