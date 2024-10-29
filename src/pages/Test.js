import React, { useState } from 'react';

const productList = [
    { id: 1, name: "Product A", price: 50 },
    { id: 2, name: "Product B", price: 30 },
    { id: 3, name: "Product C", price: 20 },
];

const InvoiceGenerator = () => {
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

    return (
        <div>
            <h2>Invoice Generator</h2>
            <div>
                <select onChange={(e) => {
                    const product = productList.find(p => p.id === parseInt(e.target.value));
                    setSelectedProduct(product);
                }}>
                    <option value="">Select Product</option>
                    {productList.map(product => (
                        <option key={product.id} value={product.id}>{product.name} - ${product.price}</option>
                    ))}
                </select>

                <input
                    type="number"
                    value={quantity}
                    min="1"
                    onChange={(e) => setQuantity(e.target.value)}
                />
                <button onClick={handleAddProduct}>Add to Invoice</button>
            </div>

            <div>
                <h3>Invoice Items</h3>
                <ul>
                    {invoiceItems.map(item => (
                        <li key={item.id}>
                            {item.name} - Quantity: {item.quantity} - Price: ${item.price} - Subtotal: ${item.quantity * item.price}
                        </li>
                    ))}
                </ul>
                <h3>Total: ${calculateTotal()}</h3>
            </div>
        </div>
    );
};

export default InvoiceGenerator;
