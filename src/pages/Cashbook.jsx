import { useEffect, useRef, useState } from 'react';
import Dropdown from '../components/scripts/Dropdown';
import DatePicker from '../components/scripts/Datepicker';
import { Formik, Form, Field, handleChange, value } from 'formik';
import { myAxios } from '../services/Helper';
import useFetch from '../components/Axios/useFetch';
import { initFlowbite } from 'flowbite'

import cashbookimage from '../assets/images/cashbook.png'



export default function CashBook() {
    const token = localStorage.getItem('token');

    const [currentPage, setCurrentPage] = useState(1);
    const [selectedNote, setSelectedNote] = useState({});
    const { isOpen, toggleDropdown, dropdownRef } = Dropdown();
    const { date, error, handleDateChange } = DatePicker();



    const [data, setData] = useState([]);

    // const getCashbooks = async () => {
    //     try {
    //         const response = await myAxios.get('/api/cashbook/cashbooks', {
    //             headers: {
    //                 Authorization: `Bearer ${token}`
    //             }
    //         })
    //         setData(response.data);
    //     } catch (error) {
    //         alert(error);
    //     }
    // }

    const dataRef = useRef(data);

    useEffect(() => {
        initFlowbite();
        fetchTotalTransactions();
        dataRef.current = data; // Update the ref whenever `data` changes
    }, [data, currentPage]);

    const getCashbooks = async () => {
        try {
            const response = await myAxios.get('/api/cashbook/cashbooks', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setData(response.data);
        } catch (error) {
            alert(error);
        }
    };

    useEffect(() => {
        getCashbooks();
    }, []);




    //const [customers, setCustomers] = useState([]);
    const [filteredEntries, setfilteredEntries] = useState([]); //need to add get data
    // const [searchQuery, setSearchQuery] = useState("");
    //const [selectedCustomer,setSelectedCustomer] = useState(null);


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
            const response = await myAxios.post('/api/cashbook/add', val, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            getCashbooks();
            fetchTotalTransactions();

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
            const response = await myAxios.get('/api/cashbook/' + val, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }


            );
            getCashbooks();
            setSelectedNote(response.data);
            // console.log(selectedNote.amount);
            //alert('edit note run'+selectedNote.amount);
        } catch (error) {
            alert(error);
        }
    }

    async function updateEntry(val) {
        try {
            const response = await myAxios.put('/api/cashbook/update', val, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            getCashbooks();
            fetchTotalTransactions();
        } catch (error) {
            alert("something went wrong : " + error);
        }
    }

    const deleteEntry = async (val) => {
        try {
            const response = await myAxios.delete('/api/cashbook/delete/' + val, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            getCashbooks();
            fetchTotalTransactions();
            if (response.status === 200) { alert('Entry deleted') }
        } catch (error) {
            alert(error);
        }
    }
    const [totalTransaction, setTotalTransactions] = useState({});
    //fetch cashbook transactional data
    const fetchTotalTransactions = async () => {
        try {
            const response = await myAxios.get('/api/cashbook/data', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setTotalTransactions(response.data);
        } catch (error) {
            alert(error);
        }
    }


    return (
        <>
            <div className='flex'>
                <div>
                    <div className="w-[900px]">
                        {/* Total Balance */}
                        <div className="p-2 w-full  text-left rtl:text-right text-gray-500 dark:text-gray-400 text-xs text-slate-500 uppercase  dark:text-slate-500 flex gap-4 font-bold">


                            <h1 className="text-xl">Total In Balance <span className="text-green-500">{totalTransaction.totalIn}</span></h1>
                            <h1 className='text-xl'>Todays Out Balance <span className="text-red-500"> {totalTransaction.totalOut}</span></h1>



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
                                    {currentEntries.length !== 0 ? (currentEntries.map((e) => (
                                        <tr key={e.cashbook_id} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {e.description}
                                            </th>
                                            <td className="px-6 py-4">
                                                {e.amount}
                                            </td>
                                            <td className="px-6 py-4 text-red-500 ">
                                                {e.entry_mode === 'OUT' ? e.entry_mode : '-'}
                                            </td>
                                            <td className="px-6 py-4 text-green-500 ">
                                                {e.entry_mode === 'IN' ? e.entry_mode : '-'}
                                            </td>
                                            <td className="px-6 py-4">
                                                {e.date}
                                            </td>
                                            <td>
                                                <button
                                                    onClick={() => editNote(e.cashbook_id)}
                                                    data-modal-target="editEntries-modal"
                                                    data-modal-toggle="editEntries-modal"
                                                    className="font-medium text-blue-400 dark:text-blue-500 hover:text-blue-200"
                                                >
                                                    Edit
                                                </button>
                                            </td>
                                        </tr>
                                    ))) : (<h1>Cashbook entries not found</h1>)}
                                </tbody>
                            </table>
                            {/* Modal for edit entries */}
                            {/* <button data-modal-target="editEntries-modal"
                        data-modal-toggle="editEntries-modal"
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline">modal</button> */}
                            {/* Cauction delete */}




                            {/* Modal for edit cashbook entries */}
                            <div id="editEntries-modal" tabindex="-1" aria-hidden="true" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">

                                <div class="relative p-4 w-full max-w-2xl max-h-full bg-white">
                                    <div class=" items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                        <div className='flex justify-between gap-4'>
                                            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                                                Update Entry
                                            </h3>
                                            <div className='text-center flex gap-4'>
                                                <button data-modal-target="popup-delete-entry"
                                                    data-modal-toggle="popup-delete-entry" className='text-red-500 hover:bg-gray-200 p-1 rounded-lg'><i class='bx bx-trash-alt text-xl' ></i></button>
                                                <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="editEntries-modal">
                                                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                                    </svg>
                                                    <span class="sr-only">Close modal</span>
                                                </button>
                                            </div>
                                        </div>


                                        <div id="popup-delete-entry" tabindex="-1" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                                            <div class="relative p-4 w-full max-w-md max-h-full">
                                                <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                                    <button type="button" class="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-delete-entry">
                                                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                                        </svg>
                                                        <span class="sr-only">Close modal</span>
                                                    </button>
                                                    <div class="p-4 md:p-5 text-center">
                                                        <svg class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                        </svg>
                                                        <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this entry?</h3>
                                                        <button
                                                            onClick={() => {
                                                                deleteEntry(selectedNote.cashbook_id)

                                                            }}
                                                            data-modal-hide="popup-delete-entry" type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                                                            Yes, I'm sure
                                                        </button>
                                                        <button data-modal-hide="popup-delete-entry" type="button" class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">No, cancel</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

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

                </div>
                {/* Flexd Content here */}
                <div className='mt-40'>
                    <img src={cashbookimage} className='h-100'>
                    </img>
                </div>

            </div>



        </>
    );
}