import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "@/app/_components/table";
import Button from "@/app/_components/button";
import Modal from "@/app/_components/modal";
import Input from "@/app/_components/input";
import Select from "@/app/_components/select";

export default function AccountManagerSection() {
    const [dataChecked, setDataChecked] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newAccountManager, setNewAccountManager] = useState({
        name: "",
        position: "",
        account: "",
        site: "San Carlos City",
    });
    const [accountManagers, setAccountManagers] = useState([]);
    const [positions, setPositions] = useState([]);
    const [accounts, setAccounts] = useState([]);

    useEffect(() => {
        fetchAccountManagers();
        fetchPositions();
        fetchAccounts();
    }, []);

    const fetchAccountManagers = async () => {
        try {
            const response = await axios.get("/api/account-managers");
            setAccountManagers(response.data);
        } catch (error) {
            console.error("Error fetching account managers:", error);
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

    function handleAddNewAccountManagerClick() {
        setIsModalOpen(true);
    }

    function handleCloseModal() {
        setIsModalOpen(false);
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setNewAccountManager((prevState) => ({ ...prevState, [name]: value }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const { name, position, account, site } = newAccountManager;
            const response = await axios.post("/api/account-managers", {
                name,
                position,
                account,
                site,
            });
            setAccountManagers((prevManagers) => [
                ...prevManagers,
                response.data,
            ]);
            setNewAccountManager({
                name: "",
                position: "",
                account: "",
                site: "San Carlos City",
            });
            handleCloseModal();
        } catch (error) {
            console.error("Error adding account manager:", error);
        }
    }

    async function handleRemoveManager(id) {
        await axios.delete(`/api/account-managers/${id}`);
        setAccountManagers((prevManagers) =>
            prevManagers.filter((manager) => manager.id !== id)
        );
    }

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-8 text-gray-700">
                Account Manager Management
            </h1>
            <div className="bg-white p-4 rounded-lg shadow-md">
                <div className="flex items-center justify-between mb-4">
                    <Button
                        type="button"
                        onClick={handleAddNewAccountManagerClick}
                    >
                        Add New Account Manager
                    </Button>
                </div>
                <Table
                    dataChecked={dataChecked}
                    setDataChecked={setDataChecked}
                    data={accountManagers}
                    columns={[
                        { title: "Name", key: "name" },
                        { title: "Position", key: "position" },
                        { title: "Account", key: "account" },
                        { title: "Site", key: "site" },
                        {
                            title: "Action",
                            key: "action",
                            render: (_, record) => (
                                <button
                                    onClick={() =>
                                        handleRemoveManager(record.id)
                                    }
                                    className="text-red-500 hover:underline"
                                >
                                    Remove
                                </button>
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
                <h2 className="text-lg font-semibold mb-4">
                    Add New Account Manager
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <Input
                            name="name"
                            label="Name"
                            type="text"
                            required
                            value={newAccountManager.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-4">
                        <Select
                            options={positions.map((pos) => ({
                                value: pos.account,
                                label: pos.account, // Adjust based on your actual property
                            }))}
                            value={newAccountManager.position}
                            onChange={(e) =>
                                handleChange({
                                    target: {
                                        name: "position",
                                        value: e.target.value,
                                    },
                                })
                            }
                            label="Position"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <Select
                            options={accounts.map((acc) => ({
                                value: acc.accountName,
                                label: acc.accountName, // Adjust based on your actual property
                            }))}
                            value={newAccountManager.account}
                            onChange={(e) =>
                                handleChange({
                                    target: {
                                        name: "account",
                                        value: e.target.value,
                                    },
                                })
                            }
                            label="Account"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <Input
                            name="site"
                            label="Site"
                            type="text"
                            readOnly
                            value={newAccountManager.site}
                        />
                    </div>
                    <div className="flex justify-end">
                        <Button type="submit">Add</Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
