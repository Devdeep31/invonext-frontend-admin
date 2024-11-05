import { useEffect, useState } from 'react';
import ApexCharts from 'apexcharts';
import { myAxios } from '../services/Helper';

const Invoiceprogress = () => {
  const token = localStorage.getItem('token');
  const [invoiceData, setInvoiceData] = useState({});

  // Fetch invoice data
  const fetchInvoiceData = async () => {
    try {
      const response = await myAxios.get('/api/invoices/data', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Fetched data:", response.data); // Log fetched data
      setInvoiceData(response.data); // Update state with fetched data
    } catch (error) {
      console.error("Error fetching invoice data:", error);
    }
  };

  useEffect(() => {
    fetchInvoiceData(); // Fetch data on component mount
  }, []);

  useEffect(() => {
    // Check if data is available before rendering the chart
    if (invoiceData && invoiceData.totalPendingInvoices !== undefined && invoiceData.totalCompletedInvoices !== undefined && invoiceData.totalInvoices !== undefined) {
      console.log("Invoice data is ready:", invoiceData); // Log when data is ready

      // Radial chart options
      const options = {
        series: [
          invoiceData.totalPendingInvoices,
          invoiceData.totalCompletedInvoices,
          invoiceData.totalInvoices,
        ],
        chart: {
          height: 350,
          type: 'radialBar',
        },
        plotOptions: {
          radialBar: {
            dataLabels: {
              name: {
                fontSize: '22px',
              },
              value: {
                fontSize: '16px',
              },
              total: {
                show: true,
                label: 'Total',
                formatter: function () {
                  // Return the total number of invoices
                  return invoiceData.totalInvoices; // Example total invoice count
                },
              },
            },
          },
        },
        labels: ['Pending Invoices', 'Completed Invoices', 'Total Invoices'],
        colors: ['#f97316', '#14b8a6', '#3b82f6'], // Orange for pending sales, teal for purchase, blue for total
      };

      const chart = new ApexCharts(document.querySelector('#radial-chart'), options);
      chart.render();

      // Cleanup chart on component unmount
      return () => {
        chart.destroy();
      };
    }
  }, [invoiceData]); // Dependency array includes invoiceData to re-run when data changes

  return (
    <div className="max-w-sm w-full bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6">
      <div className="flex justify-between mb-3">
        <div className="flex items-center">
          <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white pe-1">
            Invoice Progress
          </h5>
          {/* Additional icons or info can go here */}
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
        {/* Radial Chart */}
        <div className="py-6" id="radial-chart"></div>
      </div>

      <div className="grid grid-cols-1 items-center border-gray-200 border-t dark:border-gray-700 justify-between">
        <div className="flex justify-between items-center pt-5">
          {/* Button and Progress report button */}
          <button
            id="dropdownDefaultButton"
            data-dropdown-toggle="lastDaysdropdown"
            className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 inline-flex items-center dark:hover:text-white"
            type="button"
          >
            Last 7 days
          </button>
          <a
            href="#"
            className="uppercase text-sm font-semibold inline-flex items-center rounded-lg text-blue-600 hover:text-blue-700 dark:hover:text-blue-500 hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-2"
          >
            Progress report
          </a>
        </div>
      </div>
    </div>
  );
};

export default Invoiceprogress;
