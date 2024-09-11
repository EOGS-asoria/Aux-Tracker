import React, { useState, useEffect } from "react";
import Button from "@/app/_components/button";
import Select from "@/app/_components/select";
import Table from "@/app/_components/table";
import { useDispatch, useSelector } from "react-redux";
import { setTime } from "@/app/_redux/app-slice";
import moment from "moment";
import TimerButtonComponent from "../../_components/timer-button-component";

export default function TimePageSection() {
    const { time } = useSelector((state) => state.app);
    const dispatch = useDispatch();
    const [selectedTime, setSelectedTime] = useState("");
    const [isDisabled, setIsDisabled] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    
    const [intervalId, setIntervalId] = useState(null);
    const [warningMessage, setWarningMessage] = useState("");
    const [hasClockedIn, setHasClockedIn] = useState(false);
    const [entries, setEntries] = useState([]);
    const [dataChecked, setDataChecked] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [breakTimeRemaining, setBreakTimeRemaining] = useState(0);
    const [breakStartTime, setBreakStartTime] = useState(null);
    const [isBreakOver, setIsBreakOver] = useState(false);
    const [clockInTime, setClockInTime] = useState("");

    // Action logs functions for buttons outside

    // useEffect(() => {
    //     if (time.status) {
    //         setEntries((prevEntries) => [
    //             ...prevEntries,
    //             {
    //                 logName: time.status,
    //                 timestamp: time.timer,
    //                 status: time.status,
    //                 user: "User",
    //                 details: `${time.status} action logged.`,
    //                 currentTime: new Date().toLocaleTimeString(),
    //             },
    //         ]);
    //     }
    // }, [time]);

    // useEffect(() => {
    //     if (breakTimeRemaining > 0 && breakStartTime) {
    //         const breakIntervalId = setInterval(() => {
    //             const elapsedTime = Math.floor(
    //                 (Date.now() - breakStartTime) / 1000
    //             );
    //             const remainingTime = 900 - elapsedTime; // 15 minutes = 900 seconds
    //             setBreakTimeRemaining(remainingTime > 0 ? remainingTime : 0);
    //             if (remainingTime <= 0) {
    //                 clearInterval(breakIntervalId);
    //                 setIsBreakOver(true);
    //                 setBreakTimeRemaining(0);
    //             } 
    //         }, 1000);
    //         return () => clearInterval(breakIntervalId);
    //     }
    // }, [breakTimeRemaining, breakStartTime]);

    const handleSelectChange = (e) => {
        const value = e.target.value;
        dispatch(
            setTime({
                status: value,
                timer: moment().format("LLLL"),
            })
        );
    };

    useEffect(() => {
        return () => clearInterval(intervalId);
    }, [intervalId]);

    const startTimer = () => {
        if (!intervalId) {
            const id = setInterval(() => {
                setTime((prevTime) => prevTime + 1);
            }, 1000);
            setIntervalId(id);
        }
    };

    const pauseTimer = () => {
        clearInterval(intervalId);
        setIntervalId(null);
    };

    const resumeTimer = () => {
        if (isPaused) {
            const id = setInterval(() => {
                if (breakTimeRemaining > 0) {
                    setBreakTimeRemaining((prev) => prev - 1);
                } else {
                    clearInterval(id);
                    setIsPaused(false);
                    setBreakTimeRemaining(0);
                    setWarningMessage("Break is over.");
                    setEntries((prevEntries) => [
                        ...prevEntries,
                        {
                            logName: "Break",
                            timestamp: `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`,
                            status: "Break Ended",
                            user: "User",
                            details: "Break ended.",
                            currentTime: "Break is over",
                        },
                    ]);
                }
            }, 1000);
            setIntervalId(id);
        }
    };

    const stopTimer = () => {
        clearInterval(intervalId);
        setIntervalId(null);
        setTime(0);
        setBreakTimeRemaining(0); // Reset break time
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins < 10 ? "0" : ""}${mins}:${secs < 10 ? "0" : ""}${secs}`;
    };

    const [status, setStatus] = useState("");

    // Handle status change and toggle
    function handleStatusChange(action) {
        let newStatus = action;

        switch (action) {
            case "Active":
                newStatus = status === "Active" ? "Inactive" : "Active";
                break;
            case "Break":
                newStatus = status === "Break" ? "Back" : "Break";
                break;
            case "Lunch":
                newStatus = status === "Lunch" ? "Lunch Back" : "Lunch";
                break;
            case "Meeting":
                newStatus = status === "Meeting" ? "Meeting Out" : "Meeting";
                break;
            case "Coaching":
                newStatus = status === "Coaching" ? "Coaching Out" : "Coaching";
                break;
            case "Floor Support":
                newStatus =
                    status === "Floor Support"
                        ? "Floor Support Out"
                        : "Floor Support";
                break;
            default:
                break;
        }
        // Set the new status
        setStatus(newStatus);
    }

    return (
        <div className="mx-auto p-4">
            <div className="p-6 bg-gray-100 min-h-screen">
                <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center mb-6">
                    <h1 className="text-3xl font-bold mt-4 mb-8 text-gray-700">
                        Time Keeping
                    </h1>
                    <div className="mt-4">
                        {/* Current Status Display */}
                        <p className="text-xl text-gray-600">
                            Current Status:
                            <span className="font-bold text-blue-600 ml-2">
                                {status}
                            </span>
                        </p>
                        {/* Status Controls as Buttons */}
                        <div className="flex gap-2 mt-2">
                            <TimerButtonComponent
                                onClick={() => handleStatusChange("Active")}
                                className={`px-4 py-2 text-white font-semibold rounded ${
                                    status === "Active"
                                        ? "bg-blue-600"
                                        : "bg-gray-400 hover:bg-gray-500"
                                }`}
                            >
                                Active
                            </TimerButtonComponent>
                            <TimerButtonComponent
                                onClick={() => handleStatusChange("Break")}
                                className={`px-4 py-2 text-white font-semibold rounded ${
                                    status === "Break"
                                        ? "bg-yellow-500"
                                        : "bg-gray-400 hover:bg-gray-500"
                                }`}
                            >
                                Break
                            </TimerButtonComponent>
                            <TimerButtonComponent
                                onClick={() => handleStatusChange("Lunch")}
                                className={`px-4 py-2 text-white font-semibold rounded ${
                                    status === "Lunch"
                                        ? "bg-red-500"
                                        : "bg-gray-400 hover:bg-gray-500"
                                }`}
                            >
                                Lunch
                            </TimerButtonComponent>
                            <TimerButtonComponent
                                onClick={() => handleStatusChange("Meeting")}
                                className={`px-4 py-2 text-white font-semibold rounded ${
                                    status === "Meeting"
                                        ? "bg-green-500"
                                        : "bg-gray-400 hover:bg-gray-500"
                                }`}
                            >
                                Meeting
                            </TimerButtonComponent>
                            <TimerButtonComponent
                                onClick={() => handleStatusChange("Coaching")}
                                className={`px-4 py-2 text-white font-semibold rounded ${
                                    status === "Coaching"
                                        ? "bg-orange-500"
                                        : "bg-gray-400 hover:bg-gray-500"
                                }`}
                            >
                                Coaching
                            </TimerButtonComponent>
                            <TimerButtonComponent
                                onClick={() =>
                                    handleStatusChange("Floor Support")
                                }
                                className={`px-4 py-2 text-white font-semibold rounded ${
                                    status === "Floor Support"
                                        ? "bg-teal-500"
                                        : "bg-gray-400 hover:bg-gray-500"
                                }`}
                            >
                                Floor Support
                            </TimerButtonComponent>
                        </div>
                    </div>

                    <div className="flex flex-col space-y-4 w-full max-w-md">
                        {/* <div className="relative">
                            <Select
                                options={[
                                    { value: 'Clock In', label: 'Clock In' },
                                    { value: 'Break', label: 'Break' },
                                    { value: 'Back', label: 'Back' },
                                    { value: 'Clock Out', label: 'Clock Out' },
                                ]}
                                value={selectedTime}
                                onChange={handleSelectChange}
                                label="Select Time"
                                name="select"
                                disabled={isDisabled}
                            />
                        </div> */}

                        {warningMessage && (
                            <p className="text-red-500">{warningMessage}</p>
                        )}
                    </div>

                    <div className="mt-6 text-center">
                        <h2 className="text-xl font-semibold mb-4">
                            {selectedTime === "Clock In" && !isPaused
                                ? `You Clocked at ${clockInTime}`
                                : selectedTime === "Break" && isPaused
                                ? `You Break In at ${clockInTime}`
                                : selectedTime === "Back" && !isPaused
                                ? `Back at ${new Date().toLocaleTimeString()}`
                                : selectedTime === "Clock Out"
                                ? `You Clocked Out at ${new Date().toLocaleTimeString()}`
                                : !hasClockedIn
                                ? ""
                                : ``}







                            {/* Display Message Using Redux */}
                            {time.status} {time.timer}








                            
                        </h2>
                        {selectedTime === "Break" &&
                            isPaused &&
                            breakTimeRemaining > 0 && (
                                <>
                                    <p className="text-yellow-500">
                                        Break is in progress...
                                    </p>
                                    <p className="text-yellow-500">
                                        Break Time Remaining:{" "}
                                        {formatTime(breakTimeRemaining)}
                                    </p>
                                </>
                            )}
                        {selectedTime === "Break" && isBreakOver && (
                            <p className="text-green-500">Break is over</p>
                        )}
                    </div>

                    {/* <Button
                        className="flex items-center justify-center"
                        loading={false}
                        type={'submit'}
                        onClick={() => alert(`Selected action: ${selectedTime}`)}
                    >
                        Submit 
                    </Button> */}
                </div>

                <div className="mt-8 p-4 bg-white rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-700">
                        Action Log
                    </h2>
                    <Table
                        dataChecked={dataChecked}
                        setDataChecked={setDataChecked}
                        data={entries}
                        columns={[
                            {
                                title: "Action",
                                key: "logName",
                            },
                            {
                                title: "Timestamp",
                                key: "timestamp",
                            },
                            {
                                title: "Current Time",
                                key: "currentTime",
                            },
                            {
                                title: "Status",
                                key: "status",
                                render: (text) => (
                                    <span
                                        className={`px-2 py-1 rounded-full text-sm font-semibold ${
                                            text === "Completed"
                                                ? "bg-green-100 text-green-800"
                                                : text === "Paused"
                                                ? "bg-yellow-100 text-yellow-800"
                                                : text === "Resume"
                                                ? "bg-blue-100 text-blue-800"
                                                : "bg-gray-100 text-gray-800"
                                        }`}
                                    >
                                        {text}
                                    </span>
                                ),
                            },
                            {
                                title: "Details",
                                key: "details",
                            },
                            {
                                title: "Action",
                                key: "action",
                                render: (_, record) => (
                                    <div className="flex space-x-4">
                                        <button
                                            onClick={() => handleView(record)}
                                            className="text-blue-500 hover:underline"
                                        >
                                            View
                                        </button>
                                        <button
                                            onClick={() => handleDelete(record)}
                                            className="text-red-500 hover:underline"
                                        >
                                            Delete
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
        </div>
    );
}
