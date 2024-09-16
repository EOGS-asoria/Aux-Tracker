import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTime } from "@/app/_redux/app-slice";
import moment from "moment";
import TimerButtonComponent from "../../_components/timer-button-component";
import ActionLogSections from "./action-log-sections";

export default function TimePageSection() {
    const { time } = useSelector((state) => state.app);
    const dispatch = useDispatch();
    const [status, setStatus] = useState("");
    const [warningMessage, setWarningMessage] = useState("");
    const [breakTimeRemaining, setBreakTimeRemaining] = useState(0);
    const [intervalId, setIntervalId] = useState(null);

    useEffect(() => {
        return () => clearInterval(intervalId);
    }, [intervalId]);

    const handleStatusChange = (action) => {
        let newStatus = status;
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
                newStatus = status === "Floor Support" ? "Floor Support Out" : "Floor Support";
                break;
            default:
                break;
        }
        setStatus(newStatus);
        dispatch(
            setTime({
                status: newStatus,
                timer: moment().format("LLLL"),
            })
        );
    };

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
        if (breakTimeRemaining > 0) {
            const id = setInterval(() => {
                setBreakTimeRemaining((prev) => prev - 1);
                if (breakTimeRemaining <= 0) {
                    clearInterval(id);
                    setWarningMessage("Break is over.");
                }
            }, 1000);
            setIntervalId(id);
        }
    };

    const stopTimer = () => {
        clearInterval(intervalId);
        setIntervalId(null);
        setBreakTimeRemaining(0);
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins < 10 ? "0" : ""}${mins}:${secs < 10 ? "0" : ""}${secs}`;
    };

    return (
        <div className="mx-auto p-4">
            <div className="p-6 bg-gray-100 min-h-screen">
                <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center mb-6">
                    <h1 className="text-3xl font-bold mt-4 mb-8 text-gray-700">
                        Time Keeping
                    </h1>
                    <p className="text-xl text-gray-600">
                        Current Status:
                        <span className="font-bold text-blue-600 ml-2">{status}</span>
                    </p>
                    <div className="flex gap-2 mt-2">
                        {["Active", "Break", "Lunch", "Meeting", "Coaching", "Floor Support"].map((action) => (
                            <TimerButtonComponent
                                key={action}
                                onClick={() => handleStatusChange(action)}
                                className={`flex items-center justify-center px-4 py-2 text-white font-semibold rounded w-40 ${status === action
                                    ? "bg-blue-600"
                                    : "bg-gray-400 hover:bg-gray-500"
                                    }`}
                            >
                                {status === action ? `${action} Out` : action}
                            </TimerButtonComponent>
                        ))}
                    </div>


                    {warningMessage && <p className="text-red-500">{warningMessage}</p>}
                    <div className="mt-6 text-center">
                        <h2 className="text-xl font-semibold mb-4">
                            {time.status} {time.timer}
                        </h2>
                        {status === "Break" && breakTimeRemaining > 0 && (
                            <>
                                <p className="text-yellow-500">Break is in progress...</p>
                                <p className="text-yellow-500">
                                    Break Time Remaining: {formatTime(breakTimeRemaining)}
                                </p>
                            </>
                        )}
                        {/* {status === "Break" && breakTimeRemaining <= 0 && (
                            <p className="text-green-500">Break is over</p>
                        )} */}
                    </div>
                </div>
                <ActionLogSections />
            </div>
        </div>
    );
}
