import React, { useState, useEffect } from "react";

const TimeCard = ({ iconClass, color, title, time }) => (
    <div className="bg-white p-6 rounded-lg shadow-lg flex items-center transition-transform transform hover:scale-105 hover:shadow-2xl border border-gray-200">
        <div className={`p-4 rounded-full ${color} bg-opacity-10 mr-4`}>
            <i className={`${iconClass} fa-2x ${color}`}></i>
        </div>
        <div>
            <h2 className="text-xl font-semibold text-gray-700">{title}</h2>
            <p className="text-3xl font-bold text-gray-900 mt-2">{time}</p>
        </div>
    </div>
);

export default function AgentDashboard() {
    const [status, setStatus] = useState("Active"); // Current status of the agent
    const [timeIn, setTimeIn] = useState(""); // Time In
    const [breakTime, setBreakTime] = useState(""); // Break
    const [lunchTime, setLunchTime] = useState(""); // Lunch
    const [timeOut, setTimeOut] = useState(""); // Time Out

    const agentData = {
        timeIn: "9:00 AM",
        break: "10:30 AM",
        lunch: "12:00 PM",
        timeOut: "6:00 PM",
    };

    useEffect(() => {
        const animateCount = (setter, endValue) => {
            let startValue = "";
            let index = 0;
            const interval = setInterval(() => {
                if (index >= endValue.length) {
                    clearInterval(interval);
                    setter(endValue);
                } else {
                    startValue += endValue[index];
                    setter(startValue);
                    index++;
                }
            }, 100); // Adjust timing for smoother animation
        };

        // Simulate fetching data
        animateCount(setTimeIn, agentData.timeIn);
        animateCount(setBreakTime, agentData.break);
        animateCount(setLunchTime, agentData.lunch);
        animateCount(setTimeOut, agentData.timeOut);
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-4xl font-bold mb-12 text-gray-800">
                Agent Dashboard
            </h1>

            {/* Time Tracking Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                <TimeCard
                    iconClass="fas fa-user-clock"
                    color="text-blue-500"
                    title="Time In"
                    time={timeIn}
                />
                <TimeCard
                    iconClass="fas fa-coffee"
                    color="text-yellow-500"
                    title="Break"
                    time={breakTime}
                />
                <TimeCard
                    iconClass="fas fa-utensils"
                    color="text-green-500"
                    title="Lunch"
                    time={lunchTime}
                />
                <TimeCard
                    iconClass="fas fa-user-times"
                    color="text-red-500"
                    title="Time Out"
                    time={timeOut}
                />
            </div>

            <div className="flex justify-center">
                <img
                    src="/images/call_center_dashboard_agent.jpg"
                    alt="Call Center Dashboard Agent"
                    className="rounded-lg shadow-lg w-full max-w-xl"
                />
            </div>
        </div>
    );
}
