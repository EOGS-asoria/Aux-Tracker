import React, { useState, useEffect } from "react";
import Button from "@/app/_components/button";
import Select from "@/app/_components/select";
import Table from "@/app/_components/table";
import { useDispatch, useSelector } from "react-redux";
import { setTime } from "@/app/_redux/app-slice";
import moment from "moment";

export default function TimePageSection() {
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
    const { timeLogs } = useSelector((state) => state.app);

    const time = useSelector((state) => state.app.time);
    const logs = useSelector((state) => state.app.logs);

    useEffect(() => {
        if (time.status) {
            setEntries((prevEntries) => [
                ...prevEntries,
                {
                    logName: time.status,
                    timestamp: time.timer,
                    status: time.status,
                    user: "User",
                    details: `${time.status} action logged.`,
                    currentTime: new Date().toLocaleTimeString(),
                },
            ]);
        }
    }, [time]);

    useEffect(() => {
        if (breakTimeRemaining > 0 && breakStartTime) {
            const breakIntervalId = setInterval(() => {
                const elapsedTime = Math.floor(
                    (Date.now() - breakStartTime) / 1000
                );
                const remainingTime = 900 - elapsedTime; // 15 minutes = 900 seconds
                setBreakTimeRemaining(remainingTime > 0 ? remainingTime : 0);
                if (remainingTime <= 0) {
                    clearInterval(breakIntervalId);
                    setIsBreakOver(true);
                    setBreakTimeRemaining(0);
                }
            }, 1000);
            return () => clearInterval(breakIntervalId);
        }
    }, [breakTimeRemaining, breakStartTime]);

    const handleSelectChange = (e) => {
        const value = e.target.value;
        dispatch(
            setTime({
                status: value,
                timer: moment().format("LLLL"),
            })
        );
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins < 10 ? "0" : ""}${mins}:${secs < 10 ? "0" : ""}${secs}`;
    };
    console.log("timeLogs", timeLogs);
    return (
        <div className="mx-auto p-4">
            <div className="p-6 bg-gray-100 min-h-screen">
                <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center mb-6">
                    <h1 className="text-3xl font-bold mt-4 mb-8 text-gray-700">
                        Time Keeping
                    </h1>

                    <div className="flex flex-col space-y-4 w-full max-w-md">
                        <div className="relative">
                            <Select
                                options={[
                                    { value: "Clock In", label: "Clock In" },
                                    { value: "Break", label: "Break" },
                                    { value: "Back", label: "Back" },
                                    { value: "Clock Out", label: "Clock Out" },
                                ]}
                                value={selectedTime}
                                onChange={handleSelectChange}
                                label="Select Time"
                                name="select"
                                disabled={isDisabled}
                            />
                        </div>

                        {warningMessage && (
                            <p className="text-red-500">{warningMessage}</p>
                        )}
                    </div>

                    <div className="mt-6 text-center">
                        <h2 className="text-xl font-semibold mb-4">
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
                </div>

                <div className="mt-8 p-4 bg-white rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-700">
                        Action Log
                    </h2>
                    <Table
                        dataChecked={dataChecked}
                        setDataChecked={setDataChecked}
                        data={timeLogs}
                        columns={[
                            {
                                title: "Action",
                                key: "logName",
                            },
                            {
                                title: "CLock In",
                                key: "clock_in",
                            },
                            {
                                title: "Clock Out",
                                key: "clock_out",
                            },
                            {
                                title: "Lunch In",
                                key: "lunch_in",
                            },
                            {
                                title: "Lunch Out",
                                key: "lunch_out",
                            },
                            {
                                title: "Floor In",
                                key: "floor_in",
                            },
                            {
                                title: "Floor Out",
                                key: "floor_out",
                            },
                            {
                                title: "Action",
                                key: "action",
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
