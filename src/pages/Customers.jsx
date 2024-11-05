import { Formik, Form, Field } from 'formik';
import { useEffect, useRef, useState } from 'react';
import { myAxios } from '../services/Helper';
import useFetch from '../Hooks/useFetch';
import { initFlowbite } from 'flowbite';

const Customers = () => {
  const token = localStorage.getItem("token");
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // CRUD hooks
  const [selectedCustomer, setSelectedCustomer] = useState({});

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const customersPerPage = 10;
  const indexOfLastCustomer = currentPage * customersPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
  const currentCustomers = filteredCustomers.slice(indexOfFirstCustomer, indexOfLastCustomer);
  const totalPages = Math.ceil(filteredCustomers.length / customersPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const initialState = {

    name: "",
    email: "",
    phonenumber: "",
    address: "",
    balance: "",
    message: ""
  };

  const updateCustIntialState = {
    customerid: selectedCustomer.customerid || "",
    name: selectedCustomer.name || "",
    email: selectedCustomer.email || "",
    phonenumber: selectedCustomer.phonenumber || "",
    address: selectedCustomer.address || "",
    balance: selectedCustomer.balance || "",
    message: selectedCustomer.message || ""
  }

  // Fetch customers from API
  const fetchCustomers = async () => {
    try {
      const response = await myAxios('api/customer/customers', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setCustomers(response.data);
      setFilteredCustomers(response.data);
    } catch (error) {
      alert(error);
    }
  };

  const dataRef = useRef(customers);

  useEffect(() => {
    initFlowbite();
    dataRef.current = customers; // Update the ref whenever `data` changes
  }, [filteredCustomers, currentPage]);

  // Fetch customers when component mounts
  useEffect(() => {
    
    fetchCustomers();
  }, []); // No dependencies required here

  // Save a customer

  const saveCustomer = async (val) => {
    try {
      await myAxios.post('/api/customer/add', val, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      alert("Customer saved");
      fetchCustomers(); // Re-fetch customers after saving
    } catch (error) {
      alert("Something went wrong " + error);
    }
  };

  // Update a customer
  const updateCustomer = async (val) => {
    try {
      const response = await myAxios.put('/api/customer/update', val, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      alert('Customer updated ' + response.status);
      fetchCustomers(); // Re-fetch customers after updating
    } catch (error) {
      alert('Something went wrong ' + error);
    }
  };

  // Get a customer by ID
  const getCustomer = async (val) => {
    try {
      const response = await myAxios.get('api/customer/' + val, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setSelectedCustomer(response.data);
    } catch (error) {
      alert('Something went wrong ' + error);
    }
  };

  const deleteCustomer=async(val)=>{
    try{
        const response = await myAxios.delete('/api/customer/delete/'+val,{
            headers : {
                Authorization : `Bearer ${token}`
            }
        })
        fetchCustomers();
        if(response.status === 200){alert('Customer deleted')}
    }catch(error){
        alert(error);
    }
}

  // Search functionality
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchQuery(value);
    setFilteredCustomers(customers.filter(c => c.name.toLowerCase().includes(value)));
    setCurrentPage(1); // Reset to first page after search
  };
  return (
    <>
      {/* <div className="p-2 w-full  text-left rtl:text-right text-gray-500 dark:text-gray-400 text-xs text-slate-500 uppercase  dark:text-slate-500 flex gap-4 font-bold">
        <h1 className="text-xl">Total Customers <span className="text-green-500">500</span></h1>

      </div> */}
      <div className="w-[900px] p-2">
        <div className="text-xl font-bold p-4 text-slate-500 uppercase dark:text-slate-500">
          <h1>Customers</h1>
        </div>

        {/* Search Bar */}
        <div className="pb-4">
          <label htmlFor="table-search" className="sr-only">Search</label>
          <div className="relative mt-1">
            <input
              type="text"
              id="table-search"
              value={searchQuery}
              onChange={handleSearch}
              className="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search by name"
            />
          </div>
        </div>

        {/* Table */}
        <div className="relative overflow-x-auto custom-scrollbar">
          <table class="w-full text-sm text-left text-center rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-300 dark:bg-gray-700 dark:text-gray-200">
              <tr>
                <th scope='col' className="px-6 py-3 bg-gray-300 dark:bg-gray-700">NAME</th>
                <th scope='col' className="px-6 py-3 bg-gray-300 dark:bg-gray-700">AMOUNT</th>
                <th scope='col' className="px-6 py-3 bg-gray-300 dark:bg-gray-700">Details</th>
              </tr>
            </thead>
            <tbody>
              {currentCustomers.length !== 0 ? (currentCustomers.map((customer, index) => (
                <>

                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={customer.id}>
                    <th className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                      {customer.name}
                    </th>
                    <td className="px-6 py-4 text-green-400">₹{customer.balance}</td>
                    <td>
                      <button
                        data-modal-target="editCustomer-modal"
                        data-modal-toggle="editCustomer-modal"
                        onClick={() => {
                          getCustomer(customer.customerid);
                        }}
                        className="text-blue-500 dark:text-blue-200 h-6 rounded p-1">View</button>
                    </td>
                  </tr>
                </>
              ))) : (<h1>Customers not found</h1>)}
            </tbody>
          </table>

          {/* {selectedCustomer && <h1>ok {selectedCustomer}</h1>} */}




        </div>

        {/* Modal for udpate Customer */}
        <div id="editCustomer-modal" tabindex="-1" aria-hidden="true" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">

          <div class="relative p-4 w-full max-w-2xl max-h-full bg-white">
            <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                Update Customer
              </h3>
              <div className='flex gap-4'>
                <button data-modal-target="popup-delete-customer"
                  data-modal-toggle="popup-delete-customer" className='text-red-500 hover:bg-gray-200 p-1 rounded-lg'><i class='bx bx-trash-alt text-xl' ></i></button>
                <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="editCustomer-modal">

                  <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                  </svg>
                  <span class="sr-only">Close modal</span>
                </button>
              </div>
            </div>


            <div id="popup-delete-customer" tabindex="-1" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
              <div class="relative p-4 w-full max-w-md max-h-full">
                <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">

                  <button type="button" class="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-delete-customer">
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                    </svg>
                    <span class="sr-only">Close modal</span>
                  </button>
                  <div class="p-4 md:p-5 text-center">
                    <svg class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this customer?</h3>
                    <button

                      onClick={()=>{deleteCustomer(selectedCustomer.customerid)}}

                      data-modal-hide="popup-delete-customer" type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                      Yes, I'm sure
                    </button>
                    <button data-modal-hide="popup-delete-customer" type="button" class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">No, cancel</button>
                  </div>
                </div>
              </div>
            </div>

            {/* form */}
            <Formik
              initialValues={updateCustIntialState}
              enableReinitialize={true}
              onSubmit={(val) => { updateCustomer(val) }}
            >

              <Form className="mb-6">
                <div className='flex justify-between gap-1'>
                  <div class="mb-5 w-1/2">
                    <label for="name" name="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                    <Field type="text" name="name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='customer name' required />
                  </div>
                  <div className="mb-6 w-1/2">
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Email
                    </label>

                    <Field
                      type="email"
                      id="email"
                      name="email"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="name@company.com"
                      required
                    />
                  </div>
                </div>
                <div class="mb-5">
                  <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mobile number</label>
                  <Field type="number" name="phonenumber" id="phonenumber" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='mobile number' required />
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="subject"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Address
                  </label>
                  <Field
                    type="text"
                    name="address"
                    id="address"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="customer address"
                    required
                  />
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="subject"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Balance
                  </label>
                  <Field
                    type="number"
                    id="balance"
                    name="balance"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Opening balance"
                    required
                  />
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="message"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your message
                  </label>
                  <Field
                    id="message"
                    as="textarea"
                    name="message"
                    for="message"
                    rows="4"
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Your message..."
                  />
                </div>
                <button
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 w-full focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 block"
                >
                  Save
                </button>
              </Form>
            </Formik>
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

        {/* Drawer and Form */}
        <div className="flex mt-4 justify-end">
          <button class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" type="button" data-drawer-target="addCustomer-drawer" data-drawer-show="addCustomer-drawer" data-drawer-placement="right" aria-controls="addCustomer-drawer">
            + Add Customer
          </button>
        </div>
        {/* Drawer element */}
        <div id="addCustomer-drawer" class="fixed top-0 right-0 z-40 h-screen p-4 overflow-y-auto transition-transform translate-x-full bg-white w-80 dark:bg-gray-800" tabindex="-1" aria-labelledby="drawer-right-label">
          <h5
            id="drawer-label"
            className="inline-flex items-center mb-6 text-base font-semibold text-gray-500 uppercase dark:text-gray-400"
          >
            {/* SVG Icon */}
            <svg
              className="w-4 h-4 me-2.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 16"
            >
              <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
              <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
            </svg>
            Add Customer
          </h5>

          <button type="button" data-drawer-hide="addCustomer-drawer" aria-controls="addCustomer-drawer" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white" >
            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
            </svg>
            <span class="sr-only">Close menu</span>
          </button>

          <Formik
            initialValues={initialState}
            onSubmit={(val) => { saveCustomer(val) }}
          >

            <Form className="mb-6">
              <div class="mb-5">
                <label for="name" name="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                <Field type="text" name="name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='customer name' required />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email
                </label>

                <Field
                  type="email"
                  id="email"
                  name="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required
                />
              </div>
              <div class="mb-5">
                <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mobile number</label>
                <Field type="number" name="phonenumber" id="phonenumber" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='mobile number' required />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="subject"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Address
                </label>
                <Field
                  type="text"
                  name="address"
                  id="address"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="customer address"
                  required
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="subject"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Balance
                </label>
                <Field
                  type="number"
                  id="balance"
                  name="balance"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Opening balance"
                  required
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="message"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your message
                </label>
                <Field
                  id="message"
                  as="textarea"
                  name="message"
                  for="message"
                  rows="4"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Your message..."
                />
              </div>
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 w-full focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 block"
              >
                Save
              </button>
            </Form>
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

    </>
  );
};

export default Customers;
