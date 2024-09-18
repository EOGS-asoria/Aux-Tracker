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
        logName: "System Boot",
        timestamp: "2024-09-01 08:32:45",
        status: "Success",
        account: "AM",
        details: "System booted successfully",
    },
    {
        id: 2,
        logName: "User Login",
        timestamp: "2024-09-01 09:15:22",
        status: "Failed",
        account: "AM",
        details: "Incorrect password",
    },
    {
        id: 3,
        logName: "File Upload",
        timestamp: "2024-09-01 10:45:10",
        status: "Success",
        account: "AM",
        details: "Uploaded project files",
    },
    {
        id: 4,
        logName: "System Update",
        timestamp: "2024-09-01 11:00:00",
        status: "Success",
        account: "AM",
        details: "System updated to version 1.0.1",
    },
    {
        id: 5,
        logName: "User Logout",
        timestamp: "2024-09-01 12:30:20",
        status: "Success",
        account: "AM",
        details: "User logged out",
    },
    {
        id: 6,
        logName: "Password Change",
        timestamp: "2024-09-01 13:22:11",
        status: "Success",
        account: "AM",
        details: "Password changed successfully",
    },
    {
        id: 7,
        logName: "User Registration",
        timestamp: "2024-09-02 14:45:35",
        status: "Success",
        account: "AM",
        details: "New user registered",
    },
    {
        id: 8,
        logName: "Data Backup",
        timestamp: "2024-09-02 15:00:45",
        status: "Success",
        account: "AM",
        details: "Backup completed",
    },
    {
        id: 9,
        logName: "File Deletion",
        timestamp: "2024-09-02 16:10:00",
        status: "Failed",
        account: "AM",
        details: "Unauthorized file deletion attempt",
    },
    {
        id: 10,
        logName: "System Shutdown",
        timestamp: "2024-09-02 17:30:55",
        status: "Success",
        account: "AM",
        details: "System shutdown initiated",
    },
    {
        id: 11,
        logName: "Network Issue",
        timestamp: "2024-09-03 18:20:00",
        status: "Failed",
        account: "AM",
        details: "Network connection lost",
    },
    {
        id: 12,
        logName: "Software Installation",
        timestamp: "2024-09-03 19:05:33",
        status: "Success",
        account: "AM",
        details: "Installed software XYZ",
    },
    {
        id: 13,
        logName: "Server Restart",
        timestamp: "2024-09-04 08:00:12",
        status: "Success",
        account: "AM",
        details: "Server restarted successfully",
    },
    {
        id: 14,
        logName: "User Account Lockout",
        timestamp: "2024-09-04 09:45:00",
        status: "Failed",
        account: "AM",
        details: "Account locked due to multiple failed login attempts",
    },
    {
        id: 15,
        logName: "Database Update",
        timestamp: "2024-09-04 10:20:30",
        status: "Success",
        account: "AM",
        details: "Database updated successfully",
    },
    {
        id: 16,
        logName: "Email Notification",
        timestamp: "2024-09-04 11:05:10",
        status: "Success",
        account: "AM",
        details: "Notification email sent",
    },
    {
        id: 17,
        logName: "File Download",
        timestamp: "2024-09-05 12:15:45",
        status: "Success",
        account: "AM",
        details: "Downloaded report file",
    },
    {
        id: 18,
        logName: "User Role Change",
        timestamp: "2024-09-05 13:40:00",
        status: "Success",
        account: "AM",
        details: "User role changed to Manager",
    },
    {
        id: 19,
        logName: "Security Alert",
        timestamp: "2024-09-05 14:55:22",
        status: "Failed",
        account: "AM",
        details: "Suspicious activity detected",
    },
    {
        id: 20,
        logName: "API Request",
        timestamp: "2024-09-05 15:25:00",
        status: "Success",
        account: "AM",
        details: "API request processed",
    },
    {
        id: 21,
        logName: "Configuration Change",
        timestamp: "2024-09-06 09:30:00",
        status: "Success",
        account: "AM",
        details: "Configuration settings updated",
    },
    {
        id: 22,
        logName: "System Upgrade",
        timestamp: "2024-09-06 10:45:00",
        status: "Success",
        account: "AM",
        details: "System upgraded to version 2.1.0",
    },
    {
        id: 23,
        logName: "Login Attempt",
        timestamp: "2024-09-06 11:55:00",
        status: "Failed",
        account: "AM",
        details: "Login attempt failed due to incorrect credentials",
    },
    {
        id: 24,
        logName: "Data Export",
        timestamp: "2024-09-07 12:15:00",
        status: "Success",
        account: "AM",
        details: "Data exported to CSV",
    },
    {
        id: 25,
        logName: "Access Denied",
        timestamp: "2024-09-07 13:20:00",
        status: "Failed",
        account: "AM",
        details: "Access denied to restricted area",
    },
    {
        id: 26,
        logName: "Password Reset",
        timestamp: "2024-09-07 14:30:00",
        status: "Success",
        account: "AM",
        details: "Password reset successfully",
    },
    {
        id: 27,
        logName: "System Maintenance",
        timestamp: "2024-09-08 15:40:00",
        status: "Success",
        account: "AM",
        details: "System maintenance completed successfully",
    },
    {
        id: 28,
        logName: "Service Restart",
        timestamp: "2024-09-08 16:50:00",
        status: "Success",
        account: "AM",
        details: "Service restarted successfully",
    },
    {
        id: 29,
        logName: "Audit Log",
        timestamp: "2024-09-08 17:55:00",
        status: "Success",
        account: "AM",
        details: "Audit log reviewed",
    },
    {
        id: 30,
        logName: "User Feedback",
        timestamp: "2024-09-08 18:20:00",
        status: "Success",
        account: "AM",
        details: "User feedback collected",
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
                                                <td class="${
                                                    log.status === "Success"
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
            <div className="mb-4">
                <a
                    href="/om/team"
                    className="text-blue-600 hover:underline flex items-center"
                >
                    ← Back
                </a>
            </div>

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
                                    className={`px-2 py-1 rounded-full text-sm font-semibold ${
                                        text === "Success"
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
