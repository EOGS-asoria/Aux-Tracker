import React, { useState } from "react";
import Table from "@/app/_components/table";
import Button from "@/app/_components/button";
import Modal from "@/app/_components/modal";
import Input from "@/app/_components/input";
import Select from "@/app/_components/select";

export default function AgentsTableSection() {
    const [dataChecked, setDataChecked] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newAgent, setNewAgent] = useState({
        name: "",
        position: "",
        account: "",
        teamLeader: "",
        site: "San Carlos",
    });
    const [agents, setAgents] = useState([
        {
            id: 1,
            name: "Emily Johnson",
            position: "Agent",
            account: "Account1",
            teamLeader: "Michael Smith",
            site: "Carcar Site",
            status: "Active",
        },
        {
            id: 2,
            name: "David Wilson",
            position: "Agent",
            account: "Account2",
            teamLeader: "Sarah Brown",
            site: "3rd Site San Carlos City",
            status: "Inactive",
        },
        {
            id: 3,
            name: "Sophia Davis",
            position: "Agent",
            account: "Account3",
            teamLeader: "John Doe",
            site: "San Carlos Site",
            status: "Active",
        },
    ]);

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
        const newAgentData = { id: agents.length + 1, ...newAgent };
        setAgents((prevAgents) => [...prevAgents, newAgentData]);
        setNewAgent({
            name: "",
            position: "",
            account: "",
            teamLeader: "",
            site: "Carcar Site",
        });
        handleCloseModal();
    }

    function clickMe(id) {
        alert(`View History Logs for Agent with ID: ${id}`);
    }

    function handleRemoveLeader(id) {
        setAgents((prevAgents) =>
            prevAgents.filter((agent) => agent.id !== id)
        );
        alert(`Agent with ID: ${id} has been removed.`);
    }

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-8 text-gray-700">Agents</h1>
            <div className="bg-white p-4 rounded-lg shadow-md">
                <div className="flex items-center justify-between mb-4">
                    <Button
                        className="flex items-center justify-center"
                        loading={false}
                        type="button"
                        onClick={handleAddNewAgentClick}
                    >
                        Add New Agent
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
                            title: "Team Leader",
                            key: "teamLeader",
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
                                    className={`px-2 py-1 rounded-full text-sm font-semibold ${text === "Active"
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
                                            handleRemoveLeader(record.id)
                                        }
                                        className="text-red-500 hover:underline"
                                    >
                                        Remove
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
                <h2 className="text-lg font-semibold mb-4">Add New Agent</h2>
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
                                {
                                    value: "Senior Agent",
                                    label: "Senior Agent",
                                },
                                { value: "Team Leader", label: "Team Leader" },
                                {
                                    value: "Quality Analyst",
                                    label: "Quality Analyst",
                                },
                                { value: "Trainer", label: "Trainer" },
                                {
                                    value: "Operations Manager",
                                    label: "Operations Manager",
                                },
                                {
                                    value: "Customer Service Representative",
                                    label: "Customer Service Representative",
                                },
                            ]}
                            value={newAgent.position}
                            onChange={(e) =>
                                handleChange({
                                    target: {
                                        name: "position",
                                        value: e.target.value,
                                    },
                                })
                            }
                            label="Position"
                            name="position"
                            required={true}
                        />
                    </div>
                    <div className="mb-4">
                        <Select
                            options={[
                                { value: "Account1", label: "Account 1" },
                                { value: "Account2", label: "Account 2" },
                                { value: "Account3", label: "Account 3" },
                            ]}
                            value={newAgent.account}
                            onChange={(e) =>
                                handleChange({
                                    target: {
                                        name: "account",
                                        value: e.target.value,
                                    },
                                })
                            }
                            label="Account"
                            name="account"
                            required={true}
                        />
                    </div>
                    <div className="mb-4">
                        <Select
                            options={[
                                { value: "Alice Smith", label: "Alice Smith" },
                                {
                                    value: "Mayeng Miyot",
                                    label: "Mayeng Miyot",
                                },
                                { value: "John Doe", label: "John Doe" },
                            ]}
                            value={newAgent.teamLeader}
                            onChange={(e) =>
                                handleChange({
                                    target: {
                                        name: "teamLeader",
                                        value: e.target.value,
                                    },
                                })
                            }
                            label="Team Leader"
                            name="teamLeader"
                            required={true}
                        />
                    </div>
                    <div className="mb-4">
                        <Input
                            label="Site"
                            value={newAgent.site}
                            readOnly
                            className="rounded-md w-full"
                        />
                    </div>
                    <div className="flex justify-end space-x-4">
                        <Button
                            type="button"
                            onClick={handleCloseModal}
                            className="bg-gray-200 hover:bg-gray-300"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            className="bg-indigo-500 text-white hover:bg-indigo-600"
                        >
                            Add Agent
                        </Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
