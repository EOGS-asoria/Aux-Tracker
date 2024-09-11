import React, { useState } from "react";
import Table from "@/app/_components/table";
import Button from "@/app/_components/button";

// Sample history entries for Michael Johnson
const historyEntries = [
    { id: 1, type: "Clock In", time: "08:00 AM", date: "2024-09-10" },
    {
        id: 2,
        type: "Break",
        time: "10:00 AM",
        duration: "15 mins",
        date: "2024-09-10",
    },
    { id: 3, type: "Back", time: "10:15 AM", date: "2024-09-10" },
    { id: 4, type: "Lunch In", time: "12:00 PM", date: "2024-09-10" },
    { id: 5, type: "Lunch Back", time: "01:00 PM", date: "2024-09-10" },
    { id: 6, type: "Meeting In", time: "02:00 PM", date: "2024-09-10" },
    { id: 7, type: "Meeting Out", time: "03:00 PM", date: "2024-09-10" },
    { id: 8, type: "Coaching In", time: "03:30 PM", date: "2024-09-10" },
    { id: 9, type: "Coaching Out", time: "04:00 PM", date: "2024-09-10" },
    { id: 10, type: "Floor Support In", time: "04:15 PM", date: "2024-09-10" },
    { id: 11, type: "Floor Support Out", time: "05:00 PM", date: "2024-09-10" },
    { id: 12, type: "Clock Out", time: "05:30 PM", date: "2024-09-10" },
];

// Function to format the date
const formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
};

// Define columns for the table
const columns = [
    {
        title: "Type",
        key: "type",
        render: (text, record) => (
            <span
                className={`text-sm font-semibold ${getColorClass(
                    record.type
                )}`}
            >
                {record.type}
            </span>
        ),
    },
    {
        title: "Time",
        key: "time",
    },
    {
        title: "Date",
        key: "date",
        render: (text) => formatDate(text),
    },
    {
        title: "Duration",
        key: "duration",
        render: (text) => (text ? text : "-"),
    },
];

// Function to get color and background color based on entry type
const getColorClass = (type) => {
    switch (type) {
        case "Clock In":
            return "text-blue-600 bg-blue-100";
        case "Clock Out":
        case "Back":
        case "Lunch Back":
        case "Meeting Out":
        case "Coaching Out":
        case "Floor Support Out":
            return "text-gray-600 bg-gray-100";
        case "Break":
            return "text-yellow-600 bg-yellow-100";
        case "Lunch In":
            return "text-red-600 bg-red-100";
        case "Meeting In":
            return "text-green-600 bg-green-100";
        case "Coaching In":
            return "text-orange-600 bg-orange-100";
        case "Floor Support In":
            return "text-teal-600 bg-teal-100";
        default:
            return "text-gray-700 bg-gray-50";
    }
};

export default function HistorySections() {
    const [dataChecked, setDataChecked] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="mb-4">
                <a
                    href="/Operations-Manager/Team"
                    className="text-blue-600 hover:underline flex items-center"
                >
                    ← Back
                </a>
            </div>

            <h1 className="text-4xl font-bold mb-8 text-gray-800">
                Michael Johnson's History
            </h1>

            <div className="bg-white p-6 rounded-lg shadow-lg">
                <Table
                    dataChecked={dataChecked}
                    setDataChecked={setDataChecked}
                    data={historyEntries}
                    columns={columns}
                    isCheckbox={true}
                    rowsPerPage={rowsPerPage}
                    setRowsPerPage={setRowsPerPage}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            </div>
        </div>
    );
}
