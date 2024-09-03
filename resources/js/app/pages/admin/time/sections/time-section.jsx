            import React, { useState, useEffect } from 'react';
            import Button from '@/app/_components/button';
            import Select from '@/app/_components/select';
            import Table from '@/app/_components/table'; // Import your Table component

            export default function TimePageSection() {
                const [selectedTime, setSelectedTime] = useState('');
                const [isDisabled, setIsDisabled] = useState(false);
                const [isPaused, setIsPaused] = useState(false);
                const [time, setTime] = useState(0); 
                const [intervalId, setIntervalId] = useState(null);
                const [warningMessage, setWarningMessage] = useState(''); 
                const [hasClockedIn, setHasClockedIn] = useState(false); 
                const [entries, setEntries] = useState([]); // State to keep track of all actions
                const [dataChecked, setDataChecked] = useState([]);
                const [rowsPerPage, setRowsPerPage] = useState(10);
                const [currentPage, setCurrentPage] = useState(1);

                const handleSelectChange = (e) => {
                    const value = e.target.value;
                    setSelectedTime(value);

                    const now = new Date();
                    const formattedDate = now.toLocaleDateString();
                    const formattedTime = now.toLocaleTimeString();
                    const formattedCurrentTime = formatTime(time); // Get formatted current time
                    let status = 'Pending';
                    if (value === 'Clock Out') {
                        status = 'Completed';
                    } else if (value === 'Break') {
                        status = 'Paused';
                    } else if (value === 'Back') {
                        status = 'Resume';
                    }

                    const entry = { 
                        logName: value,
                        timestamp: `${formattedDate} ${formattedTime}`,
                        status,
                        user: 'User', // Replace with dynamic user if available
                        details: `Action performed: ${value}`,
                        currentTime: formattedCurrentTime
                    };

                    if (value === 'Clock In') {
                        if (hasClockedIn) {
                            setWarningMessage('Cannot Clock In again while the timer is running.'); 
                        } else {
                            setIsDisabled(true); 
                            startTimer(); 
                            setHasClockedIn(true); 
                            setWarningMessage(''); 
                            setEntries(prevEntries => [...prevEntries, { ...entry, logName: 'Clock In' }]); // Add Clock In entry
                        }
                    } else if (!hasClockedIn) {
                        setWarningMessage('Please Clock In first before taking any other action.'); 
                    } else if (value === 'Break') {
                        setIsPaused(true); 
                        pauseTimer(); 
                        setWarningMessage('Clock is paused.'); 
                        setEntries(prevEntries => [...prevEntries, { ...entry, logName: 'Break' }]); // Add Break entry
                    } else if (value === 'Back') {
                        if (isPaused) {
                            setIsPaused(false); 
                            resumeTimer(); 
                            setWarningMessage(''); 
                            setEntries(prevEntries => [...prevEntries, { ...entry, logName: 'Back' }]); // Add Back entry
                        } else {
                            setWarningMessage('Cannot go back without taking a break first.'); 
                        }
                    } else if (value === 'Clock Out') {
                        setIsDisabled(false); 
                        stopTimer(); 
                        setHasClockedIn(false); 
                        setIsPaused(false); 
                        setWarningMessage(''); 
                        setEntries(prevEntries => [...prevEntries, { ...entry, logName: 'Clock Out' }]); // Add Clock Out entry
                    }
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
                    startTimer();
                };

                const stopTimer = () => {
                    clearInterval(intervalId);
                    setIntervalId(null);
                    setTime(0); 
                };

                const formatTime = (seconds) => {
                    const mins = Math.floor(seconds / 60);
                    const secs = seconds % 60;
                    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
                };

                return (
                    <div>
                        <div className="p-6 bg-gray-100 min-h-screen">
                            <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center mb-6">
                                <h1 className="text-3xl font-bold mt-4 mb-8 text-gray-700">Time Keeping</h1>
                                <div className="flex flex-col space-y-4 w-full max-w-md">
                                    <div className="relative">
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
                                    </div>

                                    {warningMessage && <p className="text-red-500">{warningMessage}</p>} 
                                </div>

                                <div className="mt-6 text-center">
                                    <h2 className="text-xl font-semibold mb-4">Current Time: {formatTime(time)}</h2>
                                    {selectedTime === 'Clock In' && !isPaused && <p className="text-green-500">Clock is running...</p>}
                                </div>

                                <Button
                                    className="flex items-center justify-center"
                                    loading={false}
                                    type={'submit'}
                                    onClick={() => alert(`Selected action: ${selectedTime}`)}
                                >
                                    Submit
                                </Button>
                            </div>

                            {/* Table to display the entries */}
                                        <div className="mt-8 p-4 bg-white rounded-lg shadow-md">
                                            <h2 className="text-2xl font-semibold mb-4 text-gray-700">Action Log</h2>
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
                                                                className={`px-2 py-1 rounded-full text-sm font-semibold ${text === 'Completed' ? 'bg-green-100 text-green-800' : text === 'Paused' ? 'bg-yellow-100 text-yellow-800' : text === 'Resume' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}
                                                            >
                                                                {text}
                                                            </span>
                                                        )
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
                                                                <button onClick={() => handleView(record)} className="text-blue-500 hover:underline">View</button>
                                                                <button onClick={() => handleDelete(record)} className="text-red-500 hover:underline">Delete</button>
                                                            </div>
                                                        )
                                                    } 
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
