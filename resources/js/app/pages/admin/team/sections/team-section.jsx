import React, { useState } from "react";
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
        status: "",
    });
    const [leaders, setLeaders] = useState([
        {
            id: 1,
            name: "Alice Smith",
            position: "Manager",
            account: "alice.smith",
            site: "San Carlos",
            status: "Active",
            teamMembers: [],
        },
        {
            id: 2,
            name: "Mayeng Miyot",
            position: "Intern",
            account: "mayeng.miyot",
            site: "Carcar",
            status: "Inactive",
            teamMembers: [],
        },
        {
            id: 3,
            name: "John Doe",
            position: "Developer",
            account: "john.doe",
            site: "3rd Site",
            status: "Active",
            teamMembers: [],
        },
        {
            id: 4,
            name: "Emily Johnson",
            position: "Designer",
            account: "emily.johnson",
            site: "Chicago",
            status: "Active",
            teamMembers: [],
        },
    ]);
    const [expandedLeaderId, setExpandedLeaderId] = useState(null);
    const [expandedSection, setExpandedSection] = useState(null);

    function handleAddNewLeaderClick() {
        setIsModalOpen(true);
    }

    function handleCloseModal() {
        setIsModalOpen(false);
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setNewLeader((prevState) => ({ ...prevState, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        const newLeaderData = {
            id: leaders.length + 1,
            ...newLeader,
            teamMembers: [],
        };
        setLeaders((prevLeaders) => [...prevLeaders, newLeaderData]);
        setNewLeader({
            name: "",
            position: "",
            account: "",
            site: "San Carlos Site",
            status: "",
        });
        handleCloseModal();
    }

    function handleRemoveLeader(id) {
        setLeaders((prevLeaders) =>
            prevLeaders.filter((leader) => leader.id !== id)
        );
    }

    function toggleExpandLeader(leaderId) {
        setExpandedLeaderId(expandedLeaderId === leaderId ? null : leaderId);
    }

    function toggleExpandSection(leaderId, section) {
        if (expandedLeaderId === leaderId) {
            setExpandedSection(expandedSection === section ? null : section);
        } else {
            setExpandedLeaderId(leaderId);
            setExpandedSection(section);

            // Simulate fetching team members data on demand
            if (section === "team") {
                const updatedLeaders = leaders.map((leader) => {
                    if (
                        leader.id === leaderId &&
                        leader.teamMembers.length === 0
                    ) {
                        return {
                            ...leader,
                            teamMembers: [
                                {
                                    id: 1,
                                    name: "John Doe",
                                    position: "Developer",
                                    account: "john.doe",
                                },
                                {
                                    id: 2,
                                    name: "Jane Roe",
                                    position: "Designer",
                                    account: "jane.roe",
                                },
                                {
                                    id: 3,
                                    name: "Mark Twain",
                                    position: "Tester",
                                    account: "mark.twain",
                                },
                                {
                                    id: 4,
                                    name: "Lucy Liu",
                                    position: "Developer",
                                    account: "lucy.liu",
                                },
                                {
                                    id: 5,
                                    name: "Tom Hardy",
                                    position: "Developer",
                                    account: "tom.hardy",
                                },
                            ],
                        };
                    }
                    return leader;
                });

                setLeaders(updatedLeaders);
            }
        }
    }

    const ticketOptions = Array.from({ length: 11 }, (_, i) => ({
        value: i,
        label: i.toString(),
    }));

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
                        onClick={handleAddNewLeaderClick}
                    >
                        Add New Leader
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
                                            href="/administrator/agent"
                                            className="ml-1 text-blue-500 hover:underline"
                                        >
                                            View Team
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
                <h2 className="text-lg font-semibold mb-4">Add New Leader</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <Input
                            name="name"
                            label="Name"
                            type="text"
                            className="rounded-md w-full"
                            required={true}
                            value={newLeader.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-4">
                        <Select
                            options={[
                                { value: 'Operations Manager', label: 'Operations Manager' },
                                { value: 'Account Manager', label: 'Account Manager' },
                                { value: 'Team Leader', label: 'Team Leader' },
                                { value: 'Agent', label: 'Agent' },
                            ]}
                            value={newLeader.position}
                            onChange={(value) => setNewLeader(prev => ({ ...prev, position: value }))}
                            label="Position"
                            name="position"
                            required={true}
                        />
                    </div>
                    <div className="mb-4">
                        <Select
                            options={[
                                { value: 'Account1', label: 'Account 1' },
                                { value: 'Account2', label: 'Account 2' },
                                { value: 'Account3', label: 'Account 3' },
                            ]}
                            value={newLeader.account}
                            onChange={(value) => setNewLeader(prev => ({ ...prev, account: value }))}
                            label="Account"
                            name="account"
                            required={true}
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
                            value="Active"
                            label="Status"
                            name="status"
                            required={true}
                            readOnly="true"
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
