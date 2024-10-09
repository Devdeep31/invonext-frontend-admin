import { useEffect } from 'react';

const Customers = () => {

    
    useEffect(() => {
        
        const drawerButton = document.querySelector("[data-drawer-show='drawer-contact']");
        const drawer = document.getElementById('drawer-contact');
        const closeButton = document.querySelector("[data-drawer-hide='drawer-contact']");

        // Function to show the drawer (slide in from right)
        const showDrawer = () => {
            drawer.style.transform = 'translateX(0)';
        };

        // Function to hide the drawer (slide out to right)
        const hideDrawer = () => {
            drawer.style.transform = 'translateX(100%)';
        };

        // Add event listener to open the drawer
        drawerButton.addEventListener('click', showDrawer);

        // Add event listener to close the drawer
        closeButton.addEventListener('click', hideDrawer);

        // Cleanup function when component is unmounted
        return () => {
            drawerButton.removeEventListener('click', showDrawer);
            closeButton.removeEventListener('click', hideDrawer);
        };
    }, []); 

    return (
        <>

            <div className="w-[700px] p-2">

                <div className="text-xl font-bold p-4 text-slate-500 uppercase  dark:text-slate-500">
                    <h1 >Customers</h1>
                </div>

                <div class="pb-4  ">
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

                <div class="relative overflow-x-auto ">

                    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 justify-between text-center">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">

                            <tr>
                                <th scope="col" class="px-6 py-3">
                                    NAME
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    AMOUNT
                                </th>

                                <th scope="col" class="px-6 py-3">
                                    Details
                                </th>

                            </tr>
                        </thead>
                        <tbody >
                            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {/* name */}
                                    Deep
                                </th>
                                <td class="px-6 py-4 text-green-400">
                                    {/* Out */}
                                    ₹0
                                </td>

                                <td class="">
                                    {/* Out */}
                                    <button className="text-blue-200 h-6 rounded p-1">View</button>
                                </td>


                            </tr>
                            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {/* name */}
                                    Jena
                                </th>
                                <td class="px-6 py-4 text-green-400">
                                    {/* AMOUNT */}
                                    ₹1000
                                </td>

                                <td class="">
                                    {/* Out */}
                                    <button className="text-blue-200 h-6 rounded p-1">View</button>
                                </td>


                            </tr>

                        </tbody>
                    </table>

                    <div className=" flex mt-4 justify-end">
                        <button
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                            type="button"
                            data-drawer-show="drawer-contact"
                            aria-controls="drawer-contact"
                        >
                            + Add Customer
                        </button>

                    </div>
                    {/* Drawer element */}
                    <div
                        id="drawer-contact"
                        className="fixed top-0 right-0 z-40 h-screen p-4 overflow-y-auto transition-transform translate-x-full bg-white w-80 dark:bg-gray-800"
                        tabIndex="-1"
                        aria-labelledby="drawer-contact-label"
                    >
                        <h5
                            id="drawer-label"
                            className="inline-flex items-center mb-6 text-base font-semibold text-gray-500 uppercase dark:text-gray-400"
                        >
                            {/* SVG Icon */}
                            <svg
                                className="w-4 h-4 me-2.5"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 20 16"
                            >
                                <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                                <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                            </svg>
                            Add Customer
                        </h5>
                        <button
                            type="button"
                            data-drawer-hide="drawer-contact"
                            aria-controls="drawer-contact"
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                            {/* Close Icon */}
                            <svg
                                className="w-3 h-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 14 14"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                />
                            </svg>
                            <span className="sr-only">Close menu</span>
                        </button>
                        <form className="mb-6">
                            <div class="mb-5">
                                <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                                <input type="text" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='customer name' required />
                            </div>
                            <div className="mb-6">
                                <label
                                    htmlFor="email"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                 Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="name@company.com"
                                    required
                                />
                            </div>
                            <div className="mb-6">
                                <label
                                    htmlFor="subject"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Address
                                </label>
                                <input
                                    type="text"
                                    id="subject"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="customer address"
                                    required
                                />
                            </div>

                            <div className="mb-6">
                                <label
                                    htmlFor="subject"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Balance
                                </label>
                                <input
                                    type="number"
                                    id="subject"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Opening balance"
                                    required
                                />
                            </div>

                            <div className="mb-6">
                                <label
                                    htmlFor="message"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Your message
                                </label>
                                <textarea
                                    id="message"
                                    rows="4"
                                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Your message..."
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="text-white bg-blue-700 hover:bg-blue-800 w-full focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 block"
                            >
                                Save
                            </button>
                        </form>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            <a href="#" className="hover:underline">
                                invonext@company.com
                            </a>
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            <a href="#" className="hover:underline">
                                212-456-7890
                            </a>
                        </p>
                    </div>
                </div>
            </div>

        </>
    );
}

export default Customers;