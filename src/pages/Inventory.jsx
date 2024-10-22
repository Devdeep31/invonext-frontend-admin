import React, { useEffect, useState } from 'react';
import Dropdown from '../components/scripts/Dropdown';
import { initFlowbite } from 'flowbite'
import useFetch from '../Hooks/useFetch';
import { myAxios } from '../services/Helper';
import { Field, Form, Formik, ErrorMessage, handleChange } from 'formik';
import * as Yup from 'yup'; // For validation
const Inventory = () => {

    //const [categories,setCategories] = useState();

    // const [activeTab, setActiveTab] = useState('category');

    // Function to change active tab
    // const handleTabClick = (tab) => {
    //     setActiveTab(tab);
    // };

    //Drop down button script
    // const { isOpen, toggleDropdown, dropdownRef } = Dropdown();

    const [categories, setCategories] = useState([]);
    const [categories_data, error, loading] = useFetch('/category/getAllCategories');
    const [products, setProducts] = useState([]);
    const [products_data, product_error, product_loading] = useFetch('/product/products');

    //Extra Hook to handle update changes


    const [selectedCategory, setSelectedCategory] = useState({});

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


    // Pagination Logic

    // const categories = [
    //     { name: 'Electronics', details: 'All Electronics items' },
    //     { name: 'Furniture', details: 'Various furniture items' },
    //     { name: 'Clothing', details: 'Fashion and clothing items' },
    //     { name: 'Footwear', details: 'Different types of footwear' },
    //     { name: 'Sports', details: 'Sporting goods and equipment' },
    //     { name: 'Toys', details: 'Children toys and games' },
    //     { name: 'Books', details: 'Various genres of books' },
    //     { name: 'Beauty', details: 'Beauty and skincare products' },
    //     { name: 'Health', details: 'Health and wellness products' },
    //     { name: 'Automotive', details: 'Automotive accessories and parts' },
    //     // Add more categories as needed
    // ];

    const [currentCategoryPage, setcurrentCategoryPage] = useState(1);
    const categoriesPerPage = 10;

    // Calculate Pagination for Categories
    const indexOfLastCategory = currentCategoryPage * categoriesPerPage;
    const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
    const currentCategories = categories.slice(indexOfFirstCategory, indexOfLastCategory);
    const totalCategoryPages = Math.ceil(categories.length / categoriesPerPage);

    const paginateCategories = (pageNumber) => setcurrentCategoryPage(pageNumber);


    //product pagination

    //Hook for



    const [currentProductPage, setCurrentProductPage] = useState(1);
    const productsPerPage = 10; // products per page

    // Calculate Pagination for Products
    const indexOfLastProduct = currentProductPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalProductPages = Math.ceil(products.length / productsPerPage);

    const paginateProducts = (pageNumber) => setCurrentProductPage(pageNumber);

    //Validations
    const validationSchema = Yup.object({
        category: Yup.string().required('Category is required'),
    });
    //CRUD ROUTES
    const getCategory = async (val) => {
        try {
            const response = await myAxios.get('/category/getCategory/' + val)
            setSelectedCategory(response.data);
        } catch (error) {
            alert(error);
        }
    }
    //addCateory
    const categoryInitialState = {
        category_name: '',
        category_description: ''
    }
    const addCategory = async (val) => {
        try {
            const response = await myAxios.post('/category/addProductCategory', val);
            if (response.status == 200) {
                alert('Category created');
            }
        } catch (error) {
            alert('Error ! ' + error);
        }
    }
    //Update Category
    const updateCategory = async (val) => {
        try {
            const response = await myAxios.put('/category/updateCategory', val)
            alert('Category updated' + response.status);
        } catch (error) {
            alert(error);
        }
    }
    //addProduct
    const productInitialState = {
        name: '',
        category: '',
        price: '',
        quantity: '',
        image: '',
        description: ''
    }
    const addProduct = async (val) => {
        try {
            const response = await myAxios.post('/product/addpr', val);
            alert('Product added');
        } catch (error) {
            alert(error)
        }
    }
    //select Product
    const [selectedProduct, setSelectedProduct] = useState({});
    const editProduct = async (val) => {
        try {
            const response = await myAxios.get('/product/' + val)
            setSelectedProduct(response.data);
        } catch (error) {
            alert(error);
        }
    }
    //update product
    const updateProduct = async (val) => {
        try {
            const response = await myAxios.put('product/update', val);
            alert('Product updated');
        } catch (error) {
            alert(error);
        }
    }


    useEffect(() => {
        initFlowbite();
        if (categories_data) {
            setCategories(categories_data);
        }
        if (products_data) {
            setProducts(products_data);
        }

    }, [categories_data, products_data,products,currentProducts]); // Re-run the effect when activeTab changes



    return (
        <>
            <div className="p-2 w-full  text-left rtl:text-right text-gray-500 dark:text-gray-400 text-xs text-slate-500 uppercase  dark:text-slate-500 flex gap-4 font-bold">


                <h1 className="text-xl">Total Products <span className="text-green-500">500</span></h1>
                <h1 className='text-xl'>Total Categories <span className="text-green-500">10</span></h1>



            </div>

            {/* Tab header */}
            <div class="mb-4 border-b border-gray-200 dark:border-gray-700">
                <ul class="flex flex-wrap -mb-px text-sm font-medium text-center" id="inventory-tab" data-tabs-toggle="#expense-tab-content" role="tablist">

                    <li class="me-2" role="presentation">
                        <button class="inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300" id="addCategory-tab" data-tabs-target="#addCategory" type="button" role="tab" aria-controls="addCategory" aria-selected="false">Category</button>
                    </li>
                    <li class="me-2" role="presentation">
                        <button class="inline-block p-4 border-b-2 rounded-t-lg" id="product-tab" data-tabs-target="#addProduct" type="button" role="tab" aria-controls="addProduct" aria-selected="false">Products</button>
                    </li>


                </ul>
            </div>

            <div id="addCategory-tab-content">
                <div class="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800" id="addCategory" role="tabpanel" aria-labelledby="addCategory">
                    <div>
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
                            <table className="w-[700px] text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 justify-between text-center table-auto border-collaps">
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
                                                {category.category_name}
                                            </th>
                                            <td className="px-6 py-4 whitespace-nowrap overflow-hidden text-ellipsis  max-w-xs">{category.category_description}</td>
                                            <td className="px-6 py-4">
                                                <button
                                                    data-modal-target="editCategory-modal"
                                                    data-modal-toggle="editCategory-modal"
                                                    onClick={() => {
                                                        getCategory(category.categoryId);
                                                    }}
                                                    className="text-blue-500 dark:text-blue-200 h-6 rounded p-1">View</button>
                                            </td>

                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Modal for udpate Category */}
                    <div id="editCategory-modal" tabindex="-1" aria-hidden="true" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">

                        <div class="relative p-4 w-full max-w-2xl max-h-full bg-white">
                            <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                                    Update Category
                                </h3>
                                <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="editCategory-modal">
                                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                    </svg>
                                    <span class="sr-only">Close modal</span>
                                </button>
                            </div>
                            {/* Modal Content Here */}
                            <Formik
                                initialValues={selectedCategory}
                                enableReinitialize={true}
                                onSubmit={(val) => updateCategory(val)}
                            >


                                <Form>
                                    {/* Form elements here */}
                                    <div className="mb-6">
                                        <label
                                            htmlFor="subject"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            Name
                                        </label>
                                        <Field
                                            type="text"
                                            id="subject"
                                            name="category_name"
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
                                        <Field
                                            name="category_description"
                                            id="message"
                                            as="textarea"
                                            rows="4"
                                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="Category description..."
                                        />
                                    </div>


                                    <button
                                        type="submit"
                                        className=" mt-6 text-white bg-blue-700 hover:bg-blue-800 w-full focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 block"
                                    >
                                        Save
                                    </button>


                                </Form>
                            </Formik>

                        </div>
                    </div>

                    {/* Pagination Controls for Categories */}
                    <div className="flex justify-center gap-2 mt-4 w-[700px]">
                        <button
                            onClick={() => paginateCategories(currentCategoryPage - 1)}
                            disabled={currentCategoryPage === 1}
                            className="bg-gray-200 rounded px-4 py-2 disabled:opacity-50"
                        >
                            Previous
                        </button>
                        <button
                            onClick={() => paginateCategories(currentCategoryPage + 1)}
                            disabled={currentCategoryPage === totalCategoryPages}
                            className="bg-gray-200 rounded px-4 py-2 disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>

                    {/* Display current page number for Categories */}
                    <div className="text-center justify-center mt-2 w-[700px]">
                        <span>Page {currentCategoryPage} of {totalCategoryPages}</span>
                    </div>


                    {/* <div className='flex justify-end mt-2 w-[700px]'>
                            <button type="button" data-drawer-show="drawer-add-category" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">+ Add category</button>
                        </div> */}

                    <div className='flex justify-end mt-2 w-[700px]'>
                        <button class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" type="button" data-drawer-target="drawer-add-category" data-drawer-show="drawer-add-category" data-drawer-placement="right" aria-controls="drawer-add-category">
                            + Add category
                        </button>
                    </div>
                </div>
            </div>


            {/* Drawer for add category */}
            < div id="drawer-add-category" class="fixed top-0 right-0 z-40 h-screen p-4 overflow-y-auto transition-transform translate-x-full bg-white w-80 dark:bg-gray-800" tabindex="-1" aria- labelledby="drawer-right-label" >
                <h5 id="drawer-right-label" class="inline-flex items-center mb-4 text-base font-semibold text-gray-500 dark:text-gray-400"><svg class="w-4 h-4 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                </svg>Add category</h5>
                <button type="button" data-drawer-hide="drawer-add-category" aria-controls="drawer-add-category" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white" >
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                    </svg>
                    <span class="sr-only">Close menu</span>
                </button>
                <Formik
                    initialValues={categoryInitialState}
                    onSubmit={(val) => addCategory(val)}
                >


                    <Form>
                        {/* Form elements here */}
                        <div className="mb-6">
                            <label
                                htmlFor="subject"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Name
                            </label>
                            <Field
                                type="text"
                                id="subject"
                                name="category_name"
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
                            <Field
                                name="category_description"
                                id="message"
                                as="textarea"
                                rows="4"
                                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Category description..."
                            />
                        </div>


                        <button
                            type="submit"
                            className=" mt-6 text-white bg-blue-700 hover:bg-blue-800 w-full focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 block"
                        >
                            Save
                        </button>


                    </Form>
                </Formik>
            </div>






            {/* Product tab */}
            < div id="expense-tab-content" >
                <div class="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800" id="addProduct" role="tabpanel" aria-labelledby="addProduct-tab">
                    <div>
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
                            <table className="w-[700px] text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 justify-between text-center table-auto border-collapse">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr className="sticky top-0 bg-gray-50 dark:bg-gray-700">
                                        <th scope="col" className="px-6 py-3">Name</th>
                                        <th scope="col" className="px-6 py-3">Category</th>
                                        <th scope="col" className="px-6 py-3">Quantity</th>
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
                                            <td className="px-6 py-4 whitespace-nowrap overflow-hidden text-ellipsis  max-w-xs">{product.description}</td>
                                            <td>
                                                <button
                                                    data-modal-target="editProduct-modal"
                                                    data-modal-toggle="editProduct-modal"
                                                    onClick={() => {
                                                        editProduct(product.productid)
                                                    }}

                                                    className="text-gray-800 dark:text-white h-6 rounded p-1">Edit</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Modal for udpate Product */}
                        <div id="editProduct-modal" tabindex="-1" aria-hidden="true" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">

                            <div class="relative p-4 w-full max-w-2xl max-h-full bg-white">
                                <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                    <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                                        Update Product
                                    </h3>
                                    <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="editProduct-modal">
                                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                        </svg>
                                        <span class="sr-only">Close modal</span>
                                    </button>
                                </div>
                                <Formik
                                    initialValues={selectedProduct}
                                    enableReinitialize={true}
                                    onSubmit={(val) => { updateProduct(val) }}
                                >

                                    {({ values, handleChange }) => (
                                        <Form>
                                            {/* Form elements here */}
                                            <div className="mb-6">
                                                <label
                                                    htmlFor="subject"
                                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                                >
                                                    Name
                                                </label>
                                                <Field
                                                    name="name"
                                                    type="text"
                                                    id="subject"
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    placeholder="Product name"
                                                    required
                                                />
                                            </div>


                                            {/* Button to trigger dropdown */}



                                            {/* <!-- Dropdown menu --> */}
                                            <div>
                                                {/* Dropdown */}
                                                <label
                                                    htmlFor="subject"
                                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                                >
                                                    Choose a category
                                                </label>
                                                <Field as="select" name="category" id="category" onChange={handleChange} className="form-select rounded-xl">
                                                    <option value="" label="Select category" />
                                                    {categories.map((category, index) => (
                                                        <option key={index} value={category.category_name}>
                                                            {category.category_name}
                                                        </option>
                                                    ))}
                                                </Field>

                                                {/* Show validation error */}
                                                <ErrorMessage name="category" component="div" className="text-red-500" />
                                            </div>

                                            <div className="flex gap-1">
                                                <div className="mb-6 mt-4 w-1/2">
                                                    <label
                                                        htmlFor="subject"
                                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                                    >
                                                        Price
                                                    </label>
                                                    <Field
                                                        name="price"
                                                        type="number"
                                                        id="subject"
                                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                        placeholder="Product price per unit"
                                                        required
                                                    />
                                                </div>

                                                <div className="mb-6 mt-4 w-1/2">
                                                    <label
                                                        htmlFor="subject"
                                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                                    >
                                                        Quantity
                                                    </label>
                                                    <Field
                                                        name="quantity"
                                                        type="number"
                                                        id="subject"
                                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                        placeholder="Product quantity"
                                                        required
                                                    />
                                                </div>
                                            </div>


                                            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Upload image</label>
                                            <Field name="image">
                                                {({ field, form }) => (
                                                    <input
                                                        type="file"
                                                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                                        id="file_input"
                                                        onChange={(event) => form.setFieldValue("image", event.target.files[0])}
                                                    />
                                                )}
                                            </Field>



                                            <p id="error-message" class="text-red-600 mt-2"></p>


                                            <div className="mb-6 mt-4">
                                                <label
                                                    htmlFor="message"
                                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                                >
                                                    Description
                                                </label>
                                                <Field
                                                    name="description"
                                                    as="textarea"
                                                    id="message"
                                                    rows="4"
                                                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    placeholder="Product description..."
                                                />
                                            </div>



                                            <button
                                                type="submit"
                                                className=" mt-6 text-white bg-blue-700 hover:bg-blue-800 w-full focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 block"
                                            >
                                                Save
                                            </button>


                                        </Form>
                                    )}
                                </Formik>
                            </div>
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




                        <div className='flex justify-end mt-2 w-[700px]'>
                            <button class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" type="button" data-drawer-target="drawer-add-product" data-drawer-show="drawer-add-product" data-drawer-placement="right" aria-controls="drawer-add-product">
                                + Add product
                            </button>
                        </div>
                    </div>
                </div>
            </div >




            {/* Drawer for "Product" */}
            < div id="drawer-add-product" class="fixed top-0 right-0 z-40 h-screen p-4 overflow-y-auto transition-transform translate-x-full bg-white w-80 dark:bg-gray-800" tabindex="-1" aria- labelledby="drawer-right-label" >
                <h5 id="drawer-right-label" class="inline-flex items-center mb-4 text-base font-semibold text-gray-500 dark:text-gray-400"><svg class="w-4 h-4 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                </svg>Add product</h5>
                <button type="button" data-drawer-hide="drawer-add-product" aria-controls="drawer-add-product" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white" >
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                    </svg>
                    <span class="sr-only">Close menu</span>
                </button>
                <Formik
                    initialValues={productInitialState}
                    onSubmit={(val) => { addProduct(val) }}
                >

                    {({ values, handleChange }) => (
                        <Form>
                            {/* Form elements here */}
                            <div className="mb-6">
                                <label
                                    htmlFor="subject"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Name
                                </label>
                                <Field
                                    name="name"
                                    type="text"
                                    id="subject"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Product name"
                                    required
                                />
                            </div>


                            {/* Button to trigger dropdown */}



                            {/* <!-- Dropdown menu --> */}
                            <div>
                                {/* Dropdown */}
                                <label
                                    htmlFor="subject"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Choose a category
                                </label>
                                <Field as="select" name="category" id="category" onChange={handleChange} className="form-select rounded-xl">
                                    <option value="" label="Select category" />
                                    {categories.map((category, index) => (
                                        <option key={index} value={category.category_name}>
                                            {category.category_name}
                                        </option>
                                    ))}
                                </Field>

                                {/* Show validation error */}
                                <ErrorMessage name="category" component="div" className="text-red-500" />
                            </div>


                            <div className="mb-6 mt-4">
                                <label
                                    htmlFor="subject"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Price
                                </label>
                                <Field
                                    name="price"
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
                                <Field
                                    name="quantity"
                                    type="number"
                                    id="subject"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Product quantity"
                                    required
                                />
                            </div>


                            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Upload image</label>
                            <Field
                                name="image"
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
                                <Field
                                    name="description"
                                    as="textarea"
                                    id="message"
                                    rows="4"
                                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Product description..."
                                />
                            </div>



                            <button
                                type="submit"
                                className=" mt-6 text-white bg-blue-700 hover:bg-blue-800 w-full focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 block"
                            >
                                Save
                            </button>


                        </Form>
                    )}
                </Formik>
            </div>
        </>
    );
}
export default Inventory;