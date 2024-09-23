// import React, { useState } from 'react';
// import Table from '@/app/_components/table';

// export default function LogTableSection() {
//     const [dataChecked, setDataChecked] = useState([]);

//     function handleDelete(log) {
//         alert(`Deleting log: ${log.logName}`);
//     }

//     return (
//         <div className="p-6 bg-gray-100 min-h-screen">
//             <h1 className="text-3xl font-bold mb-8 text-gray-700">Table Logs</h1>
//             <div className="bg-white p-4 rounded-lg shadow-md">
//                 <Table
//                     dataChecked={dataChecked}
//                     setDataChecked={setDataChecked}
//                     data={[
//                         { id: 1, logName: 'System Boot', timestamp: '2024-08-29 08:32:45', status: 'Success', user: 'Admin', details: 'System booted successfully' },
//                         { id: 2, logName: 'User Login', timestamp: '2024-08-29 09:15:22', status: 'Failed', user: 'jdoe', details: 'Incorrect password' },
//                         { id: 3, logName: 'File Upload', timestamp: '2024-08-29 10:45:10', status: 'Success', user: 'jsmith', details: 'Uploaded project files' },
//                         { id: 4, logName: 'System Update', timestamp: '2024-08-29 11:00:00', status: 'Success', user: 'Admin', details: 'System updated to version 1.0.1' },
//                         { id: 5, logName: 'User Logout', timestamp: '2024-08-29 12:30:20', status: 'Success', user: 'jsmith', details: 'User logged out' },
//                         { id: 6, logName: 'Password Change', timestamp: '2024-08-29 13:22:11', status: 'Success', user: 'jdoe', details: 'Password changed successfully' },
//                         { id: 7, logName: 'User Registration', timestamp: '2024-08-29 14:45:35', status: 'Success', user: 'nwhite', details: 'New user registered' },
//                         { id: 8, logName: 'Data Backup', timestamp: '2024-08-29 15:00:45', status: 'Success', user: 'Admin', details: 'Backup completed' },
//                         { id: 9, logName: 'File Deletion', timestamp: '2024-08-29 16:10:00', status: 'Failed', user: 'jsmith', details: 'Unauthorized file deletion attempt' },
//                         { id: 10, logName: 'System Shutdown', timestamp: '2024-08-29 17:30:55', status: 'Success', user: 'Admin', details: 'System shutdown initiated' },
//                     ]}
//                     columns={[
//                         {
//                             title: "Log Name",
//                             key: "logName",
//                         },
//                         {
//                             title: "Timestamp",
//                             key: "timestamp",
//                         },
//                         {
//                             title: "Status",
//                             key: "status",
//                             render: (text) => (
//                                 <span
//                                     className={`px-2 py-1 rounded-full text-sm font-semibold ${text === 'Success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
//                                 >
//                                     {text}
//                                 </span>
//                             )
//                         },
//                         {
//                             title: "User",
//                             key: "user",
//                         },
//                         {
//                             title: "Details",
//                             key: "details",
//                         },
//                         // {
//                         //     title: "Action",
//                         //     key: "action",
//                         //     render: (_, record) => (
//                         //         <div className="flex space-x-4">
//                         //             <button onClick={() => handleView(record)} className="text-blue-500 hover:underline">View</button>
//                         //             <button onClick={() => handleDelete(record)} className="text-red-500 hover:underline">Delete</button>
//                         //         </div>
//                         //     )
//                         // }
//                     ]}
//                     isCheckbox={true}
//                 />
//             </div>
//         </div>
//     );
// }

import React, { useState } from "react";
import Table from "@/app/_components/table";
import Button from "@/app/_components/button";
import Input from "@/app/_components/input";
import { PrinterIcon } from "@heroicons/react/24/outline";

const logs = [
    {
        id: 1,
        logName: "Clock In",
        timestamp: "2024-09-01 08:30:00",
        status: "Success",
        account: "AM",
        details: "Clocked in for the day",
    },
    {
        id: 2,
        logName: "Break Start",
        timestamp: "2024-09-01 10:15:00",
        status: "Success",
        account: "AM",
        details: "Started 15-minute break",
    },
    {
        id: 3,
        logName: "Break End",
        timestamp: "2024-09-01 10:30:00",
        status: "Success",
        account: "AM",
        details: "Returned from 15-minute break",
    },
    {
        id: 4,
        logName: "Lunch Start",
        timestamp: "2024-09-01 12:00:00",
        status: "Success",
        account: "AM",
        details: "Started lunch break",
    },
    {
        id: 5,
        logName: "Lunch End",
        timestamp: "2024-09-01 12:30:00",
        status: "Success",
        account: "AM",
        details: "Returned from lunch break",
    },
    {
        id: 6,
        logName: "Clock Out",
        timestamp: "2024-09-01 17:00:00",
        status: "Success",
        account: "AM",
        details: "Clocked out for the day",
    },
    {
        id: 7,
        logName: "Clock In",
        timestamp: "2024-09-02 08:35:00",
        status: "Success",
        account: "AM",
        details: "Clocked in for the day",
    },
    {
        id: 8,
        logName: "Break Start",
        timestamp: "2024-09-02 10:20:00",
        status: "Success",
        account: "AM",
        details: "Started 15-minute break",
    },
    {
        id: 9,
        logName: "Break End",
        timestamp: "2024-09-02 10:35:00",
        status: "Success",
        account: "AM",
        details: "Returned from 15-minute break",
    },
];

export default function LogTableSection() {
    const [dataChecked, setDataChecked] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    // Filter states
    const [filterName, setFilterName] = useState("");
    const [filterStartDate, setFilterStartDate] = useState("");
    const [filterEndDate, setFilterEndDate] = useState("");

    // Filter function
    const filteredLogs = logs.filter((log) => {
        const logDate = new Date(log.timestamp.split(" ")[0]);
        const startDate = filterStartDate
            ? new Date(filterStartDate)
            : new Date(-8640000000000000); // Earliest date
        const endDate = filterEndDate ? new Date(filterEndDate) : new Date();

        const nameMatch = filterName
            ? log.logName.toLowerCase().includes(filterName.toLowerCase())
            : true;
        const dateMatch = logDate >= startDate && logDate <= endDate;

        return nameMatch && dateMatch;
    });

    function handlePrint() {
        // Dimensions for the print window
        const width = 1200;
        const height = 800;

        // Get the screen size
        const screenWidth = window.screen.width;
        const screenHeight = window.screen.height;

        // Calculate the position to center the window
        const left = screenWidth / 2 - width / 2;
        const top = screenHeight / 2 - height / 2;

        // Open the print window at the calculated position
        const printWindow = window.open(
            "",
            "",
            `width=${width},height=${height},left=${left},top=${top}`
        );

        // Prepare the HTML content for printing
        const htmlContent = `
                            <html>
                            <head>
                                <title>Print Logs</title>
                                <style>
                                    body { font-family: Arial, sans-serif; margin: 20px; }
                                    table { width: 100%; border-collapse: collapse; }
                                    th, td { border: 1px solid black; padding: 8px; text-align: left; }
                                    th { background-color: #f2f2f2; }
                                    .success { background-color: #d4edda; color: #155724; }
                                    .failed { background-color: #f8d7da; color: #721c24; }
                                    h1 { text-align: center; margin-bottom: 20px; }
                                </style>
                            </head>
                            <body>
                                <h1>Logs Report</h1>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Log Name</th>
                                            <th>Timestamp</th>
                                            <th>Status</th>
                                            <th>account</th>
                                            <th>Details</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        ${filteredLogs
                .map(
                    (log) => `
                                            <tr>
                                                <td>${log.logName}</td>
                                                <td>${log.timestamp}</td>
                                                <td class="${log.status === "Success"
                            ? "success"
                            : "failed"
                        }">${log.status}</td>
                                                <td>${log.account}</td>
                                                <td>${log.details}</td>
                                            </tr>
                                        `
                )
                .join("")}
                                    </tbody>
                                </table>
                            </body>
                            </html>
                        `;

        // Write the HTML content to the new window
        printWindow.document.open();
        printWindow.document.write(htmlContent);
        printWindow.document.close();

        // Focus on the print window and trigger the print dialog
        printWindow.focus();
        printWindow.print();
    }

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {/* <div className="mb-4">
                <a className="text-blue-600 hover:underline flex items-center">
                    ← Back
                </a>
            </div> */}

            <h1 className="text-4xl font-bold mb-8 text-gray-800">
                Log History
            </h1>

            {/* Filter Section */}
            <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
                <div className="flex items-center justify-between mb-4">
                    {/* Centered Filters and Clear Button */}
                    <div className="flex space-x-4 items-center mx-auto">
                        <Input
                            label="Filter by Name"
                            type="text"
                            value={filterName}
                            onChange={(e) => setFilterName(e.target.value)}
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
                                setFilterName("");
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
                    data={filteredLogs}
                    columns={[
                        {
                            title: "Log Name",
                            key: "logName",
                        },
                        {
                            title: "Timestamp",
                            key: "timestamp",
                        },
                        {
                            title: "Status",
                            key: "status",
                            render: (text) => (
                                <span
                                    className={`px-2 py-1 rounded-full text-sm font-semibold ${text === "Success"
                                        ? "bg-green-100 text-green-800"
                                        : "bg-red-100 text-red-800"
                                        }`}
                                >
                                    {text}
                                </span>
                            ),
                        },
                        {
                            title: "account",
                            key: "account",
                        },
                        {
                            title: "Details",
                            key: "details",
                        },
                    ]}
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
