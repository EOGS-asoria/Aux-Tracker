import React, { useState } from "react";
import Table from "@/app/_components/table";
import Button from "@/app/_components/button";
import Modal from "@/app/_components/modal";
import Input from "@/app/_components/input";

export default function AccountsTableSection() {
    const [dataChecked, setDataChecked] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newAccount, setNewAccount] = useState({
        accountName: "",
        site: "",
        dateCreated: new Date().toISOString().split('T')[0], // Set to today's date
    });
    const [accounts, setAccounts] = useState([
        {
            id: 1,
            accountName: "AiFi",
            site: "San Carlos Site",
            dateCreated: "2024-01-15",
        },
    ]);

    function handleAddNewAccountClick() {
        setIsModalOpen(true);
    }

    function handleCloseModal() {
        setIsModalOpen(false);
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setNewAccount((prevState) => ({ ...prevState, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        const newAccountData = {
            id: accounts.length + 1,
            ...newAccount,
        };
        setAccounts((prevAccounts) => [...prevAccounts, newAccountData]);
        setNewAccount({
            accountName: "",
            site: "",
            dateCreated: new Date().toISOString().split('T')[0], // Reset to today's date
        });
        handleCloseModal();
    }

    function handleRemoveAccount(id) {
        setAccounts((prevAccounts) => prevAccounts.filter(account => account.id !== id));
    }

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-8 text-gray-700">
                Account Management
            </h1>

            <div className="bg-white p-4 rounded-lg shadow-md">
                <div className="flex items-center justify-between mb-4">
                    <Button
                        className="flex items-center justify-center"
                        loading={false}
                        type="button"
                        onClick={handleAddNewAccountClick}
                    >
                        Add New Account
                    </Button>
                </div>

                <Table
                    dataChecked={dataChecked}
                    setDataChecked={setDataChecked}
                    data={accounts}
                    columns={[
                        {
                            title: "Account Name",
                            key: "accountName",
                        },
                        {
                            title: "Site",
                            key: "site",
                        },
                        {
                            title: "Date Created",
                            key: "dateCreated",
                        },
                        {
                            title: "Action",
                            key: "action",
                            render: (_, record) => (
                                <div className="flex space-x-4">
                                    <button className="text-blue-500 hover:underline">Edit</button>
                                    <button
                                        onClick={() => handleRemoveAccount(record.id)}
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
                <h2 className="text-lg font-semibold mb-4">Add New Account</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <Input
                            name="accountName"
                            label="Account Name"
                            type="text"
                            className="rounded-md w-full"
                            required={true}
                            value={newAccount.accountName}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-4">
                        <Input
                            name="site"
                            label="Site"
                            type="text"
                            className="rounded-md w-full"
                            required={true}
                            value={newAccount.site}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-4">
                        <Input
                            name="dateCreated"
                            label="Date Created"
                            type="date"
                            className="rounded-md w-full"
                            required={true}
                            value={newAccount.dateCreated}
                            readOnly={true} // Make the date field read-only
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
