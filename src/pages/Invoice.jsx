import React, { useEffect, useRef, useState } from 'react';
import '../styles/style.css';
import 'flowbite';
import { initFlowbite } from 'flowbite'
import useFetch from '../components/Axios/useFetch';
import { Field, Form, Formik, ErrorMessage, handleChange } from "formik";
import { myAxios } from '../services/Helper';
import useCart from './Invoice_components/useCart';
import { Navigate, redirect, useNavigate } from "react-router-dom";




const Invoice = () => {
    const token = localStorage.getItem("token");
    const [activeTab, setActiveTab] = useState('sales');
    const [selectedCustomer, setSelectedCustomer] = useState({});

    //const [selectedInvocie, setSelectedInvocie] = useState(null);

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



    const SelectedCustInitialState = {
        name: selectedCustomer.name,
        phonenumber: selectedCustomer.phonenumber,
        address: selectedCustomer.address,
        //invoice_id: "INXT" + Math.floor((Math.random() * 100000000) + 1)
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
    const [getProducts, prError, prLoading] = useFetch('api/products/products');
    //////////////////////////////////////////////////////////////////////////////////////////

    const [invoiceItems, setInvoiceItems] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);

    const addProductToInvoice = (product, quantity) => {
        const existingItemIndex = invoiceItems.findIndex(item => item.id === product.id);
        if (existingItemIndex >= 0) {
            const updatedItems = [...invoiceItems];
            updatedItems[existingItemIndex].quantity += quantity;
            setInvoiceItems(updatedItems);
        } else {
            setInvoiceItems([...invoiceItems, { ...product, quantity }]);
        }
    };

    const handleAddProduct = () => {
        if (selectedProduct && quantity > 0) {
            addProductToInvoice(selectedProduct, parseInt(quantity));
            setQuantity(1);
        }
    };

    const calculateTotal = () => {
        return invoiceItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };


    //////////////////////////////////////////////////////////////////////////////////////////
    const [cart, setCart] = useState([]);

    const [cartQuantity, setCartquantity] = useState('');

    // Add `cartQuantity` to the product when adding it to the cart
    const addCart = (product) => {
        // Find if product already exists in cart
        const existingItemIndex = cart.findIndex((item) => item.productid === product.productid);

        if (existingItemIndex >= 0) {
            // If product exists, update its cartQuantity
            const updatedCart = [...cart];
            updatedCart[existingItemIndex].cartQuantity += parseInt(cartQuantity, 10); // Add new quantity to existing cartQuantity
            setCart(updatedCart);
        } else {
            // Add product with initial cartQuantity
            const productWithCartQuantity = { ...product, cartQuantity: parseInt(cartQuantity, 10) };
            setCart([...cart, productWithCartQuantity]);
        }

        console.log("Cart after adding product:", cart);
        setCartquantity(''); // Reset input quantity
    };

    // Handle the change in input for cart quantity
    const handleInputChange = (e) => {
        setCartquantity(e.target.value); // Update quantity from input
    };

    //console.log(cart.map((c)=>{`cart ****`+c.cartQuantity,c.name}));


    // Define removeCartItem function to remove a specific product from the cart
    const removeCartItem = (productid) => {
        // Filter out the product that matches the provided productid
        const updatedCart = cart.filter((item) => item.productid !== productid);
        setCart(updatedCart); // Update the cart state with the filtered array

        console.log("Updated cart after removal:", updatedCart);
    };

    //////////////////////////////////////////////////////////////////////////////////////////


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
    //console.log("random id " + randomPrId + getProducts.length);
    //
    //setSelectedInvocie(SelectedCustInitialState.invoice_id);
    //const selectedInvoiceId = SelectedCustInitialState.invoice_id;
    const [invoiceID, setInvoiceID] = useState('');
    console.log('invoice id ' + invoiceID);

    const generateInvoiceId = () => {
        const id = "INXT" + Math.floor((Math.random() * 100000000) + 1);
        setInvoiceID(id);
    }


    const invoiceInitialState = {
        invoiceId: invoiceID,
        customer: {
            customerid: selectedCustomer.customerid,
            name: selectedCustomer.name,
            email: selectedCustomer.email,
            phonenumber: selectedCustomer.phonenumber,

            address: selectedCustomer.address,
            balance: "",
            message: ""
        },
        products:
            cart
        ,
        paymentName: selectedCustomer.name,
        paymentNum: selectedCustomer.phonenumber,
        address: selectedCustomer.address,
        gstin: "",
        billNum: "",
        billDate: "",
        termDueDate: "",
        billMode : "offline"
    }
    const generateInvoice = () => {
        window.open(`/invoice-view?invoiceId=${invoiceInitialState.invoiceId}`, '_blank');
    }
    /////view invoice
    const viewInvoice = (invoiceid) => {
        window.open(`/invoice-view?invoiceId=${invoiceid}`, '_blank');
    }
    // const navigate = useNavigate();
    const [isInvoiceSaveTriggered, setIsInvoiceSaveTriggerd] = useState(false);

    const invoiceCustomer = async (invoiceCustomer) => {
        try {
            const response = await myAxios.post('/api/invoices', invoiceCustomer);
            setIsInvoiceSaveTriggerd(true);
            if (response.status === 201) { alert('done') }
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

    const [invoices, setInvoices] = useState([]);
    const fetchInvoices = async () => {
        try {
            const response = await myAxios.get('/api/invoices')
            setInvoices(response.data);
        } catch (error) {
            alert(error);
        }
    }

    //to work flowbite in chromiam based browsers . . 
    useEffect(() => {
       
        fetchInvoices();
    }, []);

    const dataRef = useRef(invoices);
    useEffect(()=>{
        initFlowbite();
        dataRef.current = invoices;
    },[invoices]);
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
                                    <th scope="col" class="px-6 py-3">INVOICEMODE</th>
                                    <th scope="col" class="px-6 py-3">PAYMENTMODE</th>
                                    <th scope="col" class="px-6 py-3">PAYMENT STATUS</th>
                                    <th scope="col" class="px-6 py-3">Details</th>
                                </tr>
                            </thead>
                            <tbody>
                                {invoices.length !== 0 ? (invoices.map((invoice, index) => (
                                    <>

                                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{invoice.customer.name}</th>
                                            <td class="px-6 py-4 text-green-400">{invoice.products.price}</td>
                                            <td class="px-6 py-4 text-green-500">{invoice.billMode} purchase</td>
                                            <td class="px-6 py-4 text-green-500">{invoice.paymentMode} </td>
                                            {invoice.status === 'complete' ? (<td class="px-6 py-4 text-green-500">{invoice.status}</td>):(<td class="px-6 py-4 text-red-500">{invoice.status}</td>)}
                                            
                                            <td><button onClick={()=>{viewInvoice(invoice.invoiceId)}} class="text-gray-800 dark:text-white h-6 rounded p-1">View</button></td>
                                        </tr>

                                    </>
                                ))) : (<h1>Invoices not found</h1>)}



                            </tbody>
                        </table>

                    </div>

                    <div className='flex justify-end mt-4 w-[700px]'>
                        <button onClick={() => { generateInvoiceId() }} data-modal-target="sale-invoice-modal" data-modal-toggle="sale-invoice-modal" class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
                            + Sales
                        </button>
                    </div>




                    {/* <!-- Modal toggle --> */}
                    {/* <button data-modal-target="selectproduct-modal" data-modal-toggle="selectproduct-modal" class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
                        Toggle modal
                    </button> */}

                    {/* <!-- Invoice Modal  sale-invoice-modal --> */}
                    <div id="sale-invoice-modal" tabindex="-1" aria-hidden="true" class="hidden fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-2">
                        <div class="p-2 bg-white rounded-lg shadow-lg w-full max-w-6xl h-[700px] overflow-y-auto">
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
                                    onSubmit={(val) => { invoiceCustomer(val) }}
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
                                                    <Field name="invoiceId" value={selectedCustomer.name ? invoiceInitialState.invoiceId : "Invoice Id"} type="text" id="bill-number" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
                                                </div>
                                                <div>
                                                    <label for="bill-date" class="block text-sm font-medium text-gray-700">Bill Date</label>
                                                    <Field name="billdate" type="date" id="bill-date" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
                                                </div>
                                                <div>
                                                    <label for="payment-terms" class="block text-sm font-medium text-gray-700">Payment Terms & Due Date</label>
                                                    <Field type="text" id="payment-terms" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" placeholder="0 Days" />
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
                                                        {cart.map((item, index) => (

                                                            <tr>
                                                                <td class="border p-2">{index}</td>
                                                                <td class="border p-2">{cart.length != 0 ? item.name : 'Item details will be added after selecting from inventory'}</td>
                                                                <td class="border p-2">{(item.price*item.cartQuantity) / (item.price)}</td>
                                                                <td class="border p-2">1</td>
                                                                <td class="border p-2">{item.price}</td>
                                                                <td class="border p-2">{item.cartQuantity * item.price}</td>
                                                                <td class="border p-2">0%</td>
                                                                <td class="border p-2">{item.cartQuantity * item.price}</td>
                                                            </tr>

                                                        ))}

                                                    </tbody>
                                                </table>
                                                <div>
                                                    <button
                                                        data-modal-target="selectproduct-modal" data-modal-toggle="selectproduct-modal"
                                                        type='button' class="mt-3 text-blue-600 hover:underline"  >+ Select Items from Inventory</button>

                                                </div>

                                                {/* <div class="text-center">
                                        <button class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" type="button" data-drawer-target="category-drawer" data-drawer-show="category-drawer" data-drawer-placement="right" aria-controls="category-drawer">
                                            Show right drawer
                                        </button>
                                    </div> */}


                                                {/*Show selected products dertails*/}

                                                <div class="flex gap-2 justify-end p-4 border-t">
                                                    {cart.length !== 0 ? (<button type='submit' class="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 focus:ring-4 focus:ring-blue-300">Save</button>) : (<h1 className='text-red-500'>*Add customer details & add products to the cart to generate an invoice</h1>)}

                                                    {isInvoiceSaveTriggered ? (<button onClick={() => { generateInvoice() }} type='button' class="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 focus:ring-4 focus:ring-blue-300">Generate invoice</button>) : ''}

                                                </div>



                                            </div>
                                        </Form>
                                    )}
                                </Formik>



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



            {/* Modal for select products*/}




            <div id="selectproduct-modal" tabindex="-1" aria-hidden="true" class="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-opacity-75 bg-black">
                <div class="relative w-full h-full">
                    <div class="relative bg-white rounded-lg shadow dark:bg-gray-700 w-full h-full overflow-auto">
                        {/* <!-- Modal content here --> */}
                        <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                                Select Product
                            </h3>
                            <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="selectproduct-modal">
                                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span class="sr-only">Close modal</span>
                            </button>
                        </div>

                        <div className='p-2'>
                            {/* <!-- drawer component for select product --> */}

                            <h5 id="drawer-right-label" class="inline-flex items-center mb-4 text-base font-semibold text-gray-500 dark:text-gray-400"><svg class="w-4 h-4 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                            </svg>Select Product</h5>


                            <div className='flex gap-4'>
                                <div className='w-1/2'>
                                    {/* Dropdown */}
                                    <label
                                        htmlFor="subject"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Choose a category
                                    </label>
                                    <select
                                        // as="select"
                                        name="category"
                                        id="category"
                                        onChange={(event) => {
                                            //handleChange(event); // Update form state
                                            getProductByCategory(event.target.value); // Call function to fetch products by selected category
                                        }}
                                        className="form-select rounded-xl"
                                    >
                                        <option value="" label="Select category" />
                                        {categories.map((category, index) => (
                                            <option key={index} value={category.category_name}>
                                                {category.category_name}
                                            </option>
                                        ))}
                                    </select>


                                    {/* Show validation error */}
                                    {/* <ErrorMessage name="category" component="div" className="text-red-500" /> */}




                                    <div class="mt-2 relative overflow-x-auto">
                                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                                <tr>
                                                    <th scope="col" className="px-6 py-3">Product name</th>
                                                    <th scope="col" className="px-6 py-3">Price</th>
                                                    <th>Stock</th>
                                                    <th scope="col" className="px-6 py-3">Quantity</th>
                                                    <th scope="col" className="px-6 py-3">Add</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {selectedCategoryProducts.map((product, index) => (
                                                    <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                            {product.name}
                                                        </th>
                                                        <td className="px-6 py-4">{product.price}</td>
                                                        <td className="px-6 py-4">{product.quantity}</td>
                                                        <td className="px-6 py-4">
                                                            {product.quantity >= 1 ? (
                                                                <input
                                                                    type="number"
                                                                    value={cartQuantity}
                                                                    onChange={handleInputChange}
                                                                    min="1"
                                                                    placeholder=""
                                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-20 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                                                                />
                                                            ) : (
                                                                ""
                                                            )}
                                                        </td>
                                                        <td>
                                                            {product.quantity >= 1 ? (
                                                                <button
                                                                    onClick={() => addCart(product)}
                                                                    type="button"
                                                                    className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                                                                >
                                                                    Add
                                                                </button>
                                                            ) : (
                                                                <h1 className="text-red-500">Out of stock</h1>
                                                            )}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>

                                </div>

                                <div className="w-1/2 mt-[77px] relative overflow-x-auto">
                                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                            <tr>
                                                <th scope="col" className="px-6 py-3">Product name</th>
                                                <th scope="col" className="px-6 py-3">Quantity</th>
                                                <th scope="col" className="px-6 py-3">Total price</th>
                                                <th scope="col" className="px-6 py-3">Remove</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {cart.map((cartItem, index) => (
                                                <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                        {cartItem.name}
                                                    </th>
                                                    <td className="px-6 py-4">{cartItem.cartQuantity}</td>
                                                    <td className="px-6 py-4">{cartItem.price * cartItem.cartQuantity}</td>
                                                    <td className="px-6 py-4">
                                                        <button
                                                            className="text-red-400 hover:text-red-600"
                                                            type="button"
                                                            onClick={() => removeCartItem(cartItem.productid)}
                                                        >
                                                            <i className="bx bx-trash-alt text-xl"></i> {/* Trash icon */}
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>


                                {/* // Function to remove product from cart
                                                         const removeFromCart = (productId) => {
                                                            setCart(cart.filter(item => item.id !== productId));
   
                                                        }; */}

                            </div>

                        </div>
                        {/* Footer */}
                        <div>
                            <button type="button" class="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Proceed</button>
                        </div>


                    </div>
                </div>
            </div>




        </>
    );
};

export default Invoice;
