import React, { createContext, useState, useContext } from 'react';

const TimerContext = createContext();

export function TimerProvider({ children }) {
    const [clockIn, setClockIn] = useState(false);
    const [breaks, setBreaks] = useState(false);
    const [lunch, setLunch] = useState(false);
    const [meeting, setMeeting] = useState(false);
    const [coaching, setCoaching] = useState(false);
    const [floor, setFloor] = useState(false);

    const value = {
        clockIn, setClockIn,
        breaks, setBreaks,
        lunch, setLunch,
        meeting, setMeeting,
        coaching, setCoaching,
        floor, setFloor
    };

    return (
        <TimerContext.Provider value={value}>
            {children}
        </TimerContext.Provider>
    );
}

export function useTimer() {
    return useContext(TimerContext);
}
