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

export default function Dashboard() {
    const [totalTeamLeaders, setTotalTeamLeaders] = useState(0);
    const [totalAgents, setTotalAgents] = useState(0);
    const [totalLogs, setTotalLogs] = useState(0);

    const dashboardData = {
        totalTeamLeaders: 10,
        totalAgents: 50,
        totalLogs: 150,
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

        animateCount(setTotalTeamLeaders, dashboardData.totalTeamLeaders);
        animateCount(setTotalAgents, dashboardData.totalAgents);
        animateCount(setTotalLogs, dashboardData.totalLogs);
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
                label: "Team Leaders",
                data: [8, 9, 10, 10, 10, 10, 10],
                fill: false,
                backgroundColor: "rgb(75, 192, 192)",
                borderColor: "rgba(75, 192, 192, 0.2)",
            },
            {
                label: "Agents",
                data: [40, 45, 50, 50, 50, 50, 50],
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
                text: "Team Leaders and Agents Trends (Monthly) - San Carlos Site",
            },
        },
    };

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            <h1 className="text-4xl font-bold mb-10 text-gray-800">
                Account Manager's Dashboard - San Carlos Site
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                {/* Card Component */}
                {[
                    {
                        label: "Total Team Leaders",
                        value: totalTeamLeaders,
                        icon: "fas fa-user-tie",
                        color: "green-500",
                    },
                    {
                        label: "Total Agents",
                        value: totalAgents,
                        icon: "fas fa-user-friends",
                        color: "blue-500",
                    },
                    {
                        label: "Total Logs",
                        value: totalLogs,
                        icon: "fas fa-file-alt",
                        color: "orange-500",
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
                    Team Leaders & Agents Graph (Monthly)
                </h2>
                <Line data={graphData} options={options} />
            </div>
        </div>
    );
}
