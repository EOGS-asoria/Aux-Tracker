import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "@/app/_components/table";
import Button from "@/app/_components/button";
import Modal from "@/app/_components/modal";
import Input from "@/app/_components/input";
import Select from "@/app/_components/select";

export default function TeamLeaderSection() {
    const [dataChecked, setDataChecked] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newLeader, setNewLeader] = useState({
        name: "",
        position: "",
        account: "",
        site: "San Carlos Site",
        status: "Active",
    });
    const [leaders, setLeaders] = useState([]);
    const [positions, setPositions] = useState([]);
    const [accounts, setAccounts] = useState([]);

    useEffect(() => {
        fetchLeaders();
        fetchPositions();
        fetchAccounts();
    }, []);

    const fetchLeaders = async () => {
        try {
            const response = await axios.get("/api/team-leaders");
            setLeaders(response.data);
        } catch (error) {
            console.error("Error fetching leaders:", error);
        }
    };

    const fetchPositions = async () => {
        try {
            const response = await axios.get("/api/positions");
            setPositions(response.data);
            console.log("Fetched positions:", response.data);
        } catch (error) {
            console.error("Error fetching positions:", error);
        }
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

    const handleAddNewLeaderClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewLeader((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { name, position, account, site, status } = newLeader;
            const response = await axios.post("/api/team-leaders", {
                name,
                position,
                account,
                site,
                status,
            });
            setLeaders((prevLeaders) => [...prevLeaders, response.data]);
            setNewLeader({
                name: "",
                position: "",
                account: "",
                site: "San Carlos Site",
                status: "Active",
            });
            handleCloseModal();
        } catch (error) {
            console.error("Error adding leader:", error);
        }
    };

    const handleRemoveLeader = async (id) => {
        try {
            await axios.delete(`/api/team-leaders/${id}`);
            setLeaders((prevLeaders) =>
                prevLeaders.filter((leader) => leader.id !== id)
            );
        } catch (error) {
            console.error("Error removing leader:", error);
        }
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-8 text-gray-700">
                Team Leader Management
            </h1>
            <div className="bg-white p-4 rounded-lg shadow-md">
                <div className="flex items-center justify-between mb-4">
                    <Button
                        className="flex items-center justify-center"
                        type="button"
                        onClick={handleAddNewLeaderClick}
                    >
                        Add Team Leader
                    </Button>
                </div>
                <Table
                    dataChecked={dataChecked}
                    setDataChecked={setDataChecked}
                    data={leaders}
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
                <h2 className="text-lg font-semibold mb-4">Add Team Leader</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <Input
                            name="name"
                            label="Name"
                            type="text"
                            className="rounded-md w-full"
                            required
                            value={newLeader.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-4">
                        <Select
                            options={positions.map((pos) => ({
                                value: pos.account,
                                label: pos.account, // Adjust based on your actual property
                            }))}
                            value={newLeader.position}
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
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <Select
                            options={accounts.map((acc) => ({
                                value: acc.accountName,
                                label: acc.accountName, // Adjust based on your actual property
                            }))}
                            value={newLeader.account}
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
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <Input
                            name="site"
                            label="Site"
                            type="text"
                            className="rounded-md w-full"
                            readOnly
                            value={newLeader.site}
                        />
                    </div>
                    <div className="mb-4">
                        <Input
                            value={newLeader.status}
                            label="Status"
                            name="status"
                            readOnly
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
                            Add Team Leader
                        </Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
