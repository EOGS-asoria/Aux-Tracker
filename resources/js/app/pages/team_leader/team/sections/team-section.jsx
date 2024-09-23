import React, { useState } from "react";
import Table from "@/app/_components/table";
import Button from "@/app/_components/button";
import Modal from "@/app/_components/modal";
import Input from "@/app/_components/input";
import Select from "@/app/_components/select";

export default function AgentSection() {
    const [dataChecked, setDataChecked] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newAgent, setNewAgent] = useState({
        name: "",
        position: "",
        account: "",
        site: "San Carlos Site",
        status: "",
    });
    const [agents, setAgents] = useState([
        {
            id: 1,
            name: "Alice Smith",
            position: "Agent",
            account: "AiFi",
            site: "San Carlos",
            status: "Active",
        },
        {
            id: 2,
            name: "Mayeng Miyot",
            position: "Agent",
            account: "AiFi",
            site: "San Carlos",
            status: "Inactive",
        },
        {
            id: 3,
            name: "John Doe",
            position: "Agent",
            account: "AiFi",
            site: "San Carlos",
            status: "Active",
        },
    ]);

    const [expandedAgentId, setExpandedAgentId] = useState(null);

    function handleAddNewAgentClick() {
        setIsModalOpen(true);
    }

    function handleCloseModal() {
        setIsModalOpen(false);
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setNewAgent((prevState) => ({ ...prevState, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        const newAgentData = {
            id: agents.length + 1,
            ...newAgent,
        };
        setAgents((prevAgents) => [...prevAgents, newAgentData]);
        setNewAgent({
            name: "",
            position: "",
            account: "",
            site: "San Carlos Site",
            status: "",
        });
        handleCloseModal();
    }

    function handleRemoveAgent(id) {
        setAgents((prevAgents) =>
            prevAgents.filter((agent) => agent.id !== id)
        );
    }

    function handleStatusChange(agentId, newStatus) {
        setAgents((prevAgents) =>
            prevAgents.map((agent) =>
                agent.id === agentId ? { ...agent, status: newStatus } : agent
            )
        );
    }

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-8 text-gray-700">
                My Team
            </h1>

            <div className="bg-white p-4 rounded-lg shadow-md">
                <div className="flex items-center justify-between mb-4">
                    <Button
                        className="flex items-center justify-center"
                        loading={false}
                        type="button"
                        onClick={handleAddNewAgentClick}
                    >
                        Add New Member
                    </Button>
                </div>

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
                        {
                            title: "Position",
                            key: "position",
                        },
                        {
                            title: "Account",
                            key: "account",
                        },
                        {
                            title: "Site",
                            key: "site",
                        },
                        {
                            title: "Status",
                            key: "status",
                            render: (text) => (
                                <span
                                    className={`px-2 py-1 rounded-full text-sm font-semibold ${text === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
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
                                        onClick={() => handleRemoveAgent(record.id)}
                                        className="text-red-500 hover:underline"
                                    >
                                        Remove
                                    </button>
                                    <button
                                        onClick={() => handleStatusChange(record.id, record.status === 'Active' ? 'Inactive' : 'Active')}
                                        className={`text-${record.status === 'Active' ? 'red' : 'green'}-500 hover:underline`}
                                    >
                                        Mark as {record.status === 'Active' ? 'Inactive' : 'Active'}
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

            <Modal
                open={isModalOpen}
                setOpen={setIsModalOpen}
                width="sm:max-w-md top-20"
            >
                <h2 className="text-lg font-semibold mb-4">Add New Member</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <Input
                            name="name"
                            label="Name"
                            type="text"
                            className="rounded-md w-full"
                            required={true}
                            value={newAgent.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-4">
                        <Select
                            options={[
                                { value: "Agent", label: "Agent" },
                                { value: "Supervisor", label: "Supervisor" },
                                { value: "Operations Manager", label: "Operations Manager" },
                            ]}
                            name="position"
                            label="Position"
                            className="rounded-md w-full"
                            required={true}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-4">
                        <Select
                            options={[
                                { value: "AiFi", label: "AiFi" },
                                { value: "JTV", label: "JTV" },
                                { value: "AiFi", label: "AiFi" },
                            ]}
                            name="account"
                            label="Account"
                            className="rounded-md w-full"
                            required={true}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-4">
                        <Input
                            name="site"
                            label="Site"
                            type="text"
                            className="rounded-md w-full"
                            readOnly={true}
                            value={newAgent.site}
                        />
                    </div>
                    <div className="mb-4">
                        <Input
                            value="Active"
                            label="Status"
                            name="status"
                            required={true}
                            readOnly={true}
                        />
                    </div>

                    <div className="flex justify-end">
                        <Button
                            className="flex items-center justify-center w-full"
                            type="submit"
                        >
                            Add
                        </Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
