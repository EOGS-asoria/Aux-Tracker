import React, { useState, useEffect } from 'react';

export default function AgentDashboard() {
    const [status, setStatus] = useState('Active'); // Current status of the agent
    const [timeIn, setTimeIn] = useState(''); // Time In
    const [breakTime, setBreakTime] = useState(''); // Break
    const [lunchTime, setLunchTime] = useState(''); // Lunch
    const [timeOut, setTimeOut] = useState(''); // Time Out

    useEffect(() => {
        // Simulate fetching data for the agent's dashboard (example times, replace with real data)
        setTimeIn('9:00 AM');
        setBreakTime('10:30 AM');
        setLunchTime('12:00 PM');
        setTimeOut('6:00 PM');
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            {/* Navbar with Current Status */}
            <nav className="bg-white shadow-md p-6 rounded-lg mb-8">
                <h1 className="text-3xl font-bold text-gray-700">Agent Dashboard</h1>
                <div className="mt-4">
                    <p className="text-xl text-gray-600">
                        Current Status: <span className="font-bold text-blue-600">{status}</span>
                    </p>
                    <div className="flex gap-2 mt-2">
                        
                
                    </div>
                </div>
            </nav>

            {/* Time Tracking Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Time In */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold text-gray-600">Time In</h2>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{timeIn}</p>
                </div>

                {/* Break */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold text-gray-600">Break</h2>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{breakTime}</p>
                </div>

                {/* Lunch */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold text-gray-600">Lunch</h2>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{lunchTime}</p>
                </div>

                {/* Time Out */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold text-gray-600">Time Out</h2>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{timeOut}</p>
                </div>
            </div>
        </div>
    );
}
