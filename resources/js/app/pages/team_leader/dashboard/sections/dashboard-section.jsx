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
    const [agentsAssigned, setAgentsAssigned] = useState(0);
    const [timeKeeping, setTimeKeeping] = useState(0);
    const [logs, setLogs] = useState(0);

    const dashboardData = {
        agentsAssigned: 20,
        timeKeeping: 75, // Example value for time keeping
        logs: 100,
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

        animateCount(setAgentsAssigned, dashboardData.agentsAssigned);
        animateCount(setTimeKeeping, dashboardData.timeKeeping);
        animateCount(setLogs, dashboardData.logs);
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
                label: "Agents Assigned",
                data: [15, 18, 20, 22, 25, 30, 28], // Update data as needed
                fill: false,
                backgroundColor: "rgb(75, 192, 192)",
                borderColor: "rgba(75, 192, 192, 0.2)",
            },
            {
                label: "Time Keeping (%)",
                data: [70, 75, 80, 85, 90, 88, 92], // Example data
                fill: false,
                backgroundColor: "rgb(255, 99, 132)",
                borderColor: "rgba(255, 99, 132, 0.2)",
            },
            {
                label: "Logs",
                data: [90, 95, 100, 105, 110, 115, 120], // Example data
                fill: false,
                backgroundColor: "rgb(54, 162, 235)",
                borderColor: "rgba(54, 162, 235, 0.2)",
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
                text: "Team Metrics Graph (Monthly)",
            },
        },
    };

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            <h1 className="text-4xl font-bold mb-4 text-gray-800">
              Team Leader Dashboard
            </h1>
            <h2 className="text-xl font-semibold text-gray-600 mb-10">
                San Carlos City Site 
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                {/* Card Component */}
                {[{
                    label: "Agents",
                    value: agentsAssigned,
                    icon: "fas fa-user",
                    color: "orange-500",
                }, {
                    label: "Time Keeping",
                    value: timeKeeping,
                    icon: "fas fa-clock",
                    color: "blue-500",
                }, {
                    label: "Logs",
                    value: logs,
                    icon: "fas fa-file-alt",
                    color: "red-500",
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
                    Team Metrics Graph (Monthly)
                </h2>
                <h3 className="text-md font-medium text-gray-600">
                    San Carlos City Site
                </h3>
                <Line data={graphData} options={options} />
            </div>
        </div>
    );
}
