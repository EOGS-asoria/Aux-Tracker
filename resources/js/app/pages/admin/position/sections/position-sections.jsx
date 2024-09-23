import React, { useState } from "react";
import Table from "@/app/_components/table";
import Button from "@/app/_components/button";
import Modal from "@/app/_components/modal";
import Input from "@/app/_components/input";

export default function PositionSectionPage() {
    const [dataChecked, setDataChecked] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newPosition, setNewPosition] = useState({ 
        account: "",
        status: "Active", // Set default status
    });
    const [positions, setPositions] = useState([
        {
            id: 1,
            account: "Agent",
            year: 2024,
            status: "Active",
            teamMembers: [],
        },
        {
            id: 2,
            account: "Senior Agent",
            year: 2090,
            status: "Inactive",
            teamMembers: [],
        },
        {
            id: 3,
            account: "Quality Analyst",
            year: 2023,
            status: "Active",
            teamMembers: [],
        },
        {
            id: 4,
            account: "Trainer",
            year: 2024,
            status: "Active",
            teamMembers: [],
        },
        
    ]);
    const [expandedPositionId, setExpandedPositionId] = useState(null);
    const [expandedSection, setExpandedSection] = useState(null);

    function handleAddNewPositionClick() {
        setIsModalOpen(true);
    }

    function handleCloseModal() {
        setIsModalOpen(false);
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setNewPosition((prevState) => ({ ...prevState, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        const newPositionData = {
            id: positions.length + 1,
            ...newPosition,
            teamMembers: [],
            history: [],
        };
        setPositions((prevPositions) => [...prevPositions, newPositionData]);
        setNewPosition({ name: "", account: "", status: "Active" }); // Reset state
        handleCloseModal();
    }

    function handleRemoveAccount(id) {
        setPositions(positions.filter(position => position.id !== id));
    }

    function handleStatusChange(id, status) {
        setPositions(positions.map(position =>
            position.id === id ? { ...position, status } : position
        ));
    }

    function toggleExpandPosition(positionId) {
        setExpandedPositionId(expandedPositionId === positionId ? null : positionId);
    }

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-8 text-gray-700">
                Positions Management
            </h1>

            <div className="bg-white p-4 rounded-lg shadow-md">
                <div className="flex items-center justify-between mb-4">
                    <Button
                        className="flex items-center justify-center"
                        loading={false}
                        type="button"
                        onClick={handleAddNewPositionClick}
                    >
                        Add New Position
                    </Button>
                </div>

                <Table
                    dataChecked={dataChecked}
                    setDataChecked={setDataChecked}
                    data={positions}
                    columns={[
                        {
                            title: "Position",
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
                                    <button
                                        onClick={() => handleRemoveAccount(record.id)}
                                        className="text-red-500 hover:underline"
                                    >
                                        Remove
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleStatusChange(
                                                record.id,
                                                record.status === "Active"
                                                    ? "Inactive"
                                                    : "Active"
                                            )
                                        }
                                        className={`text-${record.status === "Active" ? "red" : "green"}-500 hover:underline`}
                                    >
                                        Mark as {record.status === "Active" ? "Inactive" : "Active"}
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

            <Modal open={isModalOpen} setOpen={setIsModalOpen} width="sm:max-w-md top-20">
                <h2 className="text-lg font-semibold mb-4">Add New Position</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <Input
                            name="name"
                            label="Name"
                            type="text"
                            className="rounded-md w-full"
                            required={true}
                            value={newPosition.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-4">
                        <Input
                            label="Position"
                            name="account"
                            required={true}
                            className="rounded-md w-full"
                            value={newPosition.account}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-4">
                        <Input
                            value={newPosition.status}
                            readOnly={true}
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
