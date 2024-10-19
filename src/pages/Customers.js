import { Formik, Form, Field } from 'formik';
import { useEffect, useState } from 'react';
import { myAxios } from '../services/Helper';
import useFetch from '../Hooks/useFetch';

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCustomer,setSelectedCustomer] = useState(null);

 const initialState = {
    id: "",
    name: "",
    email: "",
    phonenumber: "",
    address: "",
    balance: "",
    message: ""
  }

  const saveCustomer = async (val) => {
    try {
      //const token = localStorage.getItem("token");
      // await myAxios.post("/customer/add", val, {
      //   headers: { Authorization: `Bearer ${token}` },
      // });
      await myAxios.post('/customer/add',val);
      alert("Customer saved");
      window.location.reload();
    } catch (error) {
      alert("Something went wrong " + error);
    }
  };

  // const url = '/customer/customer/'+selectedCustomer;
  
  // const [data, error, loading] = useFetch(url);
  // console.log(data);
  const editCustomer = (val) => {
    //console.log('edit clicked');
    setSelectedCustomer(1);
    //return(<><h1>ok{val}</h1></>)
  }

  useEffect(() => {
    (async () => {
      try {
        //const token = localStorage.getItem("token");
        // const response = await myAxios.get("/customers", {
        //   headers: { Authorization: `Bearer ${token}` },
        // });
        const response = await myAxios.get('customer/customers');
        setCustomers(response.data);
        setFilteredCustomers(response.data);
      } catch (error) {
        console.error(error);
      }
    })();

    // Drawer functionality
    const drawerButton = document.querySelector("[data-drawer-show='drawer-contact']");
    const drawer = document.getElementById("drawer-contact");
    const closeButton = document.querySelector("[data-drawer-hide='drawer-contact']");

    const showDrawer = () => drawer.style.transform = 'translateX(0)';
    const hideDrawer = () => drawer.style.transform = 'translateX(100%)';

    drawerButton.addEventListener('click', showDrawer);
    closeButton.addEventListener('click', hideDrawer);

    return () => {
      drawerButton.removeEventListener('click', showDrawer);
      closeButton.removeEventListener('click', hideDrawer);
    };
  }, []);

  //Search bar . . 
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchQuery(value);
    setFilteredCustomers(customers.filter(c => c.name.toLowerCase().includes(value)));
  };
  //Pagination . .
  const [currentPage, setCurrentPage] = useState(1);
  const customersPerPage = 5;
  const indexOfLastCustomer = currentPage * customersPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
  const currentCustomers = filteredCustomers.slice(indexOfFirstCustomer, indexOfLastCustomer);
  const totalPages = Math.ceil(filteredCustomers.length / customersPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="w-[700px] p-2">
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
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 justify-between text-center">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="px-6 py-3">NAME</th>
                <th className="px-6 py-3">AMOUNT</th>
                <th className="px-6 py-3">Details</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((customer) => (
                <>
                
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={customer.id}>
                    <th className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                      {customer.name}
                    </th>
                    <td className="px-6 py-4 text-green-400">₹{customer.balance}</td>
                    <td>
                      <button onClick={() => {
                        editCustomer(customer.id);
                      }} className="text-blue-500 dark:text-blue-200 h-6 rounded p-1">View</button>
                    </td>
                  </tr>
                  </>
              ))}
            </tbody>
          </table>

          {selectedCustomer && <h1>ok {selectedCustomer}</h1>}

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
        </div>

        {/* Drawer and Form */}
        <div className="flex mt-4 justify-end">
          <button
            className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5"
            type="button"
            data-drawer-show="drawer-contact"
          >
            + Add Customer
          </button>
        </div>
        {/* Drawer element */}
        <div
          id="drawer-contact"
          className="fixed top-0 right-0 z-40 h-screen p-4 overflow-y-auto transition-transform translate-x-full bg-white w-80 dark:bg-gray-800"
          // className="fixed top-0 right-0 z-40 h-screen p-4 overflow-y-auto transition-transform translate-x-full bg-white w-96 dark:bg-gray-800"

          tabIndex="-1"
          aria-labelledby="drawer-contact-label"
        >
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
          <button
            type="button"
            data-drawer-hide="drawer-contact"
            aria-controls="drawer-contact"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
          >
            {/* Close Icon */}
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close menu</span>
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
