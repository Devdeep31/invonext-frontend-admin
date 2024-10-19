import 'flowbite';
import { initFlowbite } from 'flowbite';
import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';

const Weeksales = () => {
    useEffect(() => {
        initFlowbite();
    }, []);

    // Chart options and series data are stored in state
    const [chartOptions, setChartOptions] = useState({
        xaxis: {
            categories: ['01 Feb', '02 Feb', '03 Feb', '04 Feb', '05 Feb', '06 Feb', '07 Feb'],
            labels: {
                show: true,
                style: {
                    fontFamily: "Inter, sans-serif",
                    cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400',
                },
            },
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false,
            },
        },
        yaxis: {
            labels: {
                show: true,
                style: {
                    fontFamily: "Inter, sans-serif",
                    cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400',
                },
                formatter: function (value) {
                    return '₹' + value;  // Format y-axis values as currency
                },
            },
        },
        chart: {
            type: "area",
            height: "100%",
            width: "100%",
            toolbar: {
                show: false,  // Hide the toolbar
            },
        },
        stroke: {
            width: 3,  // Thicker line for better visibility
        },
        fill: {
            type: "gradient",  // Gradient fill for area under the line
            gradient: {
                opacityFrom: 0.55,
                opacityTo: 0,
            },
        },
        dataLabels: {
            enabled: false,  // Disable data labels directly on the chart
        },
        grid: {
            show: false,  // Hide grid lines for a cleaner look
        },
    });

    const [chartSeries, setChartSeries] = useState([
        {
            name: "Sales",
            data: [150, 141, 145, 152, 135, 125],  // Sales data for Developer Edition
            color: "#32cd32",  // Blue color for this series
        },
        {
            name: "Expense",
            data: [43, 13, 65, 12, 42, 73],  // Sales data for Designer Edition
            color: "#FF0000",  // Purple color for this series
        },
    ]);

    return (
        <>
            <div className="max-w-sm w-full bg-white rounded-lg shadow dark:bg-gray-800">
                {/* Sales Summary */}
                <div className="flex justify-between p-4 md:p-6 pb-0 md:pb-0">
                    <div>
                        <h5 className="leading-none text-3xl font-bold text-gray-900 dark:text-white pb-2">₹12,423</h5>
                        <p className="text-base font-normal text-gray-500 dark:text-gray-400">Sales this week</p>
                    </div>
                    <div className="flex items-center px-2.5 py-0.5 text-base font-semibold text-green-500 dark:text-green-500 text-center">
                        23%
                        <svg className="w-3 h-3 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13V1m0 0L1 5m4-4 4 4" />
                        </svg>
                    </div>
                </div>

                {/* Chart */}
                <div className="px-2.5">
                    <Chart
                        options={chartOptions}
                        series={chartSeries}
                        type="area"
                        height="300"
                    />
                </div>

                {/* Footer section with dropdown and report link */}
                <div className="grid grid-cols-1 items-center border-gray-200 border-t dark:border-gray-700 justify-between mt-5 p-4 md:p-6 pt-0 md:pt-0">
                    <div className="flex justify-between items-center pt-5">
                        {/* Dropdown Button */}
                        <button
                            id="dropdownDefaultButton"
                            data-dropdown-toggle="lastDaysdropdown"
                            data-dropdown-placement="bottom"
                            className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 text-center inline-flex items-center dark:hover:text-white"
                            type="button">
                            Last 7 days
                            <svg className="w-2.5 m-2.5 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                            </svg>
                        </button>

                        {/* Dropdown menu (for time range options) */}
                        <div id="lastDaysdropdown" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                                <li><a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Yesterday</a></li>
                                <li><a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Today</a></li>
                                <li><a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Last 7 days</a></li>
                                <li><a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Last 30 days</a></li>
                                <li><a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Last 90 days</a></li>
                            </ul>
                        </div>

                        {/* Sales Report Link */}
                        <a
                            href="#"
                            className="uppercase text-sm font-semibold inline-flex items-center rounded-lg text-blue-600 hover:text-blue-700 dark:hover:text-blue-500 hover:bg-gray-100 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 px-3 py-2">
                            Sales Report
                            <svg className="w-2.5 h-2.5 ms-1.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Weeksales;
