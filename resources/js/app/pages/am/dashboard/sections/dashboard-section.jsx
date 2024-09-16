import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export default function AccountingDashboard() {
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [totalExpenses, setTotalExpenses] = useState(0);
    const [netProfit, setNetProfit] = useState(0);
    const [totalAssets, setTotalAssets] = useState(0);
    const [totalLiabilities, setTotalLiabilities] = useState(0);
    const [totalEquity, setTotalEquity] = useState(0);

    const dashboardData = {
        totalRevenue: 120000,
        totalExpenses: 80000,
        netProfit: 40000,
        totalAssets: 150000,
        totalLiabilities: 50000,
        totalEquity: 100000,
    };

    useEffect(() => {
        const animateCount = (setter, endValue) => {
            let startValue = 0;
            const step = endValue / 100;
            const interval = setInterval(() => {
                startValue += step;
                if (startValue >= endValue) {
                    clearInterval(interval);
                    startValue = endValue;
                }
                setter(Math.round(startValue));
            }, 20);
        };

        animateCount(setTotalRevenue, dashboardData.totalRevenue);
        animateCount(setTotalExpenses, dashboardData.totalExpenses);
        animateCount(setNetProfit, dashboardData.netProfit);
        animateCount(setTotalAssets, dashboardData.totalAssets);
        animateCount(setTotalLiabilities, dashboardData.totalLiabilities);
        animateCount(setTotalEquity, dashboardData.totalEquity);
    }, []);

    const graphData = {
        labels: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
        ],
        datasets: [
            {
                label: "Revenue",
                data: [110000, 115000, 120000, 125000, 130000, 135000, 140000],
                fill: false,
                backgroundColor: "rgb(75, 192, 192)",
                borderColor: "rgba(75, 192, 192, 0.2)",
            },
            {
                label: "Expenses",
                data: [60000, 65000, 70000, 68000, 71000, 73000, 75000],
                fill: false,
                backgroundColor: "rgb(255, 99, 132)",
                borderColor: "rgba(255, 99, 132, 0.2)",
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: "Revenue and Expenses Trends (Monthly)",
            },
        },
    };

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            <h1 className="text-4xl font-bold mb-10 text-gray-800">
                Accounting Manager Dashboard
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                {/* Card Component */}
                {[{
                    label: "Total Revenue",
                    value: `₱${totalRevenue.toLocaleString()}`,
                    icon: "fas fa-dollar-sign",
                    color: "green-500",
                },
                {
                    label: "Total Expenses",
                    value: `₱${totalExpenses.toLocaleString()}`,
                    icon: "fas fa-credit-card",
                    color: "red-500",
                },
                {
                    label: "Net Profit",
                    value: `₱${netProfit.toLocaleString()}`,
                    icon: "fas fa-money-bill-wave",
                    color: "blue-500",
                },
                {
                    label: "Total Assets",
                    value: `₱${totalAssets.toLocaleString()}`,
                    icon: "fas fa-building",
                    color: "purple-500",
                },
                {
                    label: "Total Liabilities",
                    value: `₱${totalLiabilities.toLocaleString()}`,
                    icon: "fas fa-hand-holding-usd",
                    color: "orange-500",
                },
                {
                    label: "Total Equity",
                    value: `₱${totalEquity.toLocaleString()}`,
                    icon: "fas fa-chart-line",
                    color: "teal-500",
                }].map((item, index) => (
                    <div
                        key={index}
                        className="bg-white p-6 rounded-lg shadow-md flex items-center transition-transform transform hover:scale-105 hover:shadow-lg"
                    >
                        <i
                            className={`${item.icon} fa-2x text-${item.color} mr-4`}
                        ></i>
                        <div>
                            <h2 className="text-xl font-semibold text-gray-600">
                                {item.label}
                            </h2>
                            <p className="text-3xl font-bold text-gray-900 mt-2">
                                {item.value}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Graph */}
            <div className="bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">
                    Revenue & Expenses Graph (Monthly)
                </h2>
                <Line data={graphData} options={options} />
            </div>
        </div>
    );
}
