import React, { useState, useEffect } from "react";
import Table from "@/app/_components/table";
import axios from "axios";

export default function SiteView() {
    const [dataChecked, setDataChecked] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [error, setError] = useState(null);
    const [sites, setSites] = useState([
        { id: 2, site: "Carcar Site", location: "Carcar", status: "Inactive" },
        {
            id: 1,
            site: "San Carlos Site",
            location: "San Carlos",
            status: "Active",
        },
        {
            id: 3,
            site: "3rd Site",
            location: "San Carlos",
            status: "Active",
        },
    ]);

    function handleStatusChange(siteId, newStatus) {
        setSites((prevSites) =>
            prevSites.map((site) =>
                site.id === siteId ? { ...site, status: newStatus } : site
            )
        );
    }

    function clickMe(id) {
        alert(`Details for site with ID: ${id}`);
    }

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-8 text-gray-700">
                Site Overview
            </h1>
            <div className="bg-white p-4 rounded-lg shadow-md">
                {error && <div className="text-red-500 mb-4">{error}</div>}
                <Table
                    dataChecked={dataChecked}
                    setDataChecked={setDataChecked}
                    data={sites}
                    columns={[
                        {
                            title: "Site Name",
                            key: "site",
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
                                                record.status === "Active"
                                                    ? "Inactive"
                                                    : "Active"
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
        </div>
    );
}
