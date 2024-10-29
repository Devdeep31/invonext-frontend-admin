import React from "react";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import 'flowbite';
import { initFlowbite } from 'flowbite'

const GenerateReport = () => {
  // Ref for the printable component
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const invoiceData = {
    businessName: "My Business",
    customerName: "Deep",
    address: "Lonawla, Bihar 123456",
    phone: "9637272108",
    invoiceNo: "1",
    invoiceDate: "21 Oct 2024",
    dueDate: "21 Oct 2024",
    items: [
      {
        name: "Milk",
        qty: 1,
        rate: 25,
        amount: 25,
      },
    ],
    totalAmount: 25,
    totalAmountInWords: "Twenty Five rupees",
  };

  return (
    <div className="p-4">
      <button onClick={handlePrint} className="mb-4 bg-blue-500 text-white py-2 px-4 rounded">
        Print Invoice
      </button>

      <div ref={componentRef} className="invoice border p-4 w-1/2">
        {/* Invoice Header */}
        <h1 className="text-2xl font-bold">SALE BILL</h1>
        <p className="text-sm">ORIGINAL RECEIPIENT</p>

        {/* Business Info */}
        <div className="mt-4">
          <h2 className="font-bold">{invoiceData.businessName}</h2>
        </div>

        {/* Billing and Shipping Address */}
        <div className="mt-4">
          <h3 className="font-bold">BILLING AND SHIPPING ADDRESS</h3>
          <p>{invoiceData.customerName}</p>
          <p>{invoiceData.address}</p>
          <p>Phone: {invoiceData.phone}</p>
        </div>

        {/* Invoice Info */}
        <div className="mt-4">
          <p>Invoice No.: {invoiceData.invoiceNo}</p>
          <p>Invoice Date: {invoiceData.invoiceDate}</p>
          <p>Due Date: {invoiceData.dueDate}</p>
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
            {invoiceData.items.map((item, index) => (
              <tr key={index}>
                <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                <td className="border border-gray-300 px-4 py-2">{item.name}</td>
                <td className="border border-gray-300 px-4 py-2">{item.qty}</td>
                <td className="border border-gray-300 px-4 py-2">₹{item.rate}</td>
                <td className="border border-gray-300 px-4 py-2">₹{item.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Total Amount */}
        <div className="mt-4">
          <h3 className="font-bold">TOTAL: ₹{invoiceData.totalAmount}</h3>
          <p>Total amount (in words): {invoiceData.totalAmountInWords}</p>
        </div>

        {/* Footer */}
        <div className="mt-4">
          <p>Authorised signature</p>
        </div>
      </div>
    </div>
  );
};

export default GenerateReport;
