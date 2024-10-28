// useCart.js
import { useState, createContext, useContext, } from 'react';

function useCart() {
    const [cart, setCart] = useState([]);

    // Function to add an item to the cart
    const addItem = (item) => {
        setCart((prevCart) => [...prevCart, item]);
    };

    // Function to retrieve the cart data
    const getCart = () => {
        return cart;
    };

    return { addItem, getCart };
}

export default useCart;
