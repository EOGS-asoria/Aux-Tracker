import React, { useState, useEffect } from 'react';
import Table from '@/app/_components/table';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function DashboardTableSection() {
    const [dataChecked, setDataChecked] = useState([]);

    const [countUsers, setCountUsers] = useState(0);
    const [countLogs, setCountLogs] = useState(0);
    const [countTime, setCountTime] = useState(0);

    // Values to count up to
    const totalUsers = 100; // Example value for total users
    const totalLogs = 500; // Example value for total logs
    const totalTime = 1200; // Example value for total time in minutes

    useEffect(() => {
        const animateCount = (setter, endValue) => {
            let startValue = 0;
            const step = endValue / 100; // Adjust the step value for smoothness

            const interval = setInterval(() => {
                startValue += step;
                if (startValue >= endValue) {
                    clearInterval(interval);
                    startValue = endValue;
                }
                setter(Math.round(startValue));
            }, 20);
        };

        animateCount(setCountUsers, totalUsers);
        animateCount(setCountLogs, totalLogs);
        animateCount(setCountTime, totalTime);
    }, []);

    // Sample data for the graph
    const data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'Activity',
                data: [30, 45, 60, 80, 70, 90, 100], // Example data for activity
                fill: false,
                backgroundColor: 'rgb(75, 192, 192)',
                borderColor: 'rgba(75, 192, 192, 0.2)',
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Activity Over Time',
            },
        },
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-8 text-gray-700">Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Total Users */}
                <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
                    <i className="fas fa-user fa-2x text-blue-500 mr-4"></i>
                    <div>
                        <h2 className="text-xl font-semibold text-gray-600">Total Users</h2>
                        <p className="text-3xl font-bold text-gray-900 mt-2">{countUsers}</p>
                    </div>
                </div>

                {/* Total Logs */}
                <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
                    <i className="fas fa-file-alt fa-2x text-green-500 mr-4"></i>
                    <div>
                        <h2 className="text-xl font-semibold text-gray-600">Total Logs</h2>
                        <p className="text-3xl font-bold text-gray-900 mt-2">{countLogs}</p>
                    </div>
                </div>

                {/* Total Time */}
                <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
                    <i className="fas fa-clock fa-2x text-yellow-500 mr-4"></i>
                    <div>
                        <h2 className="text-xl font-semibold text-gray-600">Total Time (mins)</h2>
                        <p className="text-3xl font-bold text-gray-900 mt-2">{countTime}</p>
                    </div>
                </div>
            </div>

            {/* Responsive Graph Section */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold text-gray-600 mb-4">Activity Graph</h2>
                <Line data={data} options={options} />
            </div>
        </div>
    );
}
