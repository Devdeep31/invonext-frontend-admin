import React, { useEffect, useState } from 'react';
import '../styles/style.css';
import 'flowbite';
import { initFlowbite } from 'flowbite'
import useFetch from '../components/Axios/useFetch';
import { Field, Form, Formik, ErrorMessage, handleChange } from "formik";
import { myAxios } from '../services/Helper';
import useCart from './Invoice_components/useCart';
import { Navigate , redirect, useNavigate } from "react-router-dom";




const Invoice = () => {
    const token = localStorage.getItem("token");
    const [activeTab, setActiveTab] = useState('sales');
    const [selectedCustomer, setSelectedCustomer] = useState({});

    //proceed cart data . . 
   



    // const [cart, setCart] = useState([]);

    // const addCart = (product) => {
    //     setCart([...cart, product]);
    //     console.log('product added to the cart');
    // }

    // const removeCartItem=(productId)=>{
    //     setCart(cart.filter(item => item.id !== productId));
    //     console.log('item removed');
    // }

    // cart.map((item,index)=>{
    //     console.log(item.name);
    // })


    const handleSelectCustomer = (customer) => {
        setSelectedCustomer(customer);
    }

    let num

    const SelectedCustInitialState = {
        name: selectedCustomer.name,
        phonenumber: selectedCustomer.phonenumber,
        address: selectedCustomer.address,
        invoice_id: "INXT" + Math.floor((Math.random() * 100000000) + 1)
    }
    console.log(selectedCustomer.name + " " + selectedCustomer.phonenumber + " " + SelectedCustInitialState.address);

    const [customers, error, loading] = useFetch('api/customer/customers');
    //console.log(customers);


    const [categories, error_categories, loading_categories] = useFetch('api/products/category/getAllCategories');

    //GET PRODUCT by category
    const [selectedCategoryProducts, setSelectedCategoryProducts] = useState([]);
    // const [getProductByCategory,getPrCr_error,getPrCr_loading] = useFetch('api/products/getbycategory/'+selectedCategory);
    console.log("selectedCategoryProducts" + selectedCategoryProducts.name);

    const getProductByCategory = async (category) => {
        try {
            const response = await myAxios.get('/api/products/getbycategory/' + category, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setSelectedCategoryProducts(response.data);
        } catch (error) {
            alert(error);
        }
    }


    // Function to change active tab
    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    //
    const [getProducts,prError,prLoading] = useFetch('api/products/products');


    function getRandomProductId(products) {
        // Check if the products array is not empty
        if (products.length === 0) {
            return null; // Return null or handle empty case as needed
        }
        // Get a random index based on the array length
        const randomIndex = Math.floor(Math.random() * products.length);
        const randomProduct = products[randomIndex];
        return randomProduct.productid;
    }
    const randomPrId = getRandomProductId(getProducts);
    console.log("random id "+randomPrId+getProducts.length);
    //
    const invoiceInitialState = {
        invoiceId: "",
        customer: {
            customerid: selectedCustomer.customerid,
            name: selectedCustomer.name,
            email: selectedCustomer.email,
            phonenumber: selectedCustomer.phonenumber,

            address: selectedCustomer.address,
            balance: "",
            message: ""
        },
        products: [
            {
                productid: randomPrId,
                name: "",
                price: "",
                quantity: "",
                image: "",
                description: "",
                category: ""
            }
        ],
        paymentName: selectedCustomer.name,
        paymentNum: selectedCustomer.phonenumber,
        address: selectedCustomer.address,
        gstin: "",
        billNum: "",
        billDate: "",
        termDueDate: ""
    }
   // const navigate = useNavigate();

    const invoiceCustomer = async (invoiceCustomer) => {
        try {
            const response = await myAxios.post('/api/invoices', invoiceCustomer, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            //if(response.status === 201){alert('done')}
            //navigate('/invoice/selectproducts')
        } catch (error) {
            alert(error);
        }
    }

   
        const [navigate, setNavigate] = React.useState(false);
    
        const handleRedirect = () => {
            // Specify the URL you want to open
            const url = 'http://localhost:3000/invoice/selectproducts'; // Change to your desired URL
            window.open(url, '_blank'); // Opens the URL in a new tab
        };




    //to work flowbite in chromiam based browsers . . 
    useEffect(() => {
        initFlowbite();
    }, [activeTab]);
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
                    <h1 className='text-xl font-bold text-gray-500'>Sales Invoice</h1>

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
                        <table class="w-[900px] text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 justify-between text-center">
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

                    {/* <!-- Invoice Modal  sale-invoice-modal --> */}
                    <div id="sale-invoice-modal" tabindex="-1" aria-hidden="true" className="hidden fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-2">
                        <div class="p-2 bg-white rounded-lg shadow-lg w-full max-w-6xl">
                            {/* <!-- Modal Header --> */}
                            <div class="flex justify-between items-center p-4 border-b">
                                <h3 class="text-xl font-semibold text-gray-900">Create sales invoice</h3>
                                <button type="button" data-drawer-hide="sale-invoice-modal" aria-controls="sale-invoice-modal" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white" >
                                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                    </svg>
                                    <span class="sr-only">Close menu</span>
                                </button>
                            </div>



                            {/* <!-- Modal Body --> */}
                            <div class="p-4 space-y-6 w-full">
                                {/* <!-- Party Details --> */}
                                <Formik
                                    initialValues={invoiceInitialState}
                                    onSubmit={(val)=>{invoiceCustomer(val)}}
                                    enableReinitialize={true}
                                >
                                    {({ values, handleChange }) => (
                                        <Form>
                                            <div class="grid grid-cols-2 gap-4">

                                                <div>
                                                    <label for="party-name" class="block text-sm font-medium text-gray-700">Party Name*</label>
                                                    <button

                                                        data-modal-target="selectCustomer-modal"
                                                        data-modal-toggle="selectCustomer-modal"
                                                        id="party-name" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
                                                        {selectedCustomer.name ? selectedCustomer.name : "Party name*"}
                                                        {/* <!-- Add party options dynamically --> */}
                                                    </button>
                                                    {/* <Field value={selected} /> */}
                                                </div>
                                                <div>
                                                    <label for="phone-number" class="block text-sm font-medium text-gray-700">Phone Number</label>
                                                    <Field name="phonenumber" type="number" id="phone-number" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" placeholder="+91 Enter the phone number" />
                                                </div>
                                                <div>
                                                    <label for="party-address" class="block text-sm font-medium text-gray-700">Party Address</label>
                                                    <Field name="address" type="text" id="party-address" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" placeholder="Enter address" />
                                                </div>
                                                <div>
                                                    <label for="gstin" class="block text-sm font-medium text-gray-700">GSTIN</label>
                                                    <Field name="gstin" type="text" id="gstin" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" placeholder="Enter GSTIN" />
                                                </div>
                                            </div>

                                            {/* <!-- Invoice Details --> */}
                                            {/* Invoic id auto generated */}
                                            <div class="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label for="bill-number" class="block text-sm font-medium text-gray-700">Bill Number</label>
                                                    <Field value={selectedCustomer.name ? SelectedCustInitialState.invoice_id : "Invoice Id"} type="text" id="bill-number" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
                                                </div>
                                                <div>
                                                    <label for="bill-date" class="block text-sm font-medium text-gray-700">Bill Date</label>
                                                    <Field name="billdate" type="date" id="bill-date" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
                                                </div>
                                                <div>
                                                    <label for="payment-terms" class="block text-sm font-medium text-gray-700">Payment Terms & Due Date</label>
                                                    <Field  type="text" id="payment-terms" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" placeholder="0 Days" />
                                                </div>
                                                <div>
                                                    <label for="due-date" class="block text-sm font-medium text-gray-700">Due Date</label>
                                                    <Field name="termDueDate" type="date" id="due-date" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
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
                                                <div>
                                                <button type='submit'  onClick={handleRedirect} class="mt-3 text-blue-600 hover:underline"  >+ Select Items from Inventory</button>
                                               
                                                </div>

                                                {/* <div class="text-center">
                                        <button class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" type="button" data-drawer-target="category-drawer" data-drawer-show="category-drawer" data-drawer-placement="right" aria-controls="category-drawer">
                                            Show right drawer
                                        </button>
                                    </div> */}


                                                {/*Show selected products dertails*/}



                                            </div>
                                        </Form>
                                    )}
                                </Formik>
                                <div class="flex justify-end p-4 border-t">
                                    <button class="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 focus:ring-4 focus:ring-blue-300" onclick="submitInvoice()">Create Invoice</button>
                                </div>


                            </div>

                            {/* <!-- Modal Footer --> */}



                        </div>

                    </div>

                    {/* MODAL FOR SELECT CUSTOMER */}
                    <div id="selectCustomer-modal" tabindex="-1" aria-hidden="true" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">

                        <div class="relative p-4 w-full max-w-2xl max-h-full bg-white border border-color: rgb(3 7 18)">
                            <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                                    Select customer
                                </h3>
                                <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="selectCustomer-modal">
                                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                    </svg>
                                    <span class="sr-only">Close modal</span>
                                </button>
                            </div>
                            <div className="relative overflow-x-auto custom-scrollbar">
                                <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                                    <div class="pb-4 bg-white dark:bg-gray-900">
                                        <label for="table-search" class="sr-only">Search</label>
                                        <div class="relative mt-1">
                                            <div class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                                                <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                                </svg>
                                            </div>
                                            <input type="text" id="table-search" class="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for items" />
                                        </div>
                                    </div>
                                    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 p-2">
                                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                            <tr>

                                                <th scope="col" class="px-6 py-3">
                                                    Customer name
                                                </th>
                                                <th scope="col" class="px-6 py-3">
                                                    Mobile number
                                                </th>
                                                <th scope="col" class="px-6 py-3">
                                                    Balance
                                                </th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            {customers.map((customer, index) => (
                                                <>
                                                    <tr
                                                        key={index}
                                                        onClick={() => handleSelectCustomer(customer)}
                                                        class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">

                                                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                            {customer.name}
                                                        </th>
                                                        <td class="px-6 py-4">
                                                            {customer.phonenumber}
                                                        </td>
                                                        <td class="px-6 py-4">
                                                            {customer.balance}
                                                        </td>
                                                    </tr>
                                                </>
                                            ))}

                                        </tbody>
                                    </table>

                                </div>
                            </div>
                        </div>
                    </div>


                    {/* Sales Invoice End */}


                    {/* Drawer for select item from inventory */}

                    {/* <!-- drawer init and toggle --> */}

                </div>}


            </div >



            

<!-- Modal toggle -->
<button data-modal-target="default-modal" data-modal-toggle="default-modal" class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
  Toggle modal
</button>


<div id="default-modal" tabindex="-1" aria-hidden="true" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div class="relative p-4 w-full max-w-2xl max-h-full">
       
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
           
            <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                   Select Product
                </h3>
                <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span class="sr-only">Close modal</span>
                </button>
            </div>
           
            <div class="p-4 md:p-5 space-y-4">
                <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    With less than a month to go before the European Union enacts new consumer privacy laws for its citizens, companies around the world are updating their terms of service agreements to comply.
                </p>
                <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant to ensure a common set of data rights in the European Union. It requires organizations to notify users as soon as possible of high-risk data breaches that could personally affect them.
                </p>
            </div>
        
            <div class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                <button data-modal-hide="default-modal" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">I accept</button>
                <button data-modal-hide="default-modal" type="button" class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Decline</button>
            </div>
        </div>
    </div>
</div>




        </>
    );
};

export default Invoice;
