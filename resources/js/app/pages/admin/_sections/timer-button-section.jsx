import Button from "@/app/_components/button";
import React, { useState } from "react";
import TimerButtonComponent from "../_components/timer-button-component";

export default function TimerButtonSection() {
    const [clockIn, setClockIn] = useState(true);
    const [breaks, setBreaks] = useState(true);
    const [lunch, setLunch] = useState(true);
    const [Meeting, setMeeting] = useState(true);
    const [Coaching, setCoaching] = useState(true);
    const [Floor, setFloor] = useState(true);

    function clickInHandler(params) {
        setClockIn(!clockIn);
    }

    function clickBreakHandler(params) {
        setBreaks(!breaks);
    }

    function clickLunchHandler(params) {
        setLunch(!lunch);
    }

    function clickMeetingHandler(params) {
        setMeeting(!Meeting);
    }
    function clickCoachingHandler(params) {
        setCoaching(!Coaching);
    }
    function clickFloorHandler(params) {
        setFloor(!Floor);
    }

    return (
        <div className="hidden sm:inline-flex gap-6  items-center justify-center">
        <div>
            <TimerButtonComponent
                onClick={clickInHandler}
                className={`w-37 ${
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
                className={`w-37 ${
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
                className={`w-37 ${
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
                className={`w-37 ${
                    Meeting
                        ? "bg-green-500 hover:bg-green-600"
                        : "bg-gray-500 hover:bg-gray-600"
                }`}
                type="button"
            >
                {Meeting ? "Meeting In" : "Meeting Out"}
            </TimerButtonComponent>
        </div>
    
        <div>
            <TimerButtonComponent
                onClick={clickCoachingHandler}
                className={`w-37 ${
                    Coaching
                        ? "bg-orange-500 hover:bg-orange-600"
                        : "bg-gray-500 hover:bg-gray-600"
                }`}
                type="button"
            >
                {Coaching ? "Coaching In" : "Coaching Out"}
            </TimerButtonComponent>
        </div>
    
        <div>
            <TimerButtonComponent
                onClick={clickFloorHandler}
                className={`w-37 ${
                    Floor
                        ? "bg-teal-500 hover:bg-teal-600"
                        : "bg-gray-500 hover:bg-gray-600"
                }`}
                type="button"
            >
                {Floor ? "Floor support In" : "Floor support Out"}
            </TimerButtonComponent>
        </div>
    </div>
    
    );
}
