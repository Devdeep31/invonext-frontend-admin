import { useState } from "react";
import ShopHome from "./Home";
import Cart from "./Cart";

const CartData = () => {
    const [cart, setCart] = useState([]);

    const addToCart = (product) => {
        setCart([...cart, product]);
    };

    return (
       <></>
    );
};

export default CartData;
