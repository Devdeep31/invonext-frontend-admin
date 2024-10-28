import { initFlowbite } from 'flowbite'
import { useEffect, useState } from 'react';
import useFetch from '../../components/Axios/useFetch'
import { myAxios } from '../../services/Helper'
//import '../styles/style.css';
import 'flowbite';

import CartData from './selectedproducts';



const SelectProducts = () => {
    const token = localStorage.getItem('token');

    const [selectedCategoryProducts, setSelectedCategoryProducts] = useState([]);
    const [cart, setCart] = useState([]);

    



    const addCart = (product) => {
        // Check if the product already exists in the cart
        if (!cart.some(item => item.productid === product.productid)) {
            setCart([...cart, product]);
            console.log('Product added to cart:', product);
        } else {
            console.log('Product is already in the cart:', product);
        }
    };

    const removeCartItem = (productid) => {
        console.log('Attempting to remove product with productid:', productid);
        setCart(prevCart => {
            const updatedCart = prevCart.filter(item => item.productid !== productid);
            console.log('Updated cart after removal:', updatedCart);
            return updatedCart;
        });
    }
    //sharing cart data to the invoice
   

    const [categories, error_categories, loading_categories] = useFetch('api/products/category/getAllCategories');

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

    
 const invoicePrIntial = { 
    invoiceId: "",
    customer: {
        customerid: "",
        name: "",
        email: "",
        phonenumber: "",

        address: "",
        balance: "",
        message: ""
    },
    products: [
        cart
    ],
    paymentName: "",
    paymentNum: "",
    address: "",
    gstin: "",
    billNum: "",
    billDate: "",
    termDueDate: ""
}
    
    
   

//send data to the database

const addInvoiceProduct = async (invoiceProducts) => {
    try {
        const response = await myAxios.post('/api/invoices', invoiceProducts, {
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

    useEffect(() => {
        initFlowbite();
    }, [cart])

    return (
        
        <>
        
            <div className='p-2'>
                {/* <!-- drawer component for select product --> */}

                <h5 id="drawer-right-label" class="inline-flex items-center mb-4 text-base font-semibold text-gray-500 dark:text-gray-400"><svg class="w-4 h-4 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                </svg>Select Product</h5>
                <button type="button" data-drawer-hide="category-drawer" aria-controls="category-drawer" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white" >
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                    </svg>
                    <span class="sr-only">Close menu</span>
                </button>


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
                            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" class="px-6 py-3">
                                            Product name
                                        </th>

                                        <th scope="col" class="px-6 py-3">
                                            Price
                                        </th>
                                        <th>
                                            Stock
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Quantity
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Add
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {selectedCategoryProducts.map((product, index) => (
                                        <tr key={index} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {product.name}
                                            </th>
                                            <td class="px-6 py-4">
                                                {product.price}
                                            </td>
                                            <td className='px-6 py-4'>
                                                {product.quantity}

                                            </td>
                                            <td class="px-6 py-4">
                                               {product.quantity >= 1 ?  (<div>
                                                    <input type="number" name="number" id="quantity" placeholder="" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-20 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" />
                                                </div>) : ''} 
                                            </td>
                                            <td>
                                                {product.quantity>=1 ? ( <button
                                                    onClick={() => { addCart(product) }}
                                                    type="button" class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Add</button>) : (<h1 className='text-red-500'>Out of stock</h1>)}
                                               
                                            </td>

                                        </tr>
                                    ))}


                                </tbody>
                            </table>
                        </div>

                    </div>

                    <div className='w-1/2  mt-[77px] relative overflow-x-auto'>
                        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" class="px-6 py-3">
                                        Product name
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Quantity
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Total price
                                    </th>
                                    <th>

                                    </th>
                                </tr>

                            </thead>

                            <tbody>
                                {cart.map((cartItem, index) => (
                                    <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {cartItem.name}
                                        </th>
                                        <td className="px-6 py-4">
                                            {cartItem.quantity}
                                        </td>
                                        <td className="px-6 py-4">
                                            {cartItem.price}
                                        </td>
                                        <td>
                                            <button className='text-red-400' type="button" onClick={() => removeCartItem(cartItem.productid)}>
                                                <i className="bx bx-trash-alt text-xl"></i>
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
            <button  type="button" class="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Proceed</button>
            </div>

        </>
    );
}

export default SelectProducts;