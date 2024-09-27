// users-create-section.jsx
import React, { useState } from "react";
import Button from "@/app/_components/button";
import Modal from "@/app/_components/modal";
import Input from "@/app/_components/input";
import Select from "@/app/_components/select";
import { useSelector } from "react-redux";
import axios from 'axios';

export default function UsersCreateSection() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newAgent, setNewAgent] = useState({
        name: "",
        position: "",
        account: "",
        site: "",
        status: "Active",
    });
    const { positions } = useSelector(state => state.positions);
    const { accounts } = useSelector(state => state.accounts); // Access accounts from state
    const [sites, setSites] = useState([]); // Assuming you have a way to set sites

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
        // Assuming fetchAgents() is defined to refresh your agent list
        handleCloseModal();
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <Button onClick={handleAddNewAgentClick}>Add New Agent</Button>
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
                            options={positions.data.map((pos) => ({
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
                            options={accounts.data.map((acc) => ({
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
