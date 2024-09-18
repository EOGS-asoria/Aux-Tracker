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
    const [accountManagers, setAccountManagers] = useState(0);
    const [teamLeaders, setTeamLeaders] = useState(0);
    const [agents, setAgents] = useState(0);
    const [logs, setLogs] = useState(0);

    const dashboardData = {
        accountManagers: 5,
        teamLeaders: 7,
        agents: 20,
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

        animateCount(setAccountManagers, dashboardData.accountManagers);
        animateCount(setTeamLeaders, dashboardData.teamLeaders);
        animateCount(setAgents, dashboardData.agents);
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
                label: "Account Managers",
                data: [10, 12, 11, 15, 14, 16, 18],
                fill: false,
                backgroundColor: "rgb(75, 192, 192)",
                borderColor: "rgba(75, 192, 192, 0.2)",
            },
            {
                label: "Team Leaders",
                data: [5, 6, 8, 7, 9, 10, 12],
                fill: false,
                backgroundColor: "rgb(255, 99, 132)",
                borderColor: "rgba(255, 99, 132, 0.2)",
            },
            {
                label: "Agents",
                data: [20, 22, 23, 21, 24, 26, 28],
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
              Operations Manager's Dashboard
            </h1>
            <h2 className="text-xl font-semibold text-gray-600 mb-10">
                San Carlos City Site
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
                {/* Card Component */}
                {[{
                    label: "Account Managers",
                    value: accountManagers,
                    icon: "fas fa-users",
                    color: "blue-500",
                }, {
                    label: "Team Leaders",
                    value: teamLeaders,
                    icon: "fas fa-user-tie",
                    color: "green-500",
                }, {
                    label: "Agents",
                    value: agents,
                    icon: "fas fa-user",
                    color: "orange-500",
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
