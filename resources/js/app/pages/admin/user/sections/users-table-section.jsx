            import React, { useState, useEffect } from "react";
            import Table from "@/app/_components/table";
            import axios from "axios";
            import { useSelector } from "react-redux";

            export default function AgentsTableSection() {
                const [dataChecked, setDataChecked] = useState([]);
                const [rowsPerPage, setRowsPerPage] = useState(10);
                const [currentPage, setCurrentPage] = useState(1);
                const [agents, setAgents] = useState([]);

                useEffect(() => {
                    fetchAgents();
                    fetchAccounts();
                    fetchSites();
                }, []);

                const fetchAgents = async () => {
                    const response = await axios.get("/api/agents");
                    setAgents(response.data);
                };


                const fetchAccounts = async () => {
                    try {
                        const response = await axios.get("/api/accounts");
                        setAccounts(response.data);
                        console.log("Fetched accounts:", response.data);
                    } catch (error) {
                        console.error("Error fetching accounts:", error);
                    }
                };

                const fetchSites = async () => {
                    try {
                        const response = await axios.get("/api/sites");
                        setSites(response.data);
                    } catch (error) {
                        console.error("Error fetching sites:", error);
                    }
                };



            


                const handleStatusChange = async (agentId, currentStatus) => {
                    const newStatus = currentStatus === "Active" ? "Inactive" : "Active";
                    await axios.put(`/api/agents/${agentId}`, { status: newStatus });
                    setAgents((prevAgents) =>
                        prevAgents.map((agent) =>
                            agent.id === agentId ? { ...agent, status: newStatus } : agent
                        )
                    );
                };

                return (
                
                        <div className="bg-white p-4 rounded-lg shadow-md">
                            
                            <Table
                                dataChecked={dataChecked}
                                setDataChecked={setDataChecked}
                                data={agents}
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
                                        ),
                                    },
                                    { title: "Position", key: "position" },
                                    { title: "Account", key: "account" },
                                    { title: "Site", key: "site" },
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
                                                <button
                                                    onClick={() => clickMe(record.id)}
                                                    className="text-blue-500 hover:underline"
                                                >
                                                    Edit
                                                </button>
                                                <button>
                                                    <a
                                                        href="/administrator/history"
                                                        className="ml-1 text-blue-500 hover:underline"
                                                    >
                                                        View History Logs
                                                    </a>
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        handleStatusChange(
                                                            record.id,
                                                            record.status
                                                        )
                                                    }
                                                    className={`text-${
                                                        record.status === "Active"
                                                            ? "red"
                                                            : "green"
                                                    }-500 hover:underline`}
                                                >
                                                    Mark as{" "}
                                                    {record.status === "Active"
                                                        ? "Inactive"
                                                        : "Active"}
                                                </button>
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
