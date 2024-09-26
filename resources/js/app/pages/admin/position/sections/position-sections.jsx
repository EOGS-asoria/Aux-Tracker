import React, { useEffect, useState } from "react";
import Table from "@/app/_components/table";
import Button from "@/app/_components/button";
import Modal from "@/app/_components/modal";
import Input from "@/app/_components/input";
import axios from "axios";

export default function PositionSectionPage() {
    const [dataChecked, setDataChecked] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [error, setError] = useState(null);
    const [positions, setPositions] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newPosition, setNewPosition] = useState({
        account: "",
        status: "Active",
    });

    useEffect(() => {
        fetchPositions();
    }, []);

    const fetchPositions = async () => {
        try {
            const response = await axios.get("/api/positions");
            setPositions(response.data);
        } catch (error) {
            console.error("Error fetching positions:", error);
            setError("Failed to fetch positions");
        }
    };

    const handleStatusChange = async (positionId, currentStatus) => {
        const newStatus = currentStatus === "Active" ? "Inactive" : "Active";
        try {
            const response = await axios.put(`/api/positions/${positionId}`, {
                status: newStatus,
            });
            if (response.status === 200) {
                setPositions((prevPositions) =>
                    prevPositions.map((position) =>
                        position.id === positionId
                            ? { ...position, status: newStatus }
                            : position
                    )
                );
            } else {
                throw new Error("Failed to update status");
            }
        } catch (error) {
            console.error("Error updating status:", error);
            setError("Failed to update status");
        }
    };

    const handleRemoveAccount = async (positionId) => {
        try {
            await axios.delete(`/api/positions/${positionId}`);
            setPositions((prevPositions) =>
                prevPositions.filter((position) => position.id !== positionId)
            );
        } catch (error) {
            console.error("Error removing position:", error);
            setError("Failed to remove position");
        }
    };

    const handleAddNewPositionClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleChange = (e) => {
        setNewPosition({ ...newPosition, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newPosition.account) {
            setError("Please fill in all required fields.");
            return;
        }
        try {
            const response = await axios.post("/api/positions", newPosition);
            setPositions([...positions, response.data]);
            setNewPosition({ account: "", status: "Active" });
            setIsModalOpen(false);
            setError(null);
        } catch (error) {
            console.error("Error adding position:", error);
            setError("Failed to add position");
        }
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-8 text-gray-700">
                Positions Management
            </h1>
            <div className="bg-white p-4 rounded-lg shadow-md">
                <div className="flex items-center justify-between mb-4">
                    <Button type="button" onClick={handleAddNewPositionClick}>
                        Add New Position
                    </Button>
                </div>
                {error && <div className="text-red-500 mb-4">{error}</div>}
                <Table
                    dataChecked={dataChecked}
                    setDataChecked={setDataChecked}
                    data={positions}
                    columns={[
                        { title: "Position", key: "account" },
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
                                        onClick={() =>
                                            handleRemoveAccount(record.id)
                                        }
                                        className="text-red-500 hover:underline"
                                    >
                                        Remove
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

            <Modal
                open={isModalOpen}
                setOpen={setIsModalOpen}
                width="sm:max-w-md top-20"
            >
                <h2 className="text-lg font-semibold mb-4">Add New Position</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <Input
                            name="account"
                            label="Position"
                            type="text"
                            className="rounded-md w-full"
                            required={true}
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
                            className="rounded-md w-full"
                            required={true}
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
                            Add Position
                        </Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
