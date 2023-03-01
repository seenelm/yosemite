import React, { useState } from "react";
import moment from "moment";
import '../css/schedule.css'
import Bm from "../assets/bee.png";
import Ye from '../assets/me.png';
import Nc from '../assets/nc.png';
import Kp from '../assets/kp.png';
import Rw from '../assets/rob.png';
import Ap from '../assets/apl.png';
import Kf from '../assets/kf.png';



const Schedule = () => {
    const [week, setWeek] = useState(moment());
    const [showPopup, setShowPopup] = useState(false);
    const [selectedShift, setSelectedShift] = useState("");
    const [selectedEmployee, setSelectedEmployee] = useState("");
    const [selectedDay, setSelectedDay] = useState(null);

    const employees = ["Bee Murphy", "Yassine Elmellouki", "Nick Ceraso", "Kathryn Pedi", "Rob Walek", "Katie Fandozzi", "Anthony Pierre-Louis",];

    const daysInWeek = [];
    const startDate = week.startOf("week");
    for (let i = 0; i < 6; i++) {
        const day = startDate.clone().add(i, "days");
        if (day.isoWeekday() < 6) {
            daysInWeek.push(day);
        }
    }

    const handlePrevWeek = () => {
        setWeek(week.clone().subtract(1, "weeks"));
    };

    const handleNextWeek = () => {
        setWeek(week.clone().add(1, "weeks"));
    };

    const handleCellDoubleClick = (employee, day, shift) => {
        setSelectedEmployee(employee);
        setSelectedDay(day);
        setSelectedShift(shift);
        setShowPopup(true);
    };

    const handleShiftClick = (shift) => {
        setSelectedShift(shift);
    };

    const handlePopupClose = () => {
        setShowPopup(false);
        setSelectedShift("");
        setSelectedEmployee("");
        setSelectedDay(null);
    };

    const handleSave = () => {
        const key = `${selectedEmployee}_${selectedDay.format("YYYY-MM-DD")}`;
        const currentShifts = getShifts(selectedEmployee, selectedDay);
        let updatedShifts = { ...shifts };
        if (currentShifts.length) {
            updatedShifts = { ...shifts, [key]: [selectedShift] };
        } else {
            updatedShifts = { ...shifts, [key]: [...currentShifts, selectedShift] };
        }
        setShifts(updatedShifts);
        localStorage.setItem("shifts", JSON.stringify(updatedShifts));
        handlePopupClose();
    };

    const [shifts, setShifts] = useState(JSON.parse(localStorage.getItem("shifts")) || {});

    const getShifts = (employee, day) => {
        const key = `${employee}_${day.format("YYYY-MM-DD")}`;
        return shifts[key] || [];
    };

    const employeeProf = {
        'Bee Murphy': Bm,
        'Yassine Elmellouki': Ye,
        'Nick Ceraso': Nc,
        'Kathryn Pedi': Kp,
        'Rob Walek': Rw,
        'Katie Fandozzi': Kf,
        'Anthony Pierre-Louis': Ap
      };

    return (
        <div className="schedulecontainer">
            <span className="scheduleTitle">{week.format("MMM YYYY")}</span>
            <div className="navigator">
                <button className="scheduleBtn" onClick={handlePrevWeek}>
                    <i className="material-symbols-outlined">arrow_back_ios</i>
                </button>

                <button className="scheduleBtn" onClick={handleNextWeek}>
                    <i className="material-symbols-outlined">arrow_forward_ios</i>
                </button>
            </div>
            {showPopup && (
                <div className="popup">
                    <div>Select shift for {selectedEmployee} on {selectedDay.format("ddd, MMM D")}</div>
                    <button onClick={() => handleShiftClick("AM")}>AM</button>
                    <button onClick={() => handleShiftClick("FL")}>FL</button>
                    <button onClick={() => handleShiftClick("PM")}>PM</button>
                    <button onClick={() => handleShiftClick("EF")}>EF</button>
                    <button onClick={() => handleShiftClick("LF")}>LF</button>
                    <button onClick={() => handleShiftClick("OOO")}>OOO</button>
                    <button onClick={handlePopupClose}>Cancel</button>
                    <button onClick={handleSave}>Save</button>

                </div>
            )}
            <table>
                <thead className="head">
                    <tr>
                        <th></th>
                        {daysInWeek.map((day) => (
                            <th key={day.format()} colspan="3">
                                {day.format("ddd")}
                                <br />
                                {day.format("MMM D")}
                            </th>
                        ))}
                    </tr>
                    <tr>
                        <th></th>
                        {daysInWeek.map(() => (
                            <React.Fragment>
                                <th>AM</th>
                                <th>FL</th>
                                <th>PM</th>
                            </React.Fragment>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee) => (
                        <tr key={employee}>
                            <td>
                                <img src={employeeProf[employee]} alt={`${employee} profile`} className="prof" />
                                {employee}
                            </td>
                            {daysInWeek.map((day) => {
                                const employeeShifts = getShifts(employee, day);
                                return (
                                    <React.Fragment>
                                        <td onDoubleClick={() => handleCellDoubleClick(employee, day, "AM")}>
                                            {employeeShifts.includes("AM") && <span className="AM">AM</span>}
                                        </td>
                                        <td onDoubleClick={() => handleCellDoubleClick(employee, day, "FL")}>
                                            {employeeShifts.includes("FL") && <span className="FL">FL</span>}
                                            {employeeShifts.includes("EF") && <span className="EF">EF</span>}
                                            {employeeShifts.includes("LF") && <span className="LF">LF</span>}
                                            {employeeShifts.includes("OOO") && <span className="OOO">OOO</span>}
                                        </td>
                                        <td onDoubleClick={() => handleCellDoubleClick(employee, day, "PM")}>
                                            {employeeShifts.includes("PM") && <span className="PM">PM</span>}
                                        </td>
                                    </React.Fragment>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    );
}

export default Schedule;