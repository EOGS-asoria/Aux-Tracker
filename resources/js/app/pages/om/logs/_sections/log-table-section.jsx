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



import React, { useState } from 'react';
import Table from '@/app/_components/table';

export default function LogTableSection() {
    const [dataChecked, setDataChecked] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

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
                        { id: 11, logName: 'Network Issue', timestamp: '2024-08-29 18:20:00', status: 'Failed', user: 'nwhite', details: 'Network connection lost' },
                        { id: 12, logName: 'Software Installation', timestamp: '2024-08-29 19:05:33', status: 'Success', user: 'jdoe', details: 'Installed software XYZ' },
                        { id: 13, logName: 'Server Restart', timestamp: '2024-08-30 08:00:12', status: 'Success', user: 'Admin', details: 'Server restarted successfully' },
                        { id: 14, logName: 'User Account Lockout', timestamp: '2024-08-30 09:45:00', status: 'Failed', user: 'jsmith', details: 'Account locked due to multiple failed login attempts' },
                        { id: 15, logName: 'Database Update', timestamp: '2024-08-30 10:20:30', status: 'Success', user: 'Admin', details: 'Database updated successfully' },
                        { id: 16, logName: 'Email Notification', timestamp: '2024-08-30 11:05:10', status: 'Success', user: 'jdoe', details: 'Notification email sent' },
                        { id: 17, logName: 'File Download', timestamp: '2024-08-30 12:15:45', status: 'Success', user: 'nwhite', details: 'Downloaded report file' },
                        { id: 18, logName: 'User Role Change', timestamp: '2024-08-30 13:40:00', status: 'Success', user: 'Admin', details: 'User role changed to Manager' },
                        { id: 19, logName: 'Security Alert', timestamp: '2024-08-30 14:55:22', status: 'Failed', user: 'jsmith', details: 'Suspicious activity detected' },
                        { id: 20, logName: 'API Request', timestamp: '2024-08-30 15:25:00', status: 'Success', user: 'jdoe', details: 'API request processed' },
                        { id: 21, logName: 'System Maintenance', timestamp: '2024-08-30 16:05:35', status: 'Success', user: 'Admin', details: 'System maintenance completed' },
                        { id: 22, logName: 'Login Attempt', timestamp: '2024-08-30 17:20:11', status: 'Failed', user: 'nwhite', details: 'Failed login attempt' },
                        { id: 23, logName: 'Password Reset', timestamp: '2024-08-30 18:30:25', status: 'Success', user: 'jsmith', details: 'Password reset successfully' },
                        { id: 24, logName: 'File Upload', timestamp: '2024-08-30 19:10:45', status: 'Success', user: 'jdoe', details: 'Uploaded user data' },
                        { id: 25, logName: 'Backup Verification', timestamp: '2024-08-31 08:05:00', status: 'Success', user: 'Admin', details: 'Backup verification completed' },
                        { id: 26, logName: 'Software Update', timestamp: '2024-08-31 09:15:35', status: 'Success', user: 'nwhite', details: 'Software updated to latest version' },
                        { id: 27, logName: 'Failed Payment', timestamp: '2024-08-31 10:25:00', status: 'Failed', user: 'jdoe', details: 'Payment transaction failed' },
                        { id: 28, logName: 'Data Import', timestamp: '2024-08-31 11:40:00', status: 'Success', user: 'jsmith', details: 'Imported data from CSV file' },
                        { id: 29, logName: 'Account Deletion', timestamp: '2024-08-31 12:50:25', status: 'Success', user: 'Admin', details: 'User account deleted' },
                        { id: 30, logName: 'System Upgrade', timestamp: '2024-08-31 14:05:55', status: 'Success', user: 'Admin', details: 'System upgraded to version 2.0.0' }
                    ]
                    }
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
                    rowsPerPage={rowsPerPage}
                    setRowsPerPage={setRowsPerPage}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            </div>
        </div>
    );
}
