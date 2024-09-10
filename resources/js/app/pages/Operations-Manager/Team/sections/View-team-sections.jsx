import React, { useState } from "react";
import Table from "@/app/_components/table";

export default function ViewTeamSections() {
    // Declare necessary states
    const [dataChecked, setDataChecked] = useState([]);
    const [agents, setAgents] = useState([
        {
            id: 1,
            name: "Michael Johnson",
            role: "Support Agent",
            joinedYear: 2018,
            status: "InActive",
        },
        {
            id: 2,
            name: "Samantha Green",
            role: "Senior Support Agent",
            joinedYear: 2019,
            status: "Active",
        },
        {
            id: 3,
            name: "David Brown",
            role: "Junior Agent",
            joinedYear: 2020,
            status: "Active",
        },
        // Add more agents as needed
    ]);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="mb-4">
                <a
                    href="/Operations-Manager/agent"
                    className="text-blue-500 hover:underline flex items-center"
                >
                    ← Back
                </a>
            </div>

            <h1 className="text-3xl font-bold mb-8 text-gray-700">
                Team Agent Of Alice Smith
            </h1>

            <Table
                dataChecked={dataChecked}
                setDataChecked={setDataChecked}
                data={agents} // Pass original agents data
                columns={[
                    {
                        title: "Agent Name",
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
                        ),
                    },
                    {
                        title: "Role",
                        key: "role",
                    },
                    {
                        title: "Joined Year",
                        key: "joinedYear",
                    },
                    {
                        title: "Status",
                        key: "status",
                        render: (text) => (
                            <span
                                className={`px-2 py-1 rounded-full text-sm font-semibold ${
                                    text === "Active"
                                        ? "bg-green-100 text-green-800"
                                        : "bg-red-100 text-red-800"
                                }`}
                            >
                                {text}
                            </span>
                        ),
                    },
                    {
                        title: "Action",
                        key: "action",
                        render: (_, record) => (
                            <div className="flex space-x-4">
                                <a
                                    href="/Operations-Manager/Team"
                                    className="ml-1 text-blue-500 hover:underline"
                                >
                                    View Agent History
                                </a>
                            </div>
                        ),
                    },
                ]}
                isCheckbox={true}
                rowsPerPage={rowsPerPage}
                setRowsPerPage={setRowsPerPage}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
        </div>
    );
}
