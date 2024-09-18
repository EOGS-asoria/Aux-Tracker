import React, { useState } from "react";
import Table from "@/app/_components/table";
import Button from "@/app/_components/button";
import Modal from "@/app/_components/modal";
import Input from "@/app/_components/input";
import Select from "@/app/_components/select";

export default function ViewTeamSections() {
    // Declare necessary states
    const [dataChecked, setDataChecked] = useState([]);
    const [agents, setAgents] = useState([
        {
            id: 1,
            name: "Michael Johnson",
            account: "Support Agent",
            joinedYear: 2018,
            status: "Inactive", // Corrected typo
        },
        {
            id: 2,
            name: "Samantha Green",
            account: "Senior Support Agent",
            joinedYear: 2019,
            status: "Active",
        },
        {
            id: 3,
            name: "David Brown",
            account: "Junior Agent",
            joinedYear: 2020,
            status: "Active",
        },
        // Add more agents as needed
    ]);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newAgent, setNewAgent] = useState({
        name: "",
        account: "",
       
        status: "",
    });

    // Handle click for adding a new agent
    const handleAddNewUserClick = () => {
        setIsModalOpen(true);
    };

    // Close modal
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewAgent((prevState) => ({ ...prevState, [name]: value }));
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        const newAgentData = {
            id: agents.length + 1,
            ...newAgent,
        };
        setAgents((prevAgents) => [...prevAgents, newAgentData]);
        setNewAgent({
            name: "",
            account: "",
            
            status: "",
        });
        handleCloseModal();
    };

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
                Team Agent of Alice Smith
            </h1>

            <div className="bg-white p-4 rounded-lg shadow-md">
                <div className="flex items-center justify-between mb-4">
                    <Button
                        className="flex items-center justify-center"
                        loading={false}
                        type="button"
                        onClick={handleAddNewUserClick}
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
                            title: "Account",
                            key: "account",
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
                                        href={`/om/history`} // Dynamic link based on record ID
                                        className="text-blue-500 hover:underline"
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
                        <Input
                            name="account"
                            label="Account"
                            type="text"
                            className="rounded-md w-full"
                            required={true}
                            value={newAgent.account}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-4">
                        <Select
                            options={[
                                { value: "Active", label: "Active" },
                                { value: "Inactive", label: "Inactive" },
                            ]}
                            onChange={handleChange}
                            label="Status"
                            name="status"
                            required={true}
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
