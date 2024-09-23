import React, { useState } from "react";
import Table from "@/app/_components/table";
import Button from "@/app/_components/button";
import Modal from "@/app/_components/modal";
import Input from "@/app/_components/input";
import Select from "@/app/_components/select";

export default function UsersTableSection() {
    const [dataChecked, setDataChecked] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newUser, setNewUser] = useState({
        name: "",
        account: "",
        status: "Active", // Default status
    });

    // Filter users to only show those with the account type "AM"
    const [users, setUsers] = useState([
        {
            id: 1,
            name: "Alice Smith",
            account: "AM",
            status: "Active",
        },
        {
            id: 2,
            name: "Mayeng Miyot",
            account: "Intern",
            status: "Inactive",
        },
        {
            id: 3,
            name: "John Doe",
            account: "Developer",
            status: "Active",
        },
        {
            id: 4,
            name: "Emily Johnson",
            account: "AM",
            status: "Active",
        },
    ].filter(user => user.account === "AM")); // Filtered to only include AM

    function handleAddNewUserClick() {
        setIsModalOpen(true);
    }

    function handleCloseModal() {
        setIsModalOpen(false);
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setNewUser((prevState) => ({ ...prevState, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        const newUserData = {
            id: users.length + 1,
            ...newUser,
        };
        setUsers((prevUsers) => [...prevUsers, newUserData]);
        setNewUser({
            name: "",
            account: "",
            status: "Active", // Reset to default status
        });
        handleCloseModal();
    }

    function toggleUserStatus(id) {
        setUsers((prevUsers) =>
            prevUsers.map((user) =>
                user.id === id
                    ? { ...user, status: user.status === "Active" ? "Inactive" : "Active" }
                    : user
            )
        );
    }

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-8 text-gray-700">
                Team Leader
            </h1>

            <div className="bg-white p-4 rounded-lg shadow-md">
                <div className="flex items-center justify-between mb-4">
                    <Button
                        className="flex items-center justify-center"
                        loading={false}
                        type="button"
                        onClick={handleAddNewUserClick}
                    >
                        Add New Leader
                    </Button>
                </div>

                <Table
                    dataChecked={dataChecked}
                    setDataChecked={setDataChecked}
                    data={users} // Pass filtered users data
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
                            title: "Account",
                            key: "account",
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
                                            href="/am/agent"
                                            className="ml-1 text-blue-500 hover:underline"
                                        >
                                            View Team
                                        </a>
                                    </button>
                                    <button
                                        onClick={() => toggleUserStatus(record.id)}
                                        className={`text-${record.status === "Active" ? "red" : "green"}-500 hover:underline`}
                                    >
                                        Mark as {record.status === "Active" ? "Inactive" : "Active"}
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
                <h2 className="text-lg font-semibold mb-4">Add New Leader</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <Input
                            name="name"
                            label="Name"
                            type="text"
                            className="rounded-md w-full"
                            required={true}
                            value={newUser.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-4">
                        <Select
                            name="account"
                            label="Account"
                            options={[
                                { value: "AIFI", label: "AIFI" },
                                { value: "JTV", label: "JTV" },
                            ]}
                            onChange={handleChange}
                            required={true}
                        />
                    </div>
                    <div className="mb-4">
                        <Input
                            label="Status"
                            value="Active" // Fixed status as read-only
                            readOnly
                            className="rounded-md w-full"
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
