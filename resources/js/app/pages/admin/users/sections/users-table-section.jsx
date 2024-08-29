import React, { useState } from 'react';
import Table from '@/app/_components/table';

export default function UsersTableSection() {
    const [dataChecked, setDataChecked] = useState([]);

    function clickMe(params) {
        alert()
    }
    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-8 text-gray-700">Users</h1>
            <div className="bg-white p-4 rounded-lg shadow-md">
                <Table
                    dataChecked={dataChecked}
                    setDataChecked={setDataChecked}
                    data={[
                        { id: 1, name: 'John Doe', position: 'Developer', year: '1993', status: 'Active', assignedTickets: 5, action: 'delete' },
                        { id: 2, name: 'Jane Smith', position: 'Designer', year: '1996', status: 'Inactive', assignedTickets: 2, action: 'delete' },
                        // Add more user data as needed
                    ]}
                    columns={[
                        {
                            title: "Name",
                            key: "name",
                            render: (text, record) => (
                                <div className="flex items-center">
                                    <img
                                        src={`https://i.pravatar.cc/40?img=${record.id}`}
                                        alt={record.name}
                                        className="h-10 w-10 rounded-full mr-3"
                                    />
                                    <span>{record.name}</span>
                                </div>
                            )
                        },
                        {
                            title: "Position",
                            key: "position",
                        },
                        {
                            title: "Year",
                            key: "year",
                        },
                        {
                            title: "Status",
                            key: "status",
                            render: (text) => (
                                <span
                                    className={`px-2 py-1 rounded-full text-sm font-semibold ${text === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                        }`}
                                >
                                    {text}
                                </span>
                            )
                        },
                        {
                            title: "Assigned Tickets",
                            key: "assignedTickets",
                            render: (text) => <span>{text}</span>
                        },
                        {
                            title: "Action",
                            key: "action",
                            render: (_, record) => (
                                <div className="flex space-x-4">
                                    <button onClick={() => clickMe()} className="text-blue-500 hover:underline">Edit</button>
                                    <button onClick={() => clickMe()} className="text-red-500 hover:underline">Delete</button>
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
