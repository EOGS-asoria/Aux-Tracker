import React, { useState } from "react";
import Table from "@/app/_components/table";
import Button from "@/app/_components/button";
import Input from "@/app/_components/input";
import { PrinterIcon } from '@heroicons/react/24/outline';

// Function to generate predefined history entries with badge classes
const generatePredefinedEntries = () => {
    const badgeClasses = {
        "Clock In": "bg-gray-400/10 text-gray-400 ring-gray-400/20",
        Break: "bg-red-400/10 text-red-400 ring-red-400/20",
        "Lunch In": "bg-yellow-400/10 text-yellow-500 ring-yellow-400/20",
        "Lunch Back": "bg-green-500/10 text-green-400 ring-green-500/20",
        "Meeting In": "bg-blue-400/10 text-blue-400 ring-blue-400/30",
        "Meeting Out": "bg-indigo-400/10 text-indigo-400 ring-indigo-400/30",
        "Clock Out": "bg-purple-400/10 text-purple-400 ring-purple-400/30",
        "Floor Support In": "bg-pink-400/10 text-pink-400 ring-pink-400/20",
        "Floor Support Out": "bg-gray-400/10 text-gray-400 ring-gray-400/20",
        "Coaching In": "bg-yellow-400/10 text-yellow-500 ring-yellow-400/20",
        "Coaching Out": "bg-red-400/10 text-red-400 ring-red-400/20",
    };
    const predefinedEntries = [
        { type: "Clock In", time: "08:00 AM", date: "2024-09-01", duration: "1 hr 30 mins" },
        { type: "Break", time: "10:15 AM", date: "2024-09-10", duration: "15 mins" },
        { type: "Lunch In", time: "12:00 PM", date: "2024-09-15", duration: "1 hr" },
        { type: "Lunch Back", time: "01:00 PM", date: "2024-09-23", duration: "" },
        { type: "Meeting In", time: "03:00 PM", date: "2024-09-30", duration: "30 mins" },
        { type: "Meeting Out", time: "03:30 PM", date: "2024-09-18", duration: "" },
        { type: "Clock Out", time: "05:00 PM", date: "2024-09-02", duration: "" },
        { type: "Floor Support In", time: "08:30 AM", date: "2024-09-06", duration: "1 hr" },
        { type: "Floor Support Out", time: "09:30 AM", date: "2024-09-09", duration: "" },
        { type: "Coaching In", time: "10:00 AM", date: "2024-09-23", duration: "45 mins" },
        { type: "Coaching Out", time: "10:45 AM", date: "2024-09-12", duration: "" },
    ];

    return predefinedEntries.map((entry) => ({
        ...entry,
        badgeClass:
            badgeClasses[entry.type] ||
            "bg-gray-400/10 text-gray-400 ring-gray-400/20",
    }));
};

// Sample history entries with predefined data
const historyEntries = generatePredefinedEntries();

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
        render: (text, entry) => (
            <span
                className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${entry.badgeClass}`}
            >
                {text}
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

export default function HistorySections() {
    const [dataChecked, setDataChecked] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [filterType, setFilterType] = useState("");
    const [filterStartDate, setFilterStartDate] = useState("");
    const [filterEndDate, setFilterEndDate] = useState("");

    // Filter function
    const filteredEntries = historyEntries.filter((entry) => {
        const entryDate = new Date(entry.date);
        const startDate = new Date(filterStartDate);
        const endDate = new Date(filterEndDate);

        const typeMatch = filterType
            ? entry.type.toLowerCase().includes(filterType.toLowerCase())
            : true;
        const startDateMatch = filterStartDate ? entryDate >= startDate : true;
        const endDateMatch = filterEndDate ? entryDate <= endDate : true;

        return typeMatch && startDateMatch && endDateMatch;
    });

    // Calculate start and end index for current page data
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const visibleEntries = filteredEntries.slice(startIndex, endIndex);

    // Function to handle printing
    const handlePrint = () => {
        // Dimensions for the print window
        const width = 1200;
        const height = 800;

        // Get the screen size
        const screenWidth = window.screen.width;
        const screenHeight = window.screen.height;

        // Calculate the position to center the window
        const left = (screenWidth / 2) - (width / 2);
        const top = (screenHeight / 2) - (height / 2);

        // Open the print window at the calculated position
        const printWindow = window.open('', '', `width=${width},height=${height},left=${left},top=${top}`);

        printWindow.document.open();
        printWindow.document.write(`
            <html>
            <head>
                <style>
                    table { width: 100%; border-collapse: collapse; }
                    th, td { border: 1px solid black; padding: 8px; text-align: left; }
                    th { background-color: #f2f2f2; }
                </style>
            </head>
            <body>
                <h1>Michael Johnson's History</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Type</th>
                            <th>Time</th>
                            <th>Date</th>
                            <th>Duration</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${visibleEntries.map(entry => `
                            <tr>
                                <td>${entry.type}</td>
                                <td>${entry.time}</td>
                                <td>${formatDate(entry.date)}</td>
                                <td>${entry.duration ? entry.duration : '-'}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="mb-4">
                <a
                    href="/am/agent"
                    className="text-blue-600 hover:underline flex items-center"
                >
                    ← Back
                </a>
            </div>

            <h1 className="text-4xl font-bold mb-8 text-gray-800">
                Michael Johnson's History
            </h1>

            {/* Filter data */}
            <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
                <div className="flex items-center justify-between mb-4">
                    {/* Centered Filters and Clear Button */}
                    <div className="flex space-x-4 items-center mx-auto">
                        <Input
                            label="Filter by Type"
                            type="text"
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value)}
                            className="border rounded-lg p-2"
                        />
                        <Input
                            type="date"
                            label="Start Date"
                            value={filterStartDate}
                            onChange={(e) => setFilterStartDate(e.target.value)}
                            className="border rounded-lg p-2"
                        />
                        <Input
                            type="date"
                            label="End Date"
                            value={filterEndDate}
                            onChange={(e) => setFilterEndDate(e.target.value)}
                            className="border rounded-lg p-2"
                        />
                        <Button
                            className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                            onClick={() => {
                                setFilterType("");
                                setFilterStartDate("");
                                setFilterEndDate("");
                            }}
                        >
                            Clear
                        </Button>
                    </div>

                    {/* Print Button Aligned to the Right */}
                    <Button
                        className="bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-150 ease-in-out flex items-center space-x-2"
                        onClick={handlePrint}
                    >
                        <PrinterIcon className="h-5 w-5" />
                        <span>Print</span>
                    </Button>
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
                <Table
                    dataChecked={dataChecked}
                    setDataChecked={setDataChecked}
                    data={filteredEntries}
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
