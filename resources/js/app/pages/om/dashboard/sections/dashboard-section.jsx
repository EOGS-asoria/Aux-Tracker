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

export default function OMDashboard() {
    const [totalExpenses, setTotalExpenses] = useState(0);
    const [budget, setBudget] = useState(0);
    const [revenue, setRevenue] = useState(0);
    const [totalBreaks, setTotalBreaks] = useState(0);
    const [TotalTeamAgent, setTotalTeamAgent] = useState(0);
    const [totalLunches, setTotalLunches] = useState(0);

    const dashboardData = {
        totalExpenses: 5000,
        budget: 10000,
        revenue: 15000,
        TotalTeamAgent: 30,
        totalBreaks: 25,
        totalLunches: 20,
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

        animateCount(setTotalExpenses, dashboardData.totalExpenses);
        animateCount(setBudget, dashboardData.budget);
        animateCount(setRevenue, dashboardData.revenue);
        animateCount(setTotalTeamAgent, dashboardData.TotalTeamAgent);
        animateCount(setTotalBreaks, dashboardData.totalBreaks);
        animateCount(setTotalLunches, dashboardData.totalLunches);
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
                data: [10000, 12000, 11000, 13000, 14000, 15000, 16000],
                fill: false,
                backgroundColor: "rgb(75, 192, 192)",
                borderColor: "rgba(75, 192, 192, 0.2)",
            },
            {
                label: "Expenses",
                data: [4000, 4500, 5000, 4700, 4800, 4900, 5000],
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
                Operations Manager Dashboard
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                {/* Card Component */}
                {[
                    {
                        label: "Total Expenses",
                        value: `₱${totalExpenses.toLocaleString()}`,
                        icon: "fas fa-dollar-sign",
                        color: "red-500",
                    },
                    {
                        label: "Budget",
                        value: `₱${budget.toLocaleString()}`,
                        icon: "fas fa-wallet",
                        color: "blue-500",
                    },
                    {
                        label: "Revenue",
                        value: `₱${revenue.toLocaleString()}`,
                        icon: "fas fa-chart-line",
                        color: "green-500",
                    },
                    {
                        label: "Total Team Agent",
                        value: TotalTeamAgent,
                        icon: "fas fa-coffee",
                        color: "yellow-500",
                    },
                    {
                        label: "Total Breaks",
                        value: totalBreaks,
                        icon: "fas fa-coffee",
                        color: "yellow-500",
                    },
                    {
                        label: "Total Lunches",
                        value: totalLunches,
                        icon: "fas fa-utensils",
                        color: "green-500",
                    },
                ].map((item, index) => (
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
