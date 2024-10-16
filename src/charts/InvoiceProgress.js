import { useEffect, useState } from 'react';
import ApexCharts from 'apexcharts';

const Invoiceprogress = () => {
  useEffect(() => {
    // Radial chart options
    const options = {
      series: [44, 55, 67], // Corresponds to pending sales, pending purchase, total invoice
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
                // Custom formatter for the total value
                return 67; // Example total invoice count
              },
            },
          },
        },
      },
      labels: ['Pending Sales', 'Pending Purchase', 'Total Invoice'],
      colors: ['#f97316', '#14b8a6', '#3b82f6'], // Orange for pending sales, teal for purchase, blue for total
    };

    const chart = new ApexCharts(document.querySelector('#radial-chart'), options);
    chart.render();

    // Cleanup chart on component unmount
    return () => {
      chart.destroy();
    };
  }, []);

  return (
    <div class="max-w-sm w-full bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6">
      <div class="flex justify-between mb-3">
        <div class="flex items-center">
          <div class="flex justify-center items-center">
            <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white pe-1">Invoice Progress</h5>
            <svg data-popover-target="chart-info" data-popover-placement="bottom" class="w-3.5 h-3.5 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white cursor-pointer ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm0 16a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm1-5.034V12a1 1 0 0 1-2 0v-1.418a1 1 0 0 1 1.038-.999 1.436 1.436 0 0 0 1.488-1.441 1.501 1.501 0 1 0-3-.116.986.986 0 0 1-1.037.961 1 1 0 0 1-.96-1.037A3.5 3.5 0 1 1 11 11.466Z" />
            </svg>
          </div>
        </div>
      </div>

      <div class="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
        {/* Radial Chart */}
        <div class="py-6" id="radial-chart"></div>
      </div>

      <div class="grid grid-cols-1 items-center border-gray-200 border-t dark:border-gray-700 justify-between">
        <div class="flex justify-between items-center pt-5">
          {/* Button */}
          <button
            id="dropdownDefaultButton"
            data-dropdown-toggle="lastDaysdropdown"
            data-dropdown-placement="bottom"
            class="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 text-center inline-flex items-center dark:hover:text-white"
            type="button">
            Last 7 days
            <svg class="w-2.5 m-2.5 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
            </svg>
          </button>

          {/* Progress report button */}
          <a
            href="#"
            class="uppercase text-sm font-semibold inline-flex items-center rounded-lg text-blue-600 hover:text-blue-700 dark:hover:text-blue-500  hover:bg-gray-100 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 px-3 py-2">
            Progress report
            <svg class="w-2.5 h-2.5 ms-1.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Invoiceprogress;
