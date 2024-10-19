import React, { useEffect, useState } from 'react';
import Dropdown from '../components/scripts/Dropdown';
const Inventory = () => {

    const [activeTab, setActiveTab] = useState('category');

    // Function to change active tab
    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    //Drop down button script
    const { isOpen, toggleDropdown, dropdownRef } = Dropdown();

    //image validator

    function validateImageFile() {
        const fileInput = document.getElementById('file_input');
        const filePath = fileInput.value;
        const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
        const errorMessage = document.getElementById('error-message');

        if (!allowedExtensions.exec(filePath)) {
            errorMessage.textContent = 'Please upload a valid image file (jpg, jpeg, png, gif).';
            fileInput.value = ''; // Clear the input if invalid file type
            return false;
        } else {
            errorMessage.textContent = ''; // Clear any previous error message
        }
    }

    // DRAWER IMPL
    useEffect(() => {
        // Drawer event handler for "category" tab
        if (activeTab === 'category') {
            const drawerButtonIn = document.querySelector("[data-drawer-show='drawer-add-category']");
            const drawerIn = document.getElementById('drawer-add-category');
            const closeButtonIn = document.querySelector("[data-drawer-hide='drawer-add-category']");

            if (drawerButtonIn && drawerIn && closeButtonIn) {
                const showDrawerIn = () => {
                    drawerIn.style.transform = 'translateX(0)';
                };
                const hideDrawerIn = () => {
                    drawerIn.style.transform = 'translateX(100%)';
                };

                drawerButtonIn.addEventListener('click', showDrawerIn);
                closeButtonIn.addEventListener('click', hideDrawerIn);

                // Cleanup function
                return () => {
                    drawerButtonIn.removeEventListener('click', showDrawerIn);
                    closeButtonIn.removeEventListener('click', hideDrawerIn);
                };
            }
        }

        // Drawer event handler for "product" tab
        if (activeTab === 'product') {
            const drawerButtonOut = document.querySelector("[data-drawer-show='drawer-add-product']");
            const drawerOut = document.getElementById('drawer-add-product');
            const closeButtonOut = document.querySelector("[data-drawer-hide='drawer-add-product']");

            if (drawerButtonOut && drawerOut && closeButtonOut) {
                const showDrawerOut = () => {
                    drawerOut.style.transform = 'translateX(0)';
                };
                const hideDrawerOut = () => {
                    drawerOut.style.transform = 'translateX(100%)';
                };

                drawerButtonOut.addEventListener('click', showDrawerOut);
                closeButtonOut.addEventListener('click', hideDrawerOut);

                // Cleanup function
                return () => {
                    drawerButtonOut.removeEventListener('click', showDrawerOut);
                    closeButtonOut.removeEventListener('click', hideDrawerOut);
                };
            }
        }
    }, [activeTab]); // Re-run the effect when activeTab changes

    // Pagination Logic

    const categories = [
        { name: 'Electronics', details: 'All Electronics items' },
        { name: 'Furniture', details: 'Various furniture items' },
        { name: 'Clothing', details: 'Fashion and clothing items' },
        { name: 'Footwear', details: 'Different types of footwear' },
        { name: 'Sports', details: 'Sporting goods and equipment' },
        { name: 'Toys', details: 'Children toys and games' },
        { name: 'Books', details: 'Various genres of books' },
        { name: 'Beauty', details: 'Beauty and skincare products' },
        { name: 'Health', details: 'Health and wellness products' },
        { name: 'Automotive', details: 'Automotive accessories and parts' },
        // Add more categories as needed
    ];

    const [currentPage, setCurrentPage] = useState(1);
    const categoriesPerPage = 10;

    // Calculate Pagination for Categories
    const indexOfLastCategory = currentPage * categoriesPerPage;
    const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
    const currentCategories = categories.slice(indexOfFirstCategory, indexOfLastCategory);
    const totalCategoryPages = Math.ceil(categories.length / categoriesPerPage);

    const paginateCategories = (pageNumber) => setCurrentPage(pageNumber);


    //product pagination

    const products = [
        { name: 'Smart TV', category: 'Electronics', quantity: 20, details: 'Smart android TVs' },
        { name: 'Laptop', category: 'Electronics', quantity: 15, details: 'High-performance laptop' },
        { name: 'Smartphone', category: 'Electronics', quantity: 30, details: 'Latest model smartphone' },
        { name: 'Headphones', category: 'Accessories', quantity: 50, details: 'Noise-cancelling headphones' },
        { name: 'Smart Watch', category: 'Wearables', quantity: 25, details: 'Wearable fitness tracker' },
        { name: 'Tablet', category: 'Electronics', quantity: 10, details: 'Lightweight tablet' },
        { name: 'Camera', category: 'Photography', quantity: 5, details: 'DSLR camera with lenses' },
        { name: 'Bluetooth Speaker', category: 'Audio', quantity: 40, details: 'Portable Bluetooth speaker' },
        { name: 'External Hard Drive', category: 'Storage', quantity: 12, details: '1TB external hard drive' },
        { name: 'Wireless Charger', category: 'Accessories', quantity: 100, details: 'Fast wireless charging pad' },
       
    ];

    const [currentProductPage, setCurrentProductPage] = useState(1);
    const productsPerPage = 10; // products per page

    // Calculate Pagination for Products
    const indexOfLastProduct = currentProductPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalProductPages = Math.ceil(products.length / productsPerPage);

    const paginateProducts = (pageNumber) => setCurrentProductPage(pageNumber);



    return (
        <>
            <div className="p-2 w-full  text-left rtl:text-right text-gray-500 dark:text-gray-400 text-xs text-slate-500 uppercase  dark:text-slate-500 flex gap-4 font-bold">


                <h1 className="text-xl">Total Products <span className="text-green-500">500</span></h1>
                <h1 className='text-xl'>Total Categories <span className="text-green-500">10</span></h1>



            </div>

            {/* Tab header */}
            <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
                <ul className="flex flex-wrap -mb-px">

                    <li className="me-2">
                        <a
                            href="#"
                            className={`inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 ${activeTab === 'category' ? 'text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500' : 'border-transparent'}`}
                            onClick={() => handleTabClick('category')}
                            aria-current={activeTab === 'category' ? 'page' : undefined}
                        >
                            category
                        </a>
                    </li>
                    <li className="me-2">
                        <a
                            href="#"
                            className={`inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 ${activeTab === 'product' ? 'text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500' : 'border-transparent'}`}
                            onClick={() => handleTabClick('product')}
                        >
                            product
                        </a>
                    </li>
                </ul>
            </div>

             {/* Tab for Category */}
            <div className="p-4">
                {activeTab === 'category' && <div>
                    <h1 className='text-xl font-bold text-gray-500'>Add product category</h1>

                    <div class="pb-4 mt-10">
                        <label for="table-search" class="sr-only">Search</label>
                        <div class="relative mt-1">
                            <div class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                            </div>
                            <input type="text" id="table-search" class="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for category invoice" />
                        </div>
                    </div>

                    {/* Categories Table */}
                    <div className="max-h-[600px] overflow-y-auto custom-scrollbar mb-6">
                        <table className="w-[700px] text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 justify-between text-center">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-500 dark:bg-gray-700 dark:text-gray-400 bg-gray-500">
                                <tr className="sticky top-0 bg-gray-500 dark:bg-gray-700">
                                    <th scope="col" className="px-6 py-3">Category Name</th>
                                    <th scope="col" className="px-6 py-3">Details</th>
                                    <th scope="col" className="px-6 py-3">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentCategories.map((category, index) => (
                                    <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {category.name}
                                        </th>
                                        <td className="px-6 py-4">{category.details}</td>
                                        <td className="px-6 py-4">Edit</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination Controls for Categories */}
                    <div className="flex justify-center gap-2 mt-4 w-[700px]">
                        <button
                            onClick={() => paginateCategories(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="bg-gray-200 rounded px-4 py-2 disabled:opacity-50"
                        >
                            Previous
                        </button>
                        <button
                            onClick={() => paginateCategories(currentPage + 1)}
                            disabled={currentPage === totalCategoryPages}
                            className="bg-gray-200 rounded px-4 py-2 disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>

                    {/* Display current page number for Categories */}
                    <div className="text-center justify-center mt-2 w-[700px]">
                        <span>Page {currentPage} of {totalCategoryPages}</span>
                    </div>


                    <div className='flex justify-end mt-2 w-[700px]'>
                        <button type="button" data-drawer-show="drawer-add-category" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">+ Add category</button>
                    </div>
                </div>}
                
                {/* Tab for Products */}
                {activeTab === 'product' && <div>
                    <h1 className='text-xl font-bold text-gray-500'>Add products</h1>

                    <div class="pb-4 mt-10">
                        <label for="table-search" class="sr-only">Search</label>
                        <div class="relative mt-1">
                            <div class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                            </div>
                            <input type="text" id="table-search" class="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for product invoice" />
                        </div>
                    </div>

                    {/* Table */}
                    {/* Products Table */}
                    <div className="max-h-[600px] overflow-y-auto custom-scrollbar">
                        <table className="w-[700px] text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 justify-between text-center">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr className="sticky top-0 bg-gray-50 dark:bg-gray-700">
                                    <th scope="col" className="px-6 py-3">Name</th>
                                    <th scope="col" className="px-6 py-3">Category</th>
                                    <th scope="col" className="px-6 py-3">Total Quantity</th>
                                    <th scope="col" className="px-6 py-3">Details</th>
                                    <th scope="col" className="px-6 py-3">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentProducts.map((product, index) => (
                                    <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {product.name}
                                        </th>
                                        <td className="px-6 py-4">{product.category}</td>
                                        <td className="px-6 py-4">{product.quantity}</td>
                                        <td className="px-6 py-4">{product.details}</td>
                                        <td>
                                            <button className="text-gray-800 dark:text-white h-6 rounded p-1">Edit</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination Controls for Products */}
                    <div className="flex justify-center gap-2 mt-4 w-[700px]">
                        <button
                            onClick={() => paginateProducts(currentProductPage - 1)}
                            disabled={currentProductPage === 1}
                            className="bg-gray-200 rounded px-4 py-2 disabled:opacity-50"
                        >
                            Previous
                        </button>
                        <button
                            onClick={() => paginateProducts(currentProductPage + 1)}
                            disabled={currentProductPage === totalProductPages}
                            className="bg-gray-200 rounded px-4 py-2 disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>

                    {/* Display current page number for Products */}
                    <div className="text-center mt-2 justify-center w-[700px]">
                        <span>Page {currentProductPage} of {totalProductPages}</span>
                    </div>




                    <div className='flex justify-end mt-4 w-[700px]'>
                        <button type="button" data-drawer-show="drawer-add-product" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">+ Add product</button>
                    </div>
                </div>}

            </div>
            <div className="relative overflow-x-auto">
                {/* <div className='flex justify-end mt-4 w-[700px]'>
                        <button type="button" data-drawer-show="drawer-add-product" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">+ Add product</button>
                    </div>
                    <div className='flex justify-end mt-4 w-[700px]'>
                        <button type="button" data-drawer-show="drawer-add-category" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">+ Add category</button>
                    </div> */}
                {/* Drawer for "category" */}
                <div id="drawer-add-category"
                    className="fixed top-0 right-0 z-40 h-screen p-4 overflow-y-auto transition-transform translate-x-full bg-white w-80 dark:bg-gray-800"
                    tabIndex="-1" aria-labelledby="drawer-contact-label-in">
                    <h5 id="drawer-contact-label-in"
                        className="inline-flex items-center mb-6 text-base font-semibold text-gray-500 uppercase dark:text-gray-400">
                        Add product category
                    </h5>
                    <button type="button" data-drawer-hide="drawer-add-category"
                        aria-controls="drawer-add-category" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 right-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white">
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                        <span className="sr-only">Close menu</span>
                    </button>
                    {/* Form for "In" Drawer */}


                    <form>
                        {/* Form elements here */}
                        <div className="mb-6">
                            <label
                                htmlFor="subject"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Name
                            </label>
                            <input
                                type="number"
                                id="subject"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Category name"
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label
                                htmlFor="message"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Description
                            </label>
                            <textarea
                                id="message"
                                rows="4"
                                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Category description..."
                            ></textarea>
                        </div>


                        <button
                            type="submit"
                            className=" mt-6 text-white bg-blue-700 hover:bg-blue-800 w-full focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 block"
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

                {/* Drawer for "Product" */}
                <div id="drawer-add-product"
                    className="fixed top-0 right-0 z-40 h-screen p-4 overflow-y-auto transition-transform translate-x-full bg-white w-80 dark:bg-gray-800"
                    tabIndex="-1" aria-labelledby="drawer-contact-label-out">
                    <h5 id="drawer-contact-label-out"
                        className="inline-flex items-center mb-6 text-base font-semibold text-gray-500 uppercase dark:text-gray-400">
                        Add product
                    </h5>
                    <button type="button" data-drawer-hide="drawer-add-product"
                        aria-controls="drawer-add-product" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 right-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white">
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                        <span className="sr-only">Close menu</span>
                    </button>
                    {/* Form for "Out" Drawer */}
                    <form>
                        {/* Form elements here */}
                        <div className="mb-6">
                            <label
                                htmlFor="subject"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Name
                            </label>
                            <input
                                type="text"
                                id="subject"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Product name"
                                required
                            />
                        </div>

                        <div className="relative inline-block">
                            {/* Button to trigger dropdown */}
                            <button
                                onClick={toggleDropdown}
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                Select category
                                <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
                                </svg>
                            </button>

                            {/* Dropdown menu */}
                            {isOpen && (
                                <div
                                    ref={dropdownRef}
                                    className="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
                                    style={{ top: '100%', left: '0' }}  // Ensure the dropdown opens below the button
                                >
                                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                                        <li><a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Electronics</a></li>
                                        <li><a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Kitchen</a></li>
                                        <li><a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Decoration</a></li>

                                    </ul>
                                </div>
                            )}
                        </div>

                        <div className="mb-6 mt-4">
                            <label
                                htmlFor="subject"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Price
                            </label>
                            <input
                                type="number"
                                id="subject"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Product price per unit"
                                required
                            />
                        </div>

                        <div className="mb-6 mt-4">
                            <label
                                htmlFor="subject"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Quantity
                            </label>
                            <input
                                type="number"
                                id="subject"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Product quantity"
                                required
                            />
                        </div>


                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Upload image</label>
                        <input
                            class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                            id="file_input"
                            type="file"
                            // accept="image/*"  <!-- Allows only image files -->
                            onchange="validateImageFile()"
                        />

                        <p id="error-message" class="text-red-600 mt-2"></p>


                        <div className="mb-6 mt-4">
                            <label
                                htmlFor="message"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Description
                            </label>
                            <textarea
                                id="message"
                                rows="4"
                                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Product description..."
                            ></textarea>
                        </div>



                        <button
                            type="submit"
                            className=" mt-6 text-white bg-blue-700 hover:bg-blue-800 w-full focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 block"
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
        </>
    );
}
export default Inventory;