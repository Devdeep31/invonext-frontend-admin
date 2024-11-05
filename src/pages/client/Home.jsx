import { useEffect, useState } from 'react';

import { initFlowbite } from 'flowbite';
import { myAxios } from '../../services/Helper';
import useFetch from '../../Hooks/useFetch';

const ShopHome = () => {

    const token = localStorage.getItem('token');
    const uid = localStorage.getItem('useremail');
    //console.log("<<<<"+uid);


    const [products, error, loading] = useFetch('api/products/products');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    // Calculate the number of pages needed
    const totalPages = Math.ceil(products.length / itemsPerPage);

    // Calculate the range of products to show based on the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const selectedProducts = products.slice(startIndex, startIndex + itemsPerPage);

    const goToPage = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    //route for add to cart


    const addToCart = async (product) => {
        try {
            const response = await myAxios.post('/api/carts', product);
            if (response.status === 201) {
                alert('added to the cart')
            }
        } catch (error) {
            alert(error);
        }
    }

    //////////////////////////////////////////////////////////////////////////////////////////
    const [cart, setCart] = useState([]);

    const [processCart, setProcessCart] = useState([]);

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

    const addProcessCart = (product) => {
        // Find if product already exists in cart
        const existingItemIndex = processCart.findIndex((item) => item.productid === product.productid);

        if (existingItemIndex >= 0) {
            // If product exists, update its cartQuantity
            const updatedCart = [...processCart];
            updatedCart[existingItemIndex].cartQuantity += parseInt(cartQuantity, 10); // Add new quantity to existing cartQuantity
            setProcessCart(updatedCart);
        } else {
            // Add product with initial cartQuantity
            const productWithCartQuantity = { ...product, cartQuantity: parseInt(cartQuantity, 10) };
            setProcessCart([...processCart, productWithCartQuantity]);
        }

        console.log("Cart after adding product:", cart);
        setCartquantity(''); // Reset input quantity
    };

    console.log('//////' + processCart.length);


    //Add process cart


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

    useEffect(() => {
        initFlowbite();
    }, []);

    return (
        <>
            {/* Top Drawer Button */}
            <div className="fixed bottom-0 right-0 mb-4 mr-4">
                <button
                    className="overflow-y-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    type="button"
                    data-drawer-target="drawer-top-example"
                    data-drawer-show="drawer-top-example"
                    data-drawer-placement="top"
                    aria-controls="drawer-top-example"
                >
                    Filter
                </button>
            </div>

            {/* Drawer Component */}
            <div id="drawer-top-example" className="fixed top-0 left-0 right-0 z-40 w-full p-4 transition-transform -translate-y-full bg-white dark:bg-gray-800" tabIndex="-1" aria-labelledby="drawer-top-label">
                <h5 id="drawer-top-label" className="inline-flex items-center mb-4 text-base font-semibold text-gray-500 dark:text-gray-400">
                    <svg className="w-4 h-4 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                    </svg>Top drawer
                </h5>
                <button type="button" data-drawer-hide="drawer-top-example" aria-controls="drawer-top-example" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white">
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                    </svg>
                    <span className="sr-only">Close menu</span>
                </button>
               {/* Main content */}
            </div>

            <div>
                {/* Hero Section */}
                <div className="h-[400px] w-auto bg-gradient-to-r from-cyan-500 to-blue-500 flex justify-center items-center">
                    <div className="text-white text-6xl">
                        <h1>Up to 50% Off</h1>
                        On all products
                    </div>
                </div>

                {/* Products Section */}
                <div className="container mx-auto p-6">
                    {loading && <p>Loading products...</p>}
                    {error && <p>Error loading products: {error}</p>}
                    <div className="flex flex-wrap -mx-4">
                        {!loading && !error && selectedProducts.map((product, index) => (
                            <div key={index} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
                                <div className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                    <a href="#">
                                        <img className="p-8 h-80 rounded-t-lg" src={product.image} alt="product image" />
                                    </a>
                                    <div className="px-5 pb-5">
                                        <a href="#">
                                            <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                                                {product.name}
                                            </h5>
                                        </a>
                                        <div className="flex items-center mt-2.5 mb-5">
                                            {[...Array(4)].map((_, index) => (
                                                <svg key={index} className="w-4 h-4 text-yellow-300" aria-hidden="true" fill="currentColor" viewBox="0 0 22 20">
                                                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                                </svg>
                                            ))}
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-3xl font-bold text-gray-900 dark:text-white">{product.price}</span>
                                            <button
                                                onClick={() => {
                                                    // Include `userid` on the product object
                                                    const productWithUserId = { ...product, userid: uid };

                                                    setCart([...cart, productWithUserId]);

                                                  
                                                    addToCart(productWithUserId);
                                                }}
                                                className="text-white bg-gray-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                            >
                                                Add to cart
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination Controls */}
                    <div className="flex justify-center mt-6">
                        <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1} className="px-4 py-2 mx-1 bg-gray-300 text-gray-700 rounded-md disabled:bg-gray-200">Previous</button>
                        {[...Array(totalPages)].map((_, index) => (
                            <button key={index} onClick={() => goToPage(index + 1)} className={`px-4 py-2 mx-1 ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'} rounded-md`}>{index + 1}</button>
                        ))}
                        <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages} className="px-4 py-2 mx-1 bg-gray-300 text-gray-700 rounded-md disabled:bg-gray-200">Next</button>
                    </div>
                </div>
            </div>

            {/* Cart Modal */}



            {/* <!-- Modal toggle --> */}


            {/* <!-- Main modal --> */}
            <div id="static-cart-modal" data-modal-backdrop="static" tabindex="-1" aria-hidden="true" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-full">
                <div class="relative p-4 w-[900px] h-[700px]">
                    {/* <!-- Modal content --> */}
                    <div class="relative bg-white rounded-lg shadow dark:bg-gray-700 h-full">
                        {/* <!-- Modal header --> */}
                        <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">

                            <div class="text-black  dark:text-white text-xl text-center">
                                <h1>Your shopping cart is ready for you.</h1>
                            </div>
                            <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="static-cart-modal">
                                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span class="sr-only">Close modal</span>
                            </button>
                        </div>
                        {/* <!-- Modal body --> */}
                        <div class="p-4 md:p-5 space-y-4 overflow-y-auto h-[calc(100%-4rem)]">

                            {/* <!-- Content goes here --> */}
                            <ul class="w-full divide-y divide-gray-200 dark:divide-gray-700 gap-2">
                                <li class="pb-3 sm:pb-4">
                                    {cart.map((product, index) => (<>

                                        <div class="flex items-center space-x-4 rtl:space-x-reverse gap-2 p-2">
                                            <div class="flex-shrink-0">
                                                <img class="w-12 h-12 rounded-full" src={product.image} alt={product.name} />
                                            </div>
                                            <div class="flex-1 min-w-0">
                                                <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                    {product.name}
                                                </p>
                                                <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                                                    email@flowbite.com
                                                </p>
                                            </div>
                                            <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                                {product.price}
                                            </div>
                                            <div className='p-4 text-sm text-gray-500 truncate dark:text-gray-400 px-4'>
                                                <input
                                                    type="number"
                                                    value={cartQuantity}
                                                    onChange={handleInputChange}
                                                    min="1"
                                                    placeholder=""
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-20 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                                                />

                                            </div>

                                            {product.quantity >= 1 ? (
                                                <button
                                                    onClick={() => {

                                                        addProcessCart(product)
                                                    }}
                                                    type="button"
                                                    className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                                                >
                                                    Add
                                                </button>
                                            ) : (
                                                <h1 className="text-red-500">Out of stock</h1>
                                            )}
                                            <div onClick={() => { removeCartItem(product.productid) }} className='text-red-500'>
                                                <i class='bx bx-trash-alt text-xl' ></i>
                                            </div>
                                        </div>

                                    </>
                                    ))}

                                </li>
                            </ul>
                            <div class="mt-6 m-auto">
                                {/* <!-- Uncomment and add items here --> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <div>

                </div>
            </div>







        </>
    );
};

export default ShopHome;
