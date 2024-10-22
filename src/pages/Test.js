import { useEffect, useState } from 'react';
import { myAxios } from '../services/Helper';
import useFetch from '../Hooks/useFetch';
import { initFlowbite } from 'flowbite'
export default function TestPagination() {
    const [currentPage, setCurrentPage] = useState(1);
    const [entriesPerPage] = useState(8); // You can adjust this to any number
    const [filteredEntries, setFilteredEntries] = useState([]);
    const { data, loading } = useFetch('/cashbook/cashbooks');

    useEffect(() => {
        // You can filter the data here if needed
        setFilteredEntries(data);
        initFlowbite();
    }, [data]);

    // Calculate the entries for the current page
    const indexOfLastEntry = currentPage * entriesPerPage;
    const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
    const currentEntries = filteredEntries.slice(indexOfFirstEntry, indexOfLastEntry);
    const totalPages = Math.ceil(filteredEntries.length / entriesPerPage);

    // Handle pagination change
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div>
            {/* Table */}
            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">Description</th>
                            <th scope="col" className="px-6 py-3">Amount</th>
                            <th scope="col" className="px-6 py-3">Out</th>
                            <th scope="col" className="px-6 py-3">In</th>
                            <th scope="col" className="px-6 py-3">Date</th>
                            <th scope="col" className="px-6 py-3">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentEntries.map((entry) => (
                            <tr key={entry.cashbook_id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <td className="px-6 py-4">{entry.description}</td>
                                <td className="px-6 py-4">{entry.amount}</td>
                                <td className="px-6 py-4 text-red-500 font-bold">
                                    {entry.entry_mode === 'OUT' ? entry.entry_mode : '-'}
                                </td>
                                <td className="px-6 py-4 text-green-500 font-bold">
                                    {entry.entry_mode === 'IN' ? entry.entry_mode : '-'}
                                </td>
                                <td className="px-6 py-4">{entry.date}</td>
                                <td className="px-6 py-4">
                                    <button className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                        Edit
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Flowbite Pagination */}
            <nav className="flex justify-center items-center mt-4">
                <ul className="inline-flex items-center -space-x-px">
                    <li>
                        <button
                            onClick={() => paginate(currentPage - 1)}
                            className={`px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                                currentPage === 1 && 'cursor-not-allowed'
                            }`}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </button>
                    </li>
                    {Array.from({ length: totalPages }, (_, i) => (
                        <li key={i + 1}>
                            <button
                                onClick={() => paginate(i + 1)}
                                className={`px-3 py-2 leading-tight ${
                                    currentPage === i + 1
                                        ? 'text-blue-600 bg-blue-50 border border-blue-300'
                                        : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                                }`}
                            >
                                {i + 1}
                            </button>
                        </li>
                    ))}
                    <li>
                        <button
                            onClick={() => paginate(currentPage + 1)}
                            className={`px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                                currentPage === totalPages && 'cursor-not-allowed'
                            }`}
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    );
}
