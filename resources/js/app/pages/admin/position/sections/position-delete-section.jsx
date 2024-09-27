import React from "react";

export default function PositionDeleteSection({ data }) {
    const handleRemoveAccount = async (positionId) => {
        try {
            await axios.delete(`/api/positions/${positionId}`);
            dispatch(
                setPositions((prevPositions) =>
                    prevPositions.filter(
                        (position) => position.id !== positionId
                    )
                )
            );
        } catch (error) {
            console.error("Error removing position:", error);
            setError("Failed to remove position");
        }
    };
    return (
        <div>
            <div className="flex space-x-4">
                <button
                    onClick={() => handleRemoveAccount(data.id)}
                    className="text-red-500 hover:underline"
                >
                    Remove
                </button>
                <button
                    onClick={() => handleStatusChange(data.id, data.status)}
                    className={`text-${
                        data.status === "Active" ? "red" : "green"
                    }-500 hover:underline`}
                >
                    Mark as {data.status === "Active" ? "Inactive" : "Active"}
                </button>
            </div>
        </div>
    );
}
