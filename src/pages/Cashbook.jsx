import { useEffect, useState } from 'react';
import Dropdown from '../components/scripts/Dropdown';
import DatePicker from '../components/scripts/Datepicker';
import { Formik, Form, Field, handleChange, value } from 'formik';
import { myAxios } from '../services/Helper';
import useFetch from '../Hooks/useFetch';
import { initFlowbite } from 'flowbite'



export default function CashBook() {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedNote, setSelectedNote] = useState({});
    const { isOpen, toggleDropdown, dropdownRef } = Dropdown();
    const { date, error, handleDateChange } = DatePicker();

    useEffect(() => {

        initFlowbite();


    }, [currentPage]);


    //const [customers, setCustomers] = useState([]);
    const [filteredEntries, setfilteredEntries] = useState([]); //need to add get data
    // const [searchQuery, setSearchQuery] = useState("");
    //const [selectedCustomer,setSelectedCustomer] = useState(null);
    const [data, loading] = useFetch('/cashbook/cashbooks');

    //Pagination . .

    const entryPage = 8;
    const indexOfLastEntry = currentPage * entryPage;
    const indexOfFirstEntry = indexOfLastEntry - entryPage;
    const currentEntries = data.slice(indexOfFirstEntry, indexOfLastEntry);
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



    async function editNote(val) {
        try {
            const response = await myAxios.get('/cashbook/' + val);
            setSelectedNote(response.data);
            // console.log(selectedNote.amount);
            //alert('edit note run'+selectedNote.amount);
        } catch (error) {
            alert(error);
        }
    }

    async function updateEntry(val) {
        try {
            const response = await myAxios.put('/cashbook/update', val);
            alert('updated ' + response.status)
        } catch (error) {
            alert("something went wrong : " + error);
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


                {/* Table */}

                <div class="relative overflow-x-auto custom-scrollbar">
                    <table class="w-full text-sm text-center text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead class="">
                            <tr>
                                <th scope="col" class="px-6 py-3 font-bold bg-gray-300">
                                    Description
                                </th>
                                <th scope="col" class="px-6 py-3 font-bold bg-gray-300">
                                    Amount
                                </th>
                                <th scope="col" class="px-6 py-3 font-bold bg-gray-300">
                                    Out
                                </th>
                                <th scope="col" class="px-6 py-3 font-bold bg-gray-300">
                                    In
                                </th>
                                <th scope="col" class="px-6 py-3 font-bold bg-gray-300">
                                    Date
                                </th>
                                <th scope="col" class="px-6 py-3 font-bold bg-gray-300">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentEntries.map((e) => (
                                <tr key={e.cashbook_id} class="bg-white border-b hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {e.description}
                                    </th>
                                    <td className="px-6 py-4">
                                        {e.amount}
                                    </td>
                                    <td className="px-6 py-4 text-red-500 font-bold">
                                        {e.entry_mode === 'OUT' ? e.entry_mode : '-'}
                                    </td>
                                    <td className="px-6 py-4 text-green-500 font-bold">
                                        {e.entry_mode === 'IN' ? e.entry_mode : '-'}
                                    </td>
                                    <td className="px-6 py-4 text-gray-900 font-medium">
                                        {e.date}
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => editNote(e.cashbook_id)}
                                            data-modal-target="editEntries-modal"
                                            data-modal-toggle="editEntries-modal"
                                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                        >
                                            Edit
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>




                    {/* Modal for edit entries */}
                    <button data-modal-target="editEntries-modal"
                        data-modal-toggle="editEntries-modal"
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline">modal</button>
                    {/* Modal for edit cashbook entries */}
                    <div id="editEntries-modal" tabindex="-1" aria-hidden="true" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">

                        <div class="relative p-4 w-full max-w-2xl max-h-full bg-white">
                            <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                                    Update Entry
                                </h3>
                                <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="editEntries-modal">
                                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                    </svg>
                                    <span class="sr-only">Close modal</span>
                                </button>
                            </div>
                            {/* <!-- Modal content --> */}
                            <Formik
                                initialValues={selectedNote}
                                enableReinitialize={true}
                                onSubmit={(val) => { updateEntry(val) }}
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

                                                name="amount"
                                                type="number"
                                                id="amount"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                placeholder=""
                                                //value={selectedNote.amount}
                                                required
                                            />
                                        </div>
                                        <div className="mb-6">
                                            <label

                                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                            >
                                                Description
                                            </label>
                                            <Field

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
                                                //htmlFor="message"
                                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                            >
                                                Payment Mode
                                            </label>

                                            {/* Offline Radio Button */}
                                            <div className="flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700">
                                                <input


                                                    id="online-payment"
                                                    type="radio"
                                                    name="payment_mode"
                                                    value="offline"
                                                    onChange={handleChange} // Track changes
                                                    checked={values.payment_mode === 'offline'} // Check if selected
                                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                />
                                                <label

                                                    className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                                >
                                                    Offline
                                                </label>
                                            </div>

                                            {/* Online Radio Button */}
                                            <div className="flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700">
                                                <input

                                                    id="offline-payment"
                                                    type="radio"
                                                    name="payment_mode"
                                                    value="online"
                                                    onChange={handleChange} // Track changes
                                                    checked={values.payment_mode === 'online'} // Check if selected
                                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                />
                                                <label

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

                        </div>
                    </div>
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


                <div className="relative overflow-x-auto flex justify-center mt-2">
                    {/* Buttons */}
                    <button type="button" data-drawer-target="drawer-contact-out" data-drawer-show="drawer-contact-out" data-drawer-placement="right" aria-controls="drawer-contact-out"
                        className=" w-20 text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-800">Out</button>

                    <button type="button" data-drawer-target="drawer-contact-in" data-drawer-show="drawer-contact-in" data-drawer-placement="right" aria-controls="drawer-contact-in"
                        className=" w-20 text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800">In</button>
                </div>
            </div>

            {/* Drawer for "In" */}
            <div id="drawer-contact-in" class="fixed top-0 right-0 z-40 h-screen p-4 overflow-y-auto transition-transform translate-x-full bg-white w-80 dark:bg-gray-800" tabindex="-1" aria-labelledby="drawer-right-label">
                <h5 id="drawer-right-label" class="inline-flex items-center mb-4 text-base font-semibold text-gray-500 dark:text-gray-400"><svg class="w-4 h-4 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                </svg>Cashbook in entry</h5>
                <button type="button" data-drawer-hide="drawer-contact-in" aria-controls="drawer-contact-in" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white" >
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                    </svg>
                    <span class="sr-only">Close menu</span>
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
            <div id="drawer-contact-out" class="fixed top-0 right-0 z-40 h-screen p-4 overflow-y-auto transition-transform translate-x-full bg-white w-80 dark:bg-gray-800" tabindex="-1" aria-labelledby="drawer-right-label">
                <h5 id="drawer-right-label" class="inline-flex items-center mb-4 text-base font-semibold text-gray-500 dark:text-gray-400"><svg class="w-4 h-4 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                </svg>Cashbook out entry</h5>
                <button type="button" data-drawer-hide="drawer-contact-out" aria-controls="drawer-contact-out" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white" >
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                    </svg>
                    <span class="sr-only">Close menu</span>
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



        </>
    );
}