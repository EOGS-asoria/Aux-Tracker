import React, { useState, useEffect } from 'react';

export default function AgentDashboard() {
    const [status, setStatus] = useState('Active'); // Current status of the agent
    const [timeIn, setTimeIn] = useState(''); // Time In
    const [breakTime, setBreakTime] = useState(''); // Break
    const [lunchTime, setLunchTime] = useState(''); // Lunch
    const [timeOut, setTimeOut] = useState(''); // Time Out

    const agentData = {
        timeIn: '9:00 AM',
        break: '10:30 AM',
        lunch: '12:00 PM',
        timeOut: '6:00 PM'
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
                setter(endValue);
            }, 20);
        };

        animateCount(setTimeIn, agentData.timeIn);
        animateCount(setBreakTime, agentData.break);
        animateCount(setLunchTime, agentData.lunch);
        animateCount(setTimeOut, agentData.timeOut);
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 p-8"> 
            <h1 className="text-4xl font-bold mb-10 text-gray-800">Agent Dashboard</h1>

            {/* Time Tracking Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                {/* Time In */}
                <div className="bg-white p-6 rounded-lg shadow-md flex items-center transition-transform transform hover:scale-105 hover:shadow-lg">
                    <i className="fas fa-user-clock fa-2x text-blue-500 mr-4"></i>
                    <div>
                        <h2 className="text-xl font-semibold text-gray-600">Time In</h2>
                        <p className="text-3xl font-bold text-gray-900 mt-2">{timeIn}</p>
                    </div>
                </div>

                {/* Break */}
                <div className="bg-white p-6 rounded-lg shadow-md flex items-center transition-transform transform hover:scale-105 hover:shadow-lg">
                    <i className="fas fa-coffee fa-2x text-yellow-500 mr-4"></i>
                    <div>
                        <h2 className="text-xl font-semibold text-gray-600">Break</h2>
                        <p className="text-3xl font-bold text-gray-900 mt-2">{breakTime}</p>
                    </div>
                </div>

                {/* Lunch */}
                <div className="bg-white p-6 rounded-lg shadow-md flex items-center transition-transform transform hover:scale-105 hover:shadow-lg">
                    <i className="fas fa-utensils fa-2x text-green-500 mr-4"></i>
                    <div>
                        <h2 className="text-xl font-semibold text-gray-600">Lunch</h2>
                        <p className="text-3xl font-bold text-gray-900 mt-2">{lunchTime}</p>
                    </div>
                </div>

                {/* Time Out */}
                <div className="bg-white p-6 rounded-lg shadow-md flex items-center transition-transform transform hover:scale-105 hover:shadow-lg">
                    <i className="fas fa-user-times fa-2x text-red-500 mr-4"></i>
                    <div>
                        <h2 className="text-xl font-semibold text-gray-600">Time Out</h2>
                        <p className="text-3xl font-bold text-gray-900 mt-2">{timeOut}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
