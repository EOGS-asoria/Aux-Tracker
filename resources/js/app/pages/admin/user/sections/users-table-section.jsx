import React, { useState, useEffect } from "react";
import Table from "@/app/_components/table";
import Button from "@/app/_components/button";
import Modal from "@/app/_components/modal";
import Input from "@/app/_components/input";
import Select from "@/app/_components/select";
import axios from "axios";

export default function AgentsTableSection() {
    const [dataChecked, setDataChecked] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newAgent, setNewAgent] = useState({
        name: "",
        position: "",
        account: "",
        site: "",
        status: "Active",
    });
    const [agents, setAgents] = useState([]);
    const [positions, setPositions] = useState([]);
    const [accounts, setAccounts] = useState([]);
    const [sites, setSites] = useState([]);

    useEffect(() => {
        fetchAgents();
        fetchPositions();
        fetchAccounts();
        fetchSites();
    }, []);

    const fetchAgents = async () => {
        const response = await axios.get("/api/agents");
        setAgents(response.data);
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

    const fetchSites = async () => {
        try {
            const response = await axios.get("/api/sites");
            setSites(response.data);
        } catch (error) {
            console.error("Error fetching sites:", error);
        }
    };

    const handleAddNewAgentClick = () => {
        setNewAgent({
            name: "",
            position: "",
            account: "",
            site: "",
            status: "Active",
        });
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewAgent((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post("/api/agents", newAgent);
        fetchAgents();
        handleCloseModal();
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
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-8 text-gray-700">Agents</h1>
            <div className="bg-white p-4 rounded-lg shadow-md">
                <div className="flex items-center justify-between mb-4">
                    <Button onClick={handleAddNewAgentClick}>
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
                            required
                            value={newAgent.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-4">
                        <Select
                            options={positions.map((pos) => ({
                                value: pos.account,
                                label: pos.account,
                            }))}
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
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <Select
                            options={accounts.map((acc) => ({
                                value: acc.accountName,
                                label: acc.accountName,
                            }))}
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
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <Select
                            options={sites.map((site) => ({
                                value: site.site_name,
                                label: site.site_name,
                            }))}
                            value={newAgent.site}
                            onChange={(e) =>
                                handleChange({
                                    target: {
                                        name: "site",
                                        value: e.target.value,
                                    },
                                })
                            }
                            label="Site"
                            name="site"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <Input
                            value={newAgent.status}
                            readOnly
                            label="Status"
                            name="status"
                            required
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
