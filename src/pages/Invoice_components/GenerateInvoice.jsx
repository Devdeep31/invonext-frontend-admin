import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { myAxios } from '../../services/Helper';
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import 'flowbite';
import { initFlowbite } from 'flowbite'
const GenerateInvoice = () => {

    const token = localStorage.getItem('token');



    const location = useLocation();
    const [invoiceData, setInvoiceData] = useState(null);

    const getInvoiceNoFromQuery = () => {
        const params = new URLSearchParams(location.search);
        return params.get("invoiceId");
    };

    useEffect(() => {
        initFlowbite();
        const invoiceNo = getInvoiceNoFromQuery();

        const fetchInvoiceData = async () => {
            try {
                const response = await myAxios.get(`/api/invoices/invoice?invoiceId=${invoiceNo}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                //const data = await response.json();
                setInvoiceData(response.data);
            } catch (error) {
                console.error("Failed to fetch invoice:", error);
            }
        };

        fetchInvoiceData();
    }, [location.search]);

    if (!invoiceData) {
        return <div>Loading...</div>;
    }

    //cart total

   //const itemQuantity = invoiceData.totalAmount / (item.price)
   //const total = itemQuantity * 

    return (
        <>
            <div className="p-2">
                <button onClick={() => { window.print() }} className="mb-4 m-auto flex bg-blue-500 text-white py-2 px-4 rounded">
                    Print Invoice
                </button>

                <div className="invoice m-auto border p-2 w-3/4">

                    {/* Invoice Header */}
                    <h1 className="text-2xl font-bold">SALE BILL</h1>
                    <p className="text-sm">ORIGINAL RECEIPIENT</p>

                    {/* Business Info */}
                    <div className="mt-4">
                        <h2 className="font-bold"></h2>
                    </div>

                    {/* Billing and Shipping Address */}
                    <div className="mt-4">
                        <h3 className="font-bold">BILLING AND SHIPPING ADDRESS</h3>
                        <p>{invoiceData.name}</p>
                        <p>{invoiceData.address}</p>
                        <p>Phone: {invoiceData.phonenumber}</p>
                    </div>

                    {/* Invoice Info */}
                    <div className="mt-4">
                        <p>Invoice No.: {invoiceData.invoiceId}</p>
                        <p>Invoice Date: {invoiceData.billdate}</p>
                        <p>Due Date: {invoiceData.termDueDate}</p>
                    </div>

                    {/* Table */}
                    <table className="table-auto w-full mt-4 border-collapse border border-gray-400">
                        <thead>
                            <tr>
                                <th className="border border-gray-300 px-4 py-2">S.NO</th>
                                <th className="border border-gray-300 px-4 py-2">ITEMS</th>
                                <th className="border border-gray-300 px-4 py-2">QTY</th>
                                <th className="border border-gray-300 px-4 py-2">RATE/UNIT</th>
                                <th className="border border-gray-300 px-4 py-2">AMOUNT</th>
                            </tr>
                        </thead>
                        <tbody>
                            {invoiceData.products.map((item, index) => (
                                <tr key={index}>
                                    <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                                    <td className="border border-gray-300 px-4 py-2">{item.name}</td>
                                    <td className="border border-gray-300 px-4 py-2">{invoiceData.totalAmount / (item.price)}</td>
                                    <td className="border border-gray-300 px-4 py-2">₹{item.price}</td>
                                    <td className="border border-gray-300 px-4 py-2">₹</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Total Amount */}
                    <div className="mt-4">
                        <h3 className="font-bold">TOTAL: ₹{invoiceData.totalAmount}</h3>
                        <p>Total amount (in words): {invoiceData.totalAmountInWord}</p>
                    </div>

                    {/* Footer */}
                    <div className="mt-4">
                        <p>Authorised signature</p>
                    </div>
                </div>
            </div>
        </>
    )
}
export default GenerateInvoice;