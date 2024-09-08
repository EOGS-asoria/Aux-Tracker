import Button from "@/app/_components/button";
import React, { useState } from "react";
import TimerButtonComponent from "../_components/timer-button-component";

export default function TimerButtonSection() {
    const [clockIn, setClockIn] = useState(true);
    const [breaks, setBreaks] = useState(true);
    const [lunch, setLunch] = useState(true);
    const [meeting, setMeeting] = useState(true);
    const [coaching, setCoaching] = useState(true);
    const [floor, setFloor] = useState(true);

    function clickInHandler() {
        setClockIn(!clockIn);
    }

    function clickBreakHandler() {
        setBreaks(!breaks);
    }

    function clickLunchHandler() {
        setLunch(!lunch);
    }

    function clickMeetingHandler() {
        setMeeting(!meeting);
    }

    function clickCoachingHandler() {
        setCoaching(!coaching);
    }

    function clickFloorHandler() {
        setFloor(!floor);
    }

    return (
        <div className="hidden sm:inline-flex gap-6 items-center justify-center">
            <div>
                <TimerButtonComponent
                    onClick={clickInHandler}
                    className={`w-37 flex justify-center items-center ${
                        clockIn
                            ? "bg-blue-500 hover:bg-blue-600"
                            : "bg-gray-500 hover:bg-gray-600"
                    }`}
                    type="button"
                >
                    {clockIn ? "Clock In" : "Clock Out"}
                </TimerButtonComponent>
            </div>
            <div>
                <TimerButtonComponent
                    onClick={clickBreakHandler}
                    className={`w-37 flex justify-center items-center ${
                        breaks
                            ? "bg-yellow-500 hover:bg-yellow-600"
                            : "bg-gray-500 hover:bg-gray-600"
                    }`}
                    type="button"
                >
                    {breaks ? "Break" : "Back"}
                </TimerButtonComponent>
            </div>
            <div>
                <TimerButtonComponent
                    onClick={clickLunchHandler}
                    className={`w-37 flex justify-center items-center ${
                        lunch
                            ? "bg-red-500 hover:bg-red-600"
                            : "bg-gray-500 hover:bg-gray-600"
                    }`}
                    type="button"
                >
                    {lunch ? "Lunch In" : "Lunch Back"}
                </TimerButtonComponent>
            </div>
            <div>
                <TimerButtonComponent
                    onClick={clickMeetingHandler}
                    className={`w-37 flex justify-center items-center ${
                        meeting
                            ? "bg-green-500 hover:bg-green-600"
                            : "bg-gray-500 hover:bg-gray-600"
                    }`}
                    type="button"
                >
                    {meeting ? "Meeting In" : "Meeting Out"}
                </TimerButtonComponent>
            </div>
            <div>
                <TimerButtonComponent
                    onClick={clickCoachingHandler}
                    className={`w-37 flex justify-center items-center ${
                        coaching
                            ? "bg-orange-500 hover:bg-orange-600"
                            : "bg-gray-500 hover:bg-gray-600"
                    }`}
                    type="button"
                >
                    {coaching ? "Coaching In" : "Coaching Out"}
                </TimerButtonComponent>
            </div>
            <div>
                <TimerButtonComponent
                    onClick={clickFloorHandler}
                    className={`w-37 flex justify-center items-center ${
                        floor
                            ? "bg-teal-500 hover:bg-teal-600"
                            : "bg-gray-500 hover:bg-gray-600"
                    }`}
                    type="button"
                >
                    {floor ? "Floor support In" : "Floor support Out"}
                </TimerButtonComponent>
            </div>
        </div>
    );
}
