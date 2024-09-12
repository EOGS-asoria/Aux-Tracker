import React, { useState } from "react";
import TimerButtonComponent from "../_components/timer-button-component";
import { useDispatch, useSelector } from "react-redux";
import { setTime } from "@/app/_redux/app-slice";
import moment from "moment";
import { create_time_in_thunk } from "../_redux/admin-thunk";
import store from "@/store/store";
import { get_time_in_user_by_id_thunk } from "@/app/_redux/app-thunk";

export default function TimerButtonSection() {
    const dispatch = useDispatch();
    const { user,timeLogs } = useSelector((state) => state.app);
    // State to keep track of the current status for each button
    const [statuses, setStatuses] = useState({
        clock: "Clock In",
        break: "Break",
        lunch: "Lunch In",
        meeting: "Meeting In",
        coaching: "Coaching In",
        floorSupport: "Floor Support In",
    });

    // Handle button clicks and toggle the status
    // function handleButtonClick(action) {
    //     let newStatus = action;
    //     let newStatuses = { ...statuses };

    //     // Toggle the statuses for buttons that have two states
    //     switch (action) {
    //         case "Clock In":
    //             // Change to "Clock Out" only if it's currently "Clock In"
    //             if (statuses.clock === "Clock In") {
    //                 newStatus = "Clock Out";
    //                 newStatuses.clock = newStatus;
    //             } else {
    //                 newStatus = "Clock In";
    //                 newStatuses.clock = newStatus;
    //             }
    //             break;
    //         case "Break":
    //             newStatus = statuses.break === "Break" ? "Back" : "Break";
    //             newStatuses.break = newStatus;
    //             break;
    //         case "Lunch In":
    //             newStatus =
    //                 statuses.lunch === "Lunch In" ? "Lunch Back" : "Lunch In";
    //             newStatuses.lunch = newStatus;
    //             break;
    //         case "Meeting In":
    //             newStatus =
    //                 statuses.meeting === "Meeting In"
    //                     ? "Meeting Out"
    //                     : "Meeting In";
    //             newStatuses.meeting = newStatus;
    //             break;
    //         case "Coaching In":
    //             newStatus =
    //                 statuses.coaching === "Coaching In"
    //                     ? "Coaching Out"
    //                     : "Coaching In";
    //             newStatuses.coaching = newStatus;
    //             break;
    //         case "Floor Support In":
    //             newStatus =
    //                 statuses.floorSupport === "Floor Support In"
    //                     ? "Floor Support Out"
    //                     : "Floor Support In";
    //             newStatuses.floorSupport = newStatus;
    //             break;
    //         default:
    //             break;
    //     }

    //     // Update the statuses state
    //     setStatuses(newStatuses);

    //     // Dispatch the action to the Redux store
    //     dispatch(
    //         setTime({
    //             status: newStatus,
    //             timer: moment().format("LLLL"),
    //         })
    //     );
    // }

    // async function handleClockInButton(value) {
    //     let res = await store.dispatch(
    //         create_time_in_thunk({
    //             user_id: user.id,
    //             clock: value,
    //             date: moment().format("LLLL"),
    //         })
    //     );
    //     store.dispatch(get_time_in_user_by_id_thunk(user.id));
    //     console.log("resres", res);
    // }

   async function clickInHandler(value) {
        let res = await store.dispatch(
            create_time_in_thunk({
                user_id: user.id,
                clock: value,
                date: moment().format("LLLL"),
            })
        );
        store.dispatch(get_time_in_user_by_id_thunk(user.id));
        console.log("resres", res);
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
                    onClick={() => clickInHandler("ClockIn")}
                    className={`w-37 flex justify-center items-center ${
                        statuses.clock === "Clock In"
                            ? "bg-blue-500 hover:bg-blue-600"
                            : "bg-gray-500 hover:bg-gray-600"
                    }`}
                    type="button"
                >
                    {statuses.clock}
                </TimerButtonComponent>
            </div>

            
           <>
           <div>
                <TimerButtonComponent
                    onClick={() => handleButtonClick("Break")}
                    className={`w-37 flex justify-center items-center ${
                        statuses.break === "Break"
                            ? "bg-yellow-500 hover:bg-yellow-600"
                            : "bg-gray-500 hover:bg-gray-600"
                    }`}
                    type="button"
                >
                    {statuses.break}
                </TimerButtonComponent>
            </div>
            <div>
                <TimerButtonComponent
                    onClick={() => handleButtonClick("Lunch In")}
                    className={`w-37 flex justify-center items-center ${
                        statuses.lunch === "Lunch In"
                            ? "bg-red-500 hover:bg-red-600"
                            : "bg-gray-500 hover:bg-gray-600"
                    }`}
                    type="button"
                >
                    {statuses.lunch}
                </TimerButtonComponent>
            </div>
            <div>
                <TimerButtonComponent
                    onClick={() => handleButtonClick("Meeting In")}
                    className={`w-37 flex justify-center items-center ${
                        statuses.meeting === "Meeting In"
                            ? "bg-green-500 hover:bg-green-600"
                            : "bg-gray-500 hover:bg-gray-600"
                    }`}
                    type="button"
                >
                    {statuses.meeting}
                </TimerButtonComponent>
            </div>
            <div>
                <TimerButtonComponent
                    onClick={() => handleButtonClick("Coaching In")}
                    className={`w-37 flex justify-center items-center ${
                        statuses.coaching === "Coaching In"
                            ? "bg-orange-500 hover:bg-orange-600"
                            : "bg-gray-500 hover:bg-gray-600"
                    }`}
                    type="button"
                >
                    {statuses.coaching}
                </TimerButtonComponent>
            </div>
            <div>
                <TimerButtonComponent
                    onClick={() => handleButtonClick("Floor Support In")}
                    className={`w-37 flex justify-center items-center ${
                        statuses.floorSupport === "Floor Support In"
                            ? "bg-teal-500 hover:bg-teal-600"
                            : "bg-gray-500 hover:bg-gray-600"
                    }`}
                    type="button"
                >
                    {statuses.floorSupport}
                </TimerButtonComponent>
            </div>
           </>
        </div>
    );
}
