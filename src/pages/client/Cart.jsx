import { useEffect, useState, useRef } from "react";
import { initFlowbite } from 'flowbite'
import { myAxios } from "../../services/Helper";
import useFetch from "../../Hooks/useFetch";
//TODO -- there is bug in cart product quantity is not getting in product array -*
const Cart = () => {
    const userid = localStorage.getItem('useremail');
    const token = localStorage.getItem('token');
    const [quantity, setQuantity] = useState('');
    //console.log(quantity);
    const [cart, setCart] = useState([]);
    //const [custDetails, setCustDetails] = useState({});
    const [paymentMode, setPaymentMode] = useState('');

    const [cartData, setCartData] = useState([]);
    console.log("cartData " + cartData.length);

    // {
    //     "productid": "string",
    //     "name": "string",
    //     "price": "string",
    //     "quantity": "string",
    //     "image": "string",
    //     "description": "string",
    //     "cartQuantity": "string",
    //     "category": "string"
    //   }
    const filterCartData = () => {
        const transformedCartData = cart.map((product) => ({
            productid: product.productid,
            name: product.name,
            price: product.price,
            cartQuantity: product.cartQuantity, // Quantity should come from cart item
            image: product.image,
            description: product.description,
            category: product.category
        }));

        setCartData(transformedCartData);
    };
    console.log("filteredCart" , cartData);



    const fetchCart = async () => {
        try {
            const response = await myAxios.get('/api/carts/' + userid);
            setCart(response.data);
        } catch (error) {
            alert(error);
        }
    }

    const deleteCart = async (cartid) => {
        try {
            const id = parseInt(cartid, 10);
            const response = await myAxios.delete(`/api/carts/${id}`);
            fetchCart();
        } catch (error) {
            alert(error);
        }
    }
    const cartIntialState = {


        userid: "",
        name: "",
        price: "",
        quantity: "",
        image: "",
        description: "",
        cartQuantity: quantity,
        category: ""

    }
    const updateQuantity = async (cartid) => {
        try {
            const id = parseInt(cartid, 10);
            const response = await myAxios.put(`/api/carts/${id}`, cartIntialState);
            fetchCart();
            alert('done');
        } catch (error) {
            alert('error');
        }
    }

    // const customerDetails = async () => {
    //     try {
    //         const response = await myAxios.get();
    //         setCustDetails(response.data);
    //     } catch (error) {
    //         alert(error);
    //     }
    // }

    const [custDetails, error, loading] = useFetch('/api/customer/byemail/' + userid);

    const [invoiceID, setInvoiceID] = useState('');
    console.log('invoice id ' + invoiceID);

    const generateInvoiceId = () => {
        const invoiceid = "INXT" + Math.floor((Math.random() * 100000000) + 1);
        setInvoiceID(invoiceid);
    };

    const invoiceCustomer = async () => {
        try {
            const invoiceData = {
                invoiceId: invoiceID,
                customer: {
                    customerid: custDetails.customerid,
                    name: custDetails.name,
                    email: custDetails.email,
                    phonenumber: custDetails.phonenumber,
                    address: custDetails.address,
                    balance: "",
                    message: ""
                },
                products: cartData,
                paymentName: custDetails.name,
                email: userid,
                paymentNum: custDetails.phonenumber,
                address: custDetails.address,
                gstin: "",
                billNum: "",
                billDate: "",
                termDueDate: "",
                billMode: "online",
                paymentMode: paymentMode
            };

            const response = await myAxios.post('/api/invoices', invoiceData);
            if (response.status === 201) {
                alert('Invoice created successfully!');
                console.log('Invoice Data to be sent: ', invoiceData); // Log the invoice data
            }
        } catch (error) {
            alert('Error creating invoice: ' + error);
        }
    };

    const placeOrder = async () => {
        if (loading || !custDetails) {
            alert("Customer details are not loaded yet.");
            return;
        }
        generateInvoiceId();
        filterCartData();
    };
    

    const dataRef = useRef(cart);


    useEffect(() => {
        fetchCart();
    }, []);

    useEffect(() => {
        dataRef.current = (cart);
        initFlowbite();
        
    }, [custDetails, cart,cartData]);

    useEffect(() => {
        if (cartData.length > 0 && invoiceID) {
            invoiceCustomer(); // Only call this when cartData is populated
        }
    }, [cartData, invoiceID]);


    return (
        <>  <div className="p-2">
            <div className="text-black mt-20 dark:text-white text-xl text-center">
                <h1>Your shopping cart is ready for you.</h1>
            </div>

            <div className="mt-6 w-2/4 m-auto border ">
                <ul class="w-full divide-y divide-gray-200 dark:divide-gray-700 gap-2 ">
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
                                       
                                    </p>
                                </div>
                                <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                    {product.price}
                                </div>
                                <div className='p-4 text-sm text-gray-500 truncate dark:text-gray-400 px-4'>
                                    <input
                                        type="number"
                                        onChange={(e) => { setQuantity(e.target.value) }}
                                        min="1"
                                        placeholder=""
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-20 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                                    />

                                </div>

                                {product.quantity >= 1 ? (
                                    <button
                                        onClick={() => {
                                            updateQuantity(product.id)

                                        }}
                                        type="button"
                                        className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                                    >
                                        Add
                                    </button>
                                ) : (
                                    <h1 className="text-red-500">Out of stock</h1>
                                )}
                                <div className='text-red-500'>
                                    <i onClick={() => { deleteCart(product.id) }} class='bx bx-trash-alt text-xl' ></i>
                                </div>

                            </div>

                        </>
                        ))}

                    </li>
                </ul>
            </div>

            <div className="fixed bottom-0 right-0 mb-4 mr-4 p-8">
                {cart.length !== 0 ? (<button

                    type="button"
                    data-modal-target="checkout-modal" data-modal-toggle="checkout-modal"
                    className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                >
                    Place order
                </button>) : (<></>)}

            </div>




        </div>


            {/* Modal for checkOut */}


            {/* <!-- Modal toggle --> */}

            {/* <!-- Main modal --> */}
            <div id="checkout-modal" data-modal-backdrop="static" tabindex="-1" aria-hidden="true" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                <div class="relative p-4 w-full max-w-2xl max-h-full">
                    {/* <!-- Modal content --> */}
                    <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        {/* <!-- Modal header --> */}
                        <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                                Check out
                            </h3>
                            <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="checkout-modal">
                                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span class="sr-only">Close modal</span>
                            </button>
                        </div>
                        {/* <!-- Modal body --> */}
                        <div class="p-4 md:p-5 space-y-4">
                            <div>
                                <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                    Delivery address : <br />
                                    {custDetails.name} <br />
                                    {custDetails.address} <br />
                                    {custDetails.phonenumber}
                                </p>
                            </div>
                            <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                Select payment mode
                            </p>
                            <div>
                                <div className="flex items-center mb-4">
                                    <input
                                        onClick={() => { setPaymentMode('offline') }}
                                        id="default-radio-1"
                                        type="radio"
                                        name="payment-radio"
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                        checked={paymentMode === 'offline'}
                                    />
                                    <label htmlFor="default-radio-1" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                        Pay on delivery
                                    </label>
                                </div>

                                <div className="flex items-center">
                                    <input
                                        onClick={() => { setPaymentMode('online') }}
                                        id="default-radio-2"
                                        type="radio"
                                        name="payment-radio"
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                        checked={paymentMode === 'online'}
                                    />
                                    <label htmlFor="default-radio-2" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                        Pay Online
                                    </label>
                                </div>
                            </div>

                            {paymentMode === 'online' ? (
                                <div>
                                    <img src="https://s.yimg.com/fz/api/res/1.2/92_perTOaGUX5LTuQjRZIw--~C/YXBwaWQ9c3JjaGRkO2ZpPWZpdDtoPTI2MDtxPTgwO3c9MjYw/https://s.yimg.com/zb/imgv1/fdf01399-282a-35f4-9488-09b69236ff0f/t_500x300" className="h-20"></img>
                                </div>
                            ) : (<></>)}

                        </div>
                        {/* <!-- Modal footer --> */}
                        <div class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                            <button
                                onClick={placeOrder}
                                type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Place order</button>

                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}
export default Cart;