import React, { useState, useEffect } from 'react';
import Button from '@/app/_components/button';
import Select from '@/app/_components/select';

export default function TimePageSection() {
    const [selectedTime, setSelectedTime] = useState('');
    const [isDisabled, setIsDisabled] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [time, setTime] = useState(0); 
    const [intervalId, setIntervalId] = useState(null);
    const [warningMessage, setWarningMessage] = useState(''); 
    const [hasClockedIn, setHasClockedIn] = useState(false); 

    const handleSelectChange = (e) => {
        const value = e.target.value;
        setSelectedTime(value);

        if (value === 'Clock In') {
            if (hasClockedIn) {
                setWarningMessage('Cannot Clock In again while the timer is running.'); 
            } else {
                setIsDisabled(true); 
                startTimer(); 
                setHasClockedIn(true); 
                setWarningMessage(''); 
            }
        } else if (value === 'Break') {
            if (!hasClockedIn) {
                setWarningMessage('Cannot take a break without Clocking In first.'); 
            } else {
                setIsPaused(true); 
                pauseTimer(); 
                setWarningMessage('Clock is paused.'); 
            }
        } else if (value === 'Back') {
            if (isPaused) {
                setIsPaused(false); 
                resumeTimer(); 
                setWarningMessage(''); 
            } else {
                setWarningMessage('Cannot go back without taking a break first.'); 
            }
        } else if (value === 'Clock Out') {
            setIsDisabled(false); 
            stopTimer(); 
            setHasClockedIn(false); 
            setIsPaused(false); 
            setWarningMessage(''); 
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

                        {warningMessage && <p className="text-red-500">{warningMessage}</p>} {/* Display single warning message */}
                    </div>

                    {/* New Time Section */}
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
            </div>
        </div>
    );
}
