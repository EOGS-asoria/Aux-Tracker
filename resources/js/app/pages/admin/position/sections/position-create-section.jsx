import Button from "@/app/_components/button";
import Input from "@/app/_components/input";
import Modal from "@/app/_components/modal";
import store from "@/store/store";
import React, { useState } from "react";
import {
    create_position_thunk,
    get_position_thunk,
} from "../redux/position-thunk";

export default function PositionCreateSection() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newPosition, setNewPosition] = useState({
        account: "",
        status: "Active",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newPosition.account) {
            setError("Please fill in all required fields.");
            return;
        }
        try {
            await store.dispatch(create_position_thunk(newPosition));
            await store.dispatch(get_position_thunk());
            setNewPosition({ account: "", status: "Active" });
            setIsModalOpen(false);
            setError(null);
        } catch (error) {
            console.error("Error adding position:", error);
            setError("Failed to add position");
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleChange = (e) => {
        setNewPosition({ ...newPosition, [e.target.name]: e.target.value });
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <Button type="button" onClick={() => setIsModalOpen(true)}>
                    Create New Position
                </Button>
            </div>
            <Modal
                open={isModalOpen}
                setOpen={setIsModalOpen}
                width="sm:max-w-md top-20"
            >
                <h2 className="text-lg font-semibold mb-4">Add New Position</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <Input
                            name="account"
                            label="Position"
                            type="text"
                            className="rounded-md w-full"
                            required={true}
                            value={newPosition.account}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-4">
                        <Input
                            value={newPosition.status}
                            readOnly={true}
                            label="Status"
                            name="status"
                            className="rounded-md w-full"
                            required={true}
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
                            Add Position
                        </Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
