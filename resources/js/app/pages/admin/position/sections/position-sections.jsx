import React, { useState } from "react";
import Table from "@/app/_components/table";
import Button from "@/app/_components/button";
import Modal from "@/app/_components/modal";
import Input from "@/app/_components/input";
import Select from "@/app/_components/select";

export default function PositionSectionPage() {
    const [dataChecked, setDataChecked] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newPosition, setNewPosition] = useState({
        name: "",
        account: "",
        status: "",
    });
    const [positions, setPositions] = useState([
        {
            id: 1,
            name: "Alice Smith",
            account: "Operations Manager",
            year: 2024,
            status: "Active",
            teamMembers: [], // Initially empty, simulate fetch later
        },
        {
            id: 2,
            name: "Mayeng Miyot",
            account: "Agent",
            year: 2090,
            status: "Inactive",
            teamMembers: [], // Initially empty, simulate fetch later
        },
        {
            id: 3,
            name: "John Doe",
            account: "Account Manager",
            year: 2023,
            status: "Active",
            teamMembers: [], // Initially empty, simulate fetch later
        },
        {
            id: 4,
            name: "Emily Johnson",
            account: "Team Leader",
            year: 2024,
            status: "Active",
            teamMembers: [], // Initially empty, simulate fetch later
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
        }; // Initialize with no team members and history
        setPositions((prevPositions) => [...prevPositions, newPositionData]);
        setNewPosition({
            name: "",
            account: "",
            status: "",
        });
        handleCloseModal();
    }

    function toggleExpandPosition(positionId) {
        setExpandedPositionId(expandedPositionId === positionId ? null : positionId);
    }

    function toggleExpandSection(positionId, section) {
        if (expandedPositionId === positionId) {
            setExpandedSection(expandedSection === section ? null : section);
        } else {
            setExpandedPositionId(positionId);
            setExpandedSection(section);

            // Simulate fetching team members data on demand
            if (section === "team") {
                const updatedPositions = positions.map((position) => {
                    if (position.id === positionId && position.teamMembers.length === 0) {
                        return {
                            ...position,
                            teamMembers: [
                                {
                                    id: 1,
                                    name: "John Doe",
                                    account: "Developer",
                                },
                                {
                                    id: 2,
                                    name: "Jane Roe",
                                    account: "Designer",
                                },
                                {
                                    id: 3,
                                    name: "Mark Twain",
                                    account: "Tester",
                                },
                                {
                                    id: 4,
                                    name: "Lucy Liu",
                                    account: "Developer",
                                },
                                {
                                    id: 5,
                                    name: "Tom Hardy",
                                    account: "Developer",
                                },
                            ],
                        };
                    }
                    return position;
                });

                setPositions(updatedPositions);
            }
        }
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
                    data={positions} // Pass original positions data
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
                                    <button>
                                        <a
                                            href="/om/team"
                                            className="ml-1 text-blue-500 hover:underline"
                                        >
                                            View Team
                                        </a>
                                    </button>
                                    <button>
                                        {/* <a href="#" className="ml-1">
                                            View History
                                        </a> */}
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
                        <Select
                            options={[
                                { value: "Operations Manager", label: "Operations Manager" },
                                { value: "Account Manager", label: "Account Manager" },
                                { value: "Team Leader", label: "Team Leader" },
                                { value: "Agent", label: "Agent" },
                            ]}
                            onChange={(e) => handleChange({ target: { name: 'account', value: e.target.value } })}
                            label="Position"
                            name="account"
                            required={true}
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
