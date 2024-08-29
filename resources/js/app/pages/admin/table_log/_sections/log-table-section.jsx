import React, { useState } from 'react';
import Table from '@/app/_components/table';

export default function LogTableSection() {
    const [dataChecked, setDataChecked] = useState([]);

    function handleView(log) {
        alert(`Viewing log: ${log.logName}`);
    }

    function handleDelete(log) {
        alert(`Deleting log: ${log.logName}`);
    }

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-8 text-gray-700">Table Logs</h1>
            <div className="bg-white p-4 rounded-lg shadow-md">
                <Table
                    dataChecked={dataChecked}
                    setDataChecked={setDataChecked}
                    data={[
                        { id: 1, logName: 'System Boot', timestamp: '2024-08-29 08:32:45', status: 'Success', user: 'Admin', details: 'System booted successfully' },
                        { id: 2, logName: 'User Login', timestamp: '2024-08-29 09:15:22', status: 'Failed', user: 'jdoe', details: 'Incorrect password' },
                        { id: 3, logName: 'File Upload', timestamp: '2024-08-29 10:45:10', status: 'Success', user: 'jsmith', details: 'Uploaded project files' },
                        { id: 4, logName: 'System Update', timestamp: '2024-08-29 11:00:00', status: 'Success', user: 'Admin', details: 'System updated to version 1.0.1' },
                        { id: 5, logName: 'User Logout', timestamp: '2024-08-29 12:30:20', status: 'Success', user: 'jsmith', details: 'User logged out' },
                        { id: 6, logName: 'Password Change', timestamp: '2024-08-29 13:22:11', status: 'Success', user: 'jdoe', details: 'Password changed successfully' },
                        { id: 7, logName: 'User Registration', timestamp: '2024-08-29 14:45:35', status: 'Success', user: 'nwhite', details: 'New user registered' },
                        { id: 8, logName: 'Data Backup', timestamp: '2024-08-29 15:00:45', status: 'Success', user: 'Admin', details: 'Backup completed' },
                        { id: 9, logName: 'File Deletion', timestamp: '2024-08-29 16:10:00', status: 'Failed', user: 'jsmith', details: 'Unauthorized file deletion attempt' },
                        { id: 10, logName: 'System Shutdown', timestamp: '2024-08-29 17:30:55', status: 'Success', user: 'Admin', details: 'System shutdown initiated' },
                    ]}
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
                                    className={`px-2 py-1 rounded-full text-sm font-semibold ${text === 'Success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                                >
                                    {text}
                                </span>
                            )
                        },
                        {
                            title: "User",
                            key: "user",
                        },
                        {
                            title: "Details",
                            key: "details",
                        },
                        {
                            title: "Action",
                            key: "action",
                            render: (_, record) => (
                                <div className="flex space-x-4">
                                    <button onClick={() => handleView(record)} className="text-blue-500 hover:underline">View</button>
                                    <button onClick={() => handleDelete(record)} className="text-red-500 hover:underline">Delete</button>
                                </div>
                            )
                        }
                    ]}
                    isCheckbox={true}
                />
            </div>
        </div>
    );
}
