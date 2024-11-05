import { useEffect, useState } from "react";
import { myAxios } from "../../services/Helper";

const Orders = () => {

    const [orders,setOrders] = useState([]);

    const fetchOrders = async () => {
        try {
            const response = await myAxios.get(`/api/invoices/customerinvoicesbyEmail/${localStorage.getItem('useremail')}`);
            setOrders(response.data);
        } catch (error) {
            alert('error');
        }
    }
    console.log("mmm",orders);

    useEffect(()=>{
        fetchOrders();
    },[]);

    return (
        <>
            <div className="p-40">
                <div class="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <ul class="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 rounded-t-lg bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:bg-gray-800" id="defaultTab" data-tabs-toggle="#defaultTabContent" role="tablist">
                        <li class="me-2">
                            <button id="about-tab" data-tabs-target="#about" type="button" role="tab" aria-controls="about" aria-selected="true" class="inline-block p-4 text-blue-600 rounded-ss-lg hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-blue-500">Details</button>
                        </li>
                        <li class="me-2">
                            <button id="services-tab" data-tabs-target="#services" type="button" role="tab" aria-controls="services" aria-selected="false" class="inline-block p-4 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-gray-300">Track</button>
                        </li>
                        <li class="me-2">
                            <button id="statistics-tab" data-tabs-target="#statistics" type="button" role="tab" aria-controls="statistics" aria-selected="false" class="inline-block p-4 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-gray-300">Edit order</button>
                        </li>
                    </ul>
                    <div id="defaultTabContent">
                        <div class="hidden p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800" id="about" role="tabpanel" aria-labelledby="about-tab">
                            {orders.length !== 0 ? (
                                orders.map((orders,index)=>(
                                    <div class="flex items-center space-x-4 rtl:space-x-reverse gap-2 p-2">
                                <div class="flex-shrink-0">
                                    <img class="w-12 h-12 rounded-full" src={orders.image} alt={orders.products.name} />
                                </div>
                                <div class="flex-1 min-w-0">
                                    <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                        {orders.name}
                                    </p>
                                    <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                                       
                                    </p>
                                </div>
                                <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                    {orders.price}
                                </div>
                                </div>
                                ))

                            ) : (<h1>No orders.</h1>)}

                        </div>
                        <div class="hidden p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800" id="services" role="tabpanel" aria-labelledby="services-tab">
                            <h2 class="mb-5 text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">Order delivery status</h2>
                            {/* <!-- List --> */}
                            <ul role="list" class="space-y-4 text-gray-500 dark:text-gray-400">
                                <li class="flex space-x-2 rtl:space-x-reverse items-center">
                                    <svg class="flex-shrink-0 w-3.5 h-3.5 text-blue-600 dark:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                    </svg>
                                    <span class="leading-tight">Order placed</span>
                                </li>
                                <li class="flex space-x-2 rtl:space-x-reverse items-center">
                                    <svg class="flex-shrink-0 w-3.5 h-3.5 text-blue-600 dark:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                    </svg>
                                    <span class="leading-tight">Dispatched</span>
                                </li>
                                <li class="flex space-x-2 rtl:space-x-reverse items-center">
                                    <svg class="flex-shrink-0 w-3.5 h-3.5 text-blue-600 dark:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                    </svg>
                                    <span class="leading-tight">In transmit</span>
                                </li>
                                <li class="flex space-x-2 rtl:space-x-reverse items-center">
                                    <svg class="flex-shrink-0 w-3.5 h-3.5 text-blue-600 dark:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                    </svg>
                                    <span class="leading-tight">Out for delivery</span>
                                </li>
                            </ul>
                        </div>
                        <div class="hidden p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800" id="statistics" role="tabpanel" aria-labelledby="statistics-tab">
                            <dl class="grid max-w-screen-xl grid-cols-2 gap-8 p-4 mx-auto text-gray-900 sm:grid-cols-3 xl:grid-cols-6 dark:text-white sm:p-8">
                                <div class="flex flex-col">
                                    <dt class="mb-2 text-3xl font-extrabold">73M+</dt>
                                    <dd class="text-gray-500 dark:text-gray-400">Developers</dd>
                                </div>
                                <div class="flex flex-col">
                                    <dt class="mb-2 text-3xl font-extrabold">100M+</dt>
                                    <dd class="text-gray-500 dark:text-gray-400">Public repositories</dd>
                                </div>
                                <div class="flex flex-col">
                                    <dt class="mb-2 text-3xl font-extrabold">1000s</dt>
                                    <dd class="text-gray-500 dark:text-gray-400">Open source projects</dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}
export default Orders;