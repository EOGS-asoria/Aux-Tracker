import React, { useState } from 'react';
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

    const totalProducts = 150;
    const totalUsers = 75;
    const totalSales = 3200;

    // Sample data for the graph
    const data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'Sales',
                data: [1200, 1900, 3000, 5000, 2000, 3000, 4000],
                fill: false,
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgba(255, 99, 132, 0.2)',
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
                text: 'Sales Over Time',
            },
        },
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-8 text-gray-700">Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Total Products */}
                <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
                    <i className="fas fa-box fa-2x text-blue-500 mr-4"></i>
                    <div>
                        <h2 className="text-xl font-semibold text-gray-600">Total Products</h2>
                        <p className="text-3xl font-bold text-gray-900 mt-2">{totalProducts}</p>
                    </div>
                </div>

                {/* Total Users */}
                <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
                    <i className="fas fa-users fa-2x text-green-500 mr-4"></i>
                    <div>
                        <h2 className="text-xl font-semibold text-gray-600">Total Users</h2>
                        <p className="text-3xl font-bold text-gray-900 mt-2">{totalUsers}</p>
                    </div>
                </div>

                {/* Total Sales */}
                <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
                    <i className="fas fa-dollar-sign fa-2x text-yellow-500 mr-4"></i>
                    <div>
                        <h2 className="text-xl font-semibold text-gray-600">Total Sales</h2>
                        <p className="text-3xl font-bold text-gray-900 mt-2">${totalSales}</p>
                    </div>
                </div>
            </div>

            {/* Responsive Graph Section */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold text-gray-600 mb-4">Sales Graph</h2>
                <Line data={data} options={options} />
            </div>
        </div>
    );
}
