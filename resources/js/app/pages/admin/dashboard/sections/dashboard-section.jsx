import React, { useState, useEffect } from 'react';
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

export default function AdminDashboard() {
    const [totalAgents, setTotalAgents] = useState(0);
    const [totalIn, setTotalIn] = useState(0);
    const [totalOut, setTotalOut] = useState(0);
    const [totalBreak, setTotalBreak] = useState(0);
    const [totalLunch, setTotalLunch] = useState(0);
    const [totalMeeting, setTotalMeeting] = useState(0);
    const [totalCoaching, setTotalCoaching] = useState(0);
    const [totalFloorSupport, setTotalFloorSupport] = useState(0);
    const [overBreak, setOverBreak] = useState(0);
    const [overLunch, setOverLunch] = useState(0);

    const agentData = {
        totalAgents: 100,
        in: 50,
        out: 20,
        break: 15,
        lunch: 10,
        meeting: 5,
        coaching: 3,
        floorSupport: 2,
        overBreak: 4,
        overLunch: 3,
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

        animateCount(setTotalAgents, agentData.totalAgents);
        animateCount(setTotalIn, agentData.in);
        animateCount(setTotalOut, agentData.out);
        animateCount(setTotalBreak, agentData.break);
        animateCount(setTotalLunch, agentData.lunch);
        animateCount(setTotalMeeting, agentData.meeting);
        animateCount(setTotalCoaching, agentData.coaching);
        animateCount(setTotalFloorSupport, agentData.floorSupport);
        animateCount(setOverBreak, agentData.overBreak);
        animateCount(setOverLunch, agentData.overLunch);
    }, []);

    const graphData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'Overbreak',
                data: [5, 7, 8, 6, 9, 10, 12],
                fill: false,
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgba(255, 99, 132, 0.2)',
            },
            {
                label: 'Overlunch',
                data: [3, 4, 6, 5, 8, 9, 11],
                fill: false,
                backgroundColor: 'rgb(54, 162, 235)',
                borderColor: 'rgba(54, 162, 235, 0.2)',
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
                text: 'Overbreak and Overlunch Trends (Monthly)',
            },
        },
    };

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            <h1 className="text-4xl font-bold mb-10 text-gray-800">Admin Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                {/* Card Component */}
                {[
                    { label: "Total Agents", value: totalAgents, icon: "fas fa-users", color: "blue-500" },
                    { label: "Total Agent In", value: totalIn, icon: "fas fa-user-clock", color: "blue-500" },
                    { label: "Total Agent Out", value: totalOut, icon: "fas fa-user-times", color: "red-500" },
                    { label: "Total Agent on Break", value: totalBreak, icon: "fas fa-coffee", color: "yellow-500" },
                    { label: "Total Agent on Lunch", value: totalLunch, icon: "fas fa-utensils", color: "green-500" },
                    { label: "Total Agent on Meeting", value: totalMeeting, icon: "fas fa-handshake", color: "purple-500" },
                    { label: "Total Agent on Coaching", value: totalCoaching, icon: "fas fa-chalkboard-teacher", color: "orange-500" },
                    { label: "Total Agent on Floor Support", value: totalFloorSupport, icon: "fas fa-headset", color: "teal-500" },
                    { label: "Agent Overbreak", value: overBreak, icon: "fas fa-exclamation-triangle", color: "red-600" },
                    { label: "Agent Overlunch", value: overLunch, icon: "fas fa-exclamation-circle", color: "red-600" },
                ].map((item, index) => (
                    <div key={index} className="bg-white p-6 rounded-lg shadow-md flex items-center transition-transform transform hover:scale-105 hover:shadow-lg">
                        <i className={`${item.icon} fa-2x text-${item.color} mr-4`}></i>
                        <div>
                            <h2 className="text-xl font-semibold text-gray-600">{item.label}</h2>
                            <p className="text-3xl font-bold text-gray-900 mt-2">{item.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Graph */}
            <div className="bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Overbreak & Overlunch Graph (Monthly)</h2>
                <Line data={graphData} options={options} />
            </div>
        </div>
    );
}
