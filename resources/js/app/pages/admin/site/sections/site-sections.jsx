import React, { useState, useEffect } from "react";
import Table from "@/app/_components/table";
import Button from "@/app/_components/button";
import Modal from "@/app/_components/modal";
import Input from "@/app/_components/input"; 
import axios from "axios"; // Ensure you have axios installed

export default function SiteView() {
    const [dataChecked, setDataChecked] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [error, setError] = useState(null);
    const [sites, setSites] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newSite, setNewSite] = useState({
        siteName: "",
        location: "",
        status: "Active",
    });

    useEffect(() => {
        fetchSites();
    }, []);

    const fetchSites = async () => {
        try {
            const response = await axios.get("/api/sites"); // Adjust the endpoint as necessary
            setSites(response.data);
        } catch (error) {
            setError("Failed to fetch sites");
        }
    };

    const handleStatusChange = async (siteId, newStatus) => {
        try {
            await axios.put(`/api/sites/${siteId}`, { status: newStatus });
            setSites((prevSites) =>
                prevSites.map((site) =>
                    site.id === siteId ? { ...site, status: newStatus } : site
                )
            );
        } catch (error) {
            setError("Failed to update status");
        }
    };

    const handleRemoveAccount = async (siteId) => {
        try {
            await axios.delete(`/api/sites/${siteId}`);
            setSites((prevSites) => prevSites.filter((site) => site.id !== siteId));
        } catch (error) {
            setError("Failed to remove site");
        }
    };

    const handleAddNewSiteClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleChange = (e) => {
        setNewSite({ ...newSite, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newSite.siteName || !newSite.location) {
            setError("Please fill in all required fields.");
            return;
        }
        try {
            const response = await axios.post("/api/sites", newSite);
            setSites([...sites, response.data]);
            setNewSite({ siteName: "", location: "", status: "Active" });
            setIsModalOpen(false);
            setError(null);
        } catch (error) {
            setError("Failed to add site");
        }
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-8 text-gray-700">Site Overview</h1>
            <div className="bg-white p-4 rounded-lg shadow-md">
                <div className="flex items-center justify-between mb-4">
                    <Button
                        className="flex items-center justify-center"
                        loading={false}
                        type="button"
                        onClick={handleAddNewSiteClick}
                    >
                        Add New Site
                    </Button>
                </div>
                {error && <div className="text-red-500 mb-4">{error}</div>}
                <Table
                    dataChecked={dataChecked}
                    setDataChecked={setDataChecked}
                    data={sites}
                    columns={[
                        {
                            title: "Site Name",
                            key: "site_name",
                        },
                        {
                            title: "Location",
                            key: "location",
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

            {/* Modal for adding a new site */}
            <Modal open={isModalOpen} setOpen={setIsModalOpen} width="sm:max-w-md top-20">
                <h2 className="text-lg font-semibold mb-4">Add New Site</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <Input
                            name="siteName"
                            label="Site Name"
                            type="text"
                            className="rounded-md w-full"
                            required={true}
                            value={newSite.siteName}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-4">
                        <Input
                            name="location"
                            label="Location"
                            type="text"
                            className="rounded-md w-full"
                            required={true}
                            value={newSite.location}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-4">
                        <Input
                            value={newSite.status}
                            readOnly={true}
                            label="Status"
                            name="status"
                            className="rounded-md w-full"
                            required={true}
                        />
                    </div>
                    <div className="flex justify-end space-x-4">
                        <Button type="button" onClick={handleCloseModal} className="bg-gray-200 hover:bg-gray-300">Cancel</Button>
                        <Button type="submit" className="bg-indigo-500 text-white hover:bg-indigo-600">Add Site</Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
