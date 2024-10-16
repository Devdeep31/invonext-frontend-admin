import React, { useEffect, useState } from 'react';
import '../styles/style.css';
import 'flowbite';
import { initFlowbite } from 'flowbite'

const Invoice = () => {
    const [activeTab, setActiveTab] = useState('sales');


    // Function to change active tab
    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };
    //to work flowbite in chromiam based browsers . . 
    useEffect(() => {
        initFlowbite();
    }, []);
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
                        <button data-modal-target="sale-invoice-modal" data-modal-toggle="sale-invoice-modal" class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
                            + Sales
                        </button>
                    </div>




                    {/* <!-- Modal toggle --> */}
                    {/* <button data-modal-target="default-modal" data-modal-toggle="default-modal" class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
                        Toggle modal
                    </button> */}

                    {/* <!-- Invoice Modal --> */}
                    <div id="sale-invoice-modal" tabindex="-1" aria-hidden="true" className="hidden fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-2">
                        <div class="p-2 bg-white rounded-lg shadow-lg w-full max-w-6xl">
                            {/* <!-- Modal Header --> */}
                            <div class="flex justify-between items-center p-4 border-b">
                                <h3 class="text-xl font-semibold text-gray-900">Create Invoice</h3>
                                <button type="button" class="text-gray-400 hover:text-gray-600" onclick="closeModal()">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                                    </svg>
                                </button>
                            </div>

                            {/* <!-- Modal Body --> */}
                            <div class="p-4 space-y-6 w-full">
                                {/* <!-- Party Details --> */}
                                <div class="grid grid-cols-2 gap-4">
                                    <div>
                                        <label for="party-name" class="block text-sm font-medium text-gray-700">Party Name*</label>
                                        <select id="party-name" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
                                            <option>Select Party</option>
                                            {/* <!-- Add party options dynamically --> */}
                                        </select>
                                    </div>
                                    <div>
                                        <label for="phone-number" class="block text-sm font-medium text-gray-700">Phone Number</label>
                                        <input type="tel" id="phone-number" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" placeholder="+91 Enter the phone number" />
                                    </div>
                                    <div>
                                        <label for="party-address" class="block text-sm font-medium text-gray-700">Party Address</label>
                                        <input type="text" id="party-address" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" placeholder="Enter address" />
                                    </div>
                                    <div>
                                        <label for="gstin" class="block text-sm font-medium text-gray-700">GSTIN</label>
                                        <input type="text" id="gstin" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" placeholder="Enter GSTIN" />
                                    </div>
                                </div>

                                {/* <!-- Invoice Details --> */}
                                <div class="grid grid-cols-2 gap-4">
                                    <div>
                                        <label for="bill-number" class="block text-sm font-medium text-gray-700">Bill Number</label>
                                        <input type="text" id="bill-number" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" value="1" />
                                    </div>
                                    <div>
                                        <label for="bill-date" class="block text-sm font-medium text-gray-700">Bill Date</label>
                                        <input type="date" id="bill-date" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
                                    </div>
                                    <div>
                                        <label for="payment-terms" class="block text-sm font-medium text-gray-700">Payment Terms & Due Date</label>
                                        <input type="text" id="payment-terms" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" placeholder="0 Days" />
                                    </div>
                                    <div>
                                        <label for="due-date" class="block text-sm font-medium text-gray-700">Due Date</label>
                                        <input type="date" id="due-date" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
                                    </div>
                                </div>

                                {/* <!-- Items on the Invoice --> */}
                                <div>
                                    <h4 class="text-lg font-medium text-gray-900">Items on the Invoice</h4>
                                    <table class="min-w-full mt-2 bg-white border">
                                        <thead class="bg-gray-50">
                                            <tr>
                                                <th class="border p-2">Sl. No.</th>
                                                <th class="border p-2">Items</th>
                                                <th class="border p-2">Quantity</th>
                                                <th class="border p-2">Unit</th>
                                                <th class="border p-2">Selling Price</th>
                                                <th class="border p-2">Rate (Incl. Discount)</th>
                                                <th class="border p-2">Discount</th>
                                                <th class="border p-2">Amount (₹)</th>
                                            </tr>
                                        </thead>
                                        <tbody id="invoice-items">
                                            {/* <!-- Dynamically add rows here --> */}
                                            <tr>
                                                <td class="border p-2">1</td>
                                                <td class="border p-2">Item details will be added after selecting from inventory</td>
                                                <td class="border p-2"></td>
                                                <td class="border p-2"></td>
                                                <td class="border p-2"></td>
                                                <td class="border p-2"></td>
                                                <td class="border p-2"></td>
                                                <td class="border p-2"></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <button type='button' class="mt-3 text-blue-600 hover:underline" data-drawer-target="category-drawer" data-drawer-show="category-drawer" data-drawer-placement="right" aria-controls="category-drawer" >+ Select Items from Inventory</button>

                                    {/* <div class="text-center">
                                        <button class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" type="button" data-drawer-target="category-drawer" data-drawer-show="category-drawer" data-drawer-placement="right" aria-controls="category-drawer">
                                            Show right drawer
                                        </button>
                                    </div> */}

                                    {/* <!-- drawer component --> */}
                                    <div id="category-drawer" class="fixed top-0 right-0 z-40 h-screen p-4 overflow-y-auto transition-transform translate-x-full bg-white w-80 dark:bg-gray-800" tabindex="-1" aria-labelledby="drawer-right-label">
                                        <h5 id="drawer-right-label" class="inline-flex items-center mb-4 text-base font-semibold text-gray-500 dark:text-gray-400"><svg class="w-4 h-4 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                                        </svg>Right drawer</h5>
                                        <button type="button" data-drawer-hide="category-drawer" aria-controls="category-drawer" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white" >
                                            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                            </svg>
                                            <span class="sr-only">Close menu</span>
                                        </button>
                                        <p class="mb-6 text-sm text-gray-500 dark:text-gray-400">Supercharge your hiring by taking advantage of our <a href="#" class="text-blue-600 underline font-medium dark:text-blue-500 hover:no-underline">limited-time sale</a> for Flowbite Docs + Job Board. Unlimited access to over 190K top-ranked candidates and the #1 design job board.</p>
                                        <div class="grid grid-cols-2 gap-4">
                                            <a href="#" class="px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-200 rounded-lg focus:outline-none hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Learn more</a>
                                            <a href="#" class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Get access <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                            </svg></a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* <!-- Modal Footer --> */}
                            <div class="flex justify-end p-4 border-t">
                                <button class="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 focus:ring-4 focus:ring-blue-300" onclick="submitInvoice()">Create Invoice</button>
                            </div>
                        </div>
                    </div>


                    {/* Drawer for select item from inventory */}

                    {/* <!-- drawer init and toggle --> */}

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
