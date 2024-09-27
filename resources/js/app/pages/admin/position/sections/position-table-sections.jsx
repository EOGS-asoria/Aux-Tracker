import React, { useEffect, useState } from "react";
import Table from "@/app/_components/table";
import Button from "@/app/_components/button";
import Modal from "@/app/_components/modal";
import Input from "@/app/_components/input";
import axios from "axios";
import { setPositions } from "../redux/position-slice";
import { useDispatch, useSelector } from "react-redux";
import PositionDeleteSection from "./position-delete-section";
import PositionCreateSection from "./position-create-section";

export default function PositionTableSection() {
    const [dataChecked, setDataChecked] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [error, setError] = useState(null);
    const { positions } = useSelector((state) => state.positions);
    const dispatch = useDispatch();

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-8 text-gray-700">
                Positions Management
            </h1>
            <div className="bg-white p-4 rounded-lg shadow-md">
                <PositionCreateSection />
                {error && <div className="text-red-500 mb-4">{error}</div>}
                <Table
                    dataChecked={dataChecked}
                    setDataChecked={setDataChecked}
                    data={positions.data}
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
                                <PositionDeleteSection data={record} />
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
