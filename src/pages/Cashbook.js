import { useEffect,useState } from 'react';
import Dropdown from '../components/scripts/Dropdown';
import DatePicker from '../components/scripts/Datepicker';
import { Formik, Form, Field, handleChange, value } from 'formik';
import { myAxios } from '../services/Helper';
import useFetch from '../Hooks/useFetch';


export default function CashBook() {

    const { isOpen, toggleDropdown, dropdownRef } = Dropdown();
    const { date, error, handleDateChange } = DatePicker();

    useEffect(() => {
        // Get buttons and drawers
        const drawerButtonIn = document.querySelector("[data-drawer-show='drawer-contact-in']");
        const drawerButtonOut = document.querySelector("[data-drawer-show='drawer-contact-out']");
        const drawerIn = document.getElementById('drawer-contact-in');
        const drawerOut = document.getElementById('drawer-contact-out');
        const closeButtonIn = document.querySelector("[data-drawer-hide='drawer-contact-in']");
        const closeButtonOut = document.querySelector("[data-drawer-hide='drawer-contact-out']");

        // Functions to show/hide the drawers
        const showDrawerIn = () => {
            drawerIn.style.transform = 'translateX(0)';
        };
        const hideDrawerIn = () => {
            drawerIn.style.transform = 'translateX(100%)';
        };

        const showDrawerOut = () => {
            drawerOut.style.transform = 'translateX(0)';
        };
        const hideDrawerOut = () => {
            drawerOut.style.transform = 'translateX(100%)';
        };

        // Add event listeners to buttons
        drawerButtonIn.addEventListener('click', showDrawerIn);
        drawerButtonOut.addEventListener('click', showDrawerOut);
        closeButtonIn.addEventListener('click', hideDrawerIn);
        closeButtonOut.addEventListener('click', hideDrawerOut);

        // Cleanup function to remove listeners when component unmounts
        return () => {
            drawerButtonIn.removeEventListener('click', showDrawerIn);
            drawerButtonOut.removeEventListener('click', showDrawerOut);
            closeButtonIn.removeEventListener('click', hideDrawerIn);
            closeButtonOut.removeEventListener('click', hideDrawerOut);
        };
    }, []);


    //const [customers, setCustomers] = useState([]);
    const [filteredEntries, setfilteredEntries] = useState([]); //need to add get data
   // const [searchQuery, setSearchQuery] = useState("");
    //const [selectedCustomer,setSelectedCustomer] = useState(null);
    const [data, loading] = useFetch('/cashbook/cashbooks');
    
    //Pagination . .
    const [currentPage, setCurrentPage] = useState(1);
    const entryPage = 5;
    const indexOfLastEntry = currentPage * entryPage;
    const indexOfFirstEntry = indexOfLastEntry - entryPage;
    const currentEntries = filteredEntries.slice(indexOfFirstEntry, indexOfLastEntry);
    const totalPages = Math.ceil(filteredEntries.length / entryPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    //////////////////////////////////////////////////////////////////////////////////////////

    
    //console.log(data);

    //add Entry to the cashbook
    /*
    '/cashbook/add'
    {
  "Cashbook ID": "",
  "name": "string",
  "amount": "string",
  "description": "string",
  "payment_mode": "string",
  "date": "01/01/2024",
  "entry_mode": "string"
}
    */

    const initialState_IN = {
        amount: '',
        description: '',
        payment_mode: 'offline', // Default value
        date: '',
        entry_mode: 'IN',
    };
    const initialState_OUT = {
        amount: '',
        description: '',
        payment_mode: 'offline', // Default value
        date: '',
        entry_mode: 'OUT',
    };


    async function addNote(val) {
        try {
            const response = await myAxios.post('/cashbook/add', val);
            if (response.status === 201) {
                alert("done");
                console.log("Done");
            }
        } catch (error) {
            console.log(error);
            alert(error);
        }
    }


    return (
        <>
            <div className="w-[700px]">
                {/* Total Balance */}
                <div className="p-2 w-full  text-left rtl:text-right text-gray-500 dark:text-gray-400 text-xs text-slate-500 uppercase  dark:text-slate-500 flex gap-4 font-bold">


                    <h1 className="text-xl">Total Balance <span className="text-green-500">₹100,000.00</span></h1>
                    <h1 className='text-xl'>Todays Balance <span className="text-green-500"> ₹10,000.00</span></h1>



                </div>

                {/* Date Bar */}
                <div className="justify-between flex p-2">
                    <div className="relative max-w-sm">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                            <svg
                                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                            </svg>
                        </div>
                        <input
                            type="date" // Use 'date' input type for native date picker
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Select date"
                            value={date}
                            onChange={handleDateChange}
                        />
                        {error && <p className="text-red-600 mt-2">{error}</p>}
                    </div>

                    {/* Drop Down */}

                    {/* Dropdown menu */}
                    <div className="relative inline-block">
                        {/* Button to trigger dropdown */}
                        <button
                            onClick={toggleDropdown}
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            Payment mode
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
                                    <li><a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Online</a></li>
                                    <li><a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Offline</a></li>


                                </ul>
                            </div>
                        )}
                    </div>

                </div>







                {/* <div id="dropdown" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                    <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                        <li>
                            <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Online</a>
                        </li>
                        <li>
                            <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Offline</a>
                        </li>

                    </ul>
                </div> */}

                {/* Table */}







                <div class="relative overflow-x-auto custom-scrollbar">
                    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">

                            <tr>
                                <th scope="col" class="px-6 py-3">
                                    Description
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Amount
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Out
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    In
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Date
                                </th>

                            </tr>
                        </thead>
                        <tbody>
                            {data.map((e) => (
                                <>
                                    {/* {console.log(e.amount)} */}


                                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {/* name */}
                                            {e.description}
                                        </th>
                                        <th className='px-6 py-4'>
                                            {e.amount}
                                        </th>
                                        <td class="px-6 py-4 text-red-500 font-bold">
                                            {/* Out */}
                                            {e.entry_mode === 'OUT'
                                                ? e.entry_mode : '-'}

                                        </td>
                                        <td class="px-6 py-4 text-green-500 font-bold">
                                            {/* In */}
                                            {e.entry_mode === 'IN'
                                                ? e.entry_mode : '-'}

                                        </td>
                                        <td className='px-6 py-4 text-gray-900 font-medium'>
                                            {e.date}
                                        </td>

                                    </tr>
                                </>
                            ))}
                        </tbody>
                    </table>

                </div>

                 {/* Pagination Controls */}
          <div className="flex justify-center mt-4">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="text-sm px-2 py-2 mx-1 bg-gray-300 rounded hover:bg-gray-400"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => paginate(index + 1)}
                className={`text-sm px-4 py-2 mx-1 ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-2 py-1 mx-1 text-sm bg-gray-300 rounded hover:bg-gray-400"
            >
              Next
            </button>
          </div>
        

                <div className="relative overflow-x-auto">
                    {/* Buttons */}
                    <div className="flex gap-4 w-[700px] justify-center mt-4">
                        <button type="button" data-drawer-show="drawer-contact-out"
                            aria-controls="drawer-contact-out" className="w-20 text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">Out</button>

                        <button type="button" data-drawer-show="drawer-contact-in"
                            aria-controls="drawer-contact-in" className=" w-20 text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800">In</button>
                    </div>

                    {/* Drawer for "In" */}
                    <div id="drawer-contact-in"
                        className="fixed top-0 right-0 z-40 h-screen p-4 overflow-y-auto transition-transform translate-x-full bg-white w-80 dark:bg-gray-800"
                        tabIndex="-1" aria-labelledby="drawer-contact-label-in">
                        <h5 id="drawer-contact-label-in"
                            className="inline-flex items-center mb-6 text-base font-semibold text-gray-500 uppercase dark:text-gray-400">
                            Add In Entry
                        </h5>
                        <button type="button" data-drawer-hide="drawer-contact-in"
                            aria-controls="drawer-contact-in" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 right-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white">
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span className="sr-only">Close menu</span>
                        </button>
                        {/* Form for "In" Drawer */}
                        <Formik
                            initialValues={initialState_IN}
                            onSubmit={(val) => { addNote(val) }}
                        >

                            {({ handleChange, values }) => (

                                <Form>
                                    {/* Form elements here */}
                                    <div className="mb-6">
                                        <label
                                            htmlFor="subject"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            Amount
                                        </label>
                                        <Field
                                            for="amount"
                                            name="amount"
                                            type="number"
                                            id="subject"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder=""
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
                                            for="description"
                                            name="description"
                                            id="message"
                                            rows="4"
                                            as="textarea"
                                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="Your message..."
                                        />
                                    </div>

                                    <div class="mb-4">
                                        <label
                                            htmlFor="message"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            Payment Mode
                                        </label>

                                        {/* Offline Radio Button */}
                                        <div className="flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700">
                                            <input
                                                for="payment_mode"

                                                id="online-payment"
                                                type="radio"
                                                name="payment_mode"
                                                value="offline"
                                                onChange={handleChange} // Track changes
                                                checked={values.payment_mode === 'offline'} // Check if selected
                                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                            />
                                            <label
                                                htmlFor="online-payment"
                                                className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                            >
                                                Offline
                                            </label>
                                        </div>

                                        {/* Online Radio Button */}
                                        <div className="flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700">
                                            <input
                                                for="payment_mode"
                                                id="offline-payment"
                                                type="radio"
                                                name="payment_mode"
                                                value="online"
                                                onChange={handleChange} // Track changes
                                                checked={values.payment_mode === 'online'} // Check if selected
                                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                            />
                                            <label
                                                htmlFor="offline-payment"
                                                className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                            >
                                                Online
                                            </label>
                                        </div>

                                    </div>

                                    {/* DATE */}
                                    <div className="relative max-w-sm">
                                        <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                            <svg
                                                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                                            </svg>
                                        </div>
                                        <Field
                                            for="date"
                                            name="date"
                                            type="date" // Use 'date' input type for native date picker
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="Select date"
                                            value={date}

                                            onChange={handleDateChange}
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

                    {/* Drawer for "Out" */}
                    <div id="drawer-contact-out"
                        className="fixed top-0 right-0 z-40 h-screen p-4 overflow-y-auto transition-transform translate-x-full bg-white w-80 dark:bg-gray-800"
                        tabIndex="-1" aria-labelledby="drawer-contact-label-out">
                        <h5 id="drawer-contact-label-out"
                            className="inline-flex items-center mb-6 text-base font-semibold text-gray-500 uppercase dark:text-gray-400">
                            Add Out Entry
                        </h5>
                        <button type="button" data-drawer-hide="drawer-contact-out"
                            aria-controls="drawer-contact-out" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 right-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white">
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span className="sr-only">Close menu</span>
                        </button>
                        {/* Form for "Out" Drawer */}
                        <Formik
                            initialValues={initialState_OUT}
                            onSubmit={(val) => { addNote(val, 'OUT') }}
                        >
                            {({ handleChange, values }) => (

                                <Form>
                                    {/* Form elements here */}
                                    <div className="mb-6">
                                        <label
                                            htmlFor="subject"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            Amount
                                        </label>
                                        <Field
                                            for="amount"
                                            name="amount"
                                            type="number"
                                            id="subject"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder=""
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
                                            for="description"
                                            name="description"
                                            id="message"
                                            rows="4"
                                            as="textarea"
                                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="Your message..."
                                        />
                                    </div>

                                    <div class="mb-4">
                                        <label
                                            htmlFor="message"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            Payment Mode
                                        </label>

                                        {/* Offline Radio Button */}
                                        <div className="flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700">
                                            <input
                                                for="payment_mode"

                                                id="online-payment"
                                                type="radio"
                                                name="payment_mode"
                                                value="offline"
                                                onChange={handleChange} // Track changes
                                                checked={values.payment_mode === 'offline'} // Check if selected
                                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                            />
                                            <label
                                                htmlFor="online-payment"
                                                className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                            >
                                                Offline
                                            </label>
                                        </div>

                                        {/* Online Radio Button */}
                                        <div className="flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700">
                                            <input
                                                for="payment_mode"
                                                id="offline-payment"
                                                type="radio"
                                                name="payment_mode"
                                                value="online"
                                                onChange={handleChange} // Track changes
                                                checked={values.payment_mode === 'online'} // Check if selected
                                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                            />
                                            <label
                                                htmlFor="offline-payment"
                                                className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                            >
                                                Online
                                            </label>
                                        </div>

                                    </div>


                                    <div className="relative max-w-sm">
                                        <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                            <svg
                                                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                                            </svg>
                                        </div>
                                        <Field
                                            for="date"
                                            name="date"
                                            type="date" // Use 'date' input type for native date picker
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="Select date"
                                            value={date}
                                            onChange={handleDateChange}
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
            </div>


        </>
    );
}