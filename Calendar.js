import React, { useState, useEffect, useRef } from "react";
import "../css/calendar.css";
import Bm from "../assets/bee.png";
import Ye from '../assets/me.png';
import Nc from '../assets/nc.png';
import Kp from '../assets/kp.png';
import Rw from '../assets/rob.png';
import Ap from '../assets/apl.png';
import Kf from '../assets/kfan.png';
import { formatISO } from 'date-fns'


const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const shifts = [{ id: "AM", label: "AM" }, { id: "Float", label: "Float" }, { id: "PM", label: "PM" }];

const Table = () => {
  // Calculate the start date of the current week
  const today = new Date();
  const firstDayOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() + 1);

  // Initialize the current week start date based on saved value in local storage
  const [currentWeekStart, setCurrentWeekStart] = useState(() => {
    const savedWeekStart = window.localStorage.getItem("currentWeekStart");
    if (savedWeekStart) {
      const diff = (firstDayOfWeek - new Date(savedWeekStart)) / (1000 * 60 * 60 * 24);
      if (diff > 7) {
        return firstDayOfWeek;
      } else {
        return new Date(savedWeekStart);
      }
    } else {
      return firstDayOfWeek;
    }
  });

  const initialData = [
    {
      name: "Bee Murphy", shifts: [
        { id: "AM", position: 0 },
        { id: "AM", position: 1 },
        { id: "AM", position: 2 },
        { id: "AM", position: 3 },
        { id: "AM", position: 4 },
      ], img: Bm
    },
    {
      name: "Yassine Elmellouki", shifts: [
        { id: "AM", position: 0 },
        { id: "AM", position: 1 },
        { id: "AM", position: 2 },
        { id: "AM", position: 3 },
        { id: "AM", position: 4 },
      ], img: Ye
    },
    {
      name: "Nick Ceraso", shifts: [
        { id: "AM", position: 0 },
        { id: "AM", position: 1 },
        { id: "AM", position: 2 },
        { id: "AM", position: 3 },
        { id: "AM", position: 4 },
      ], img: Nc
    },
    {
      name: "Kathryn Pedi", shifts: [
        { id: "AM", position: 0 },
        { id: "AM", position: 1 },
        { id: "AM", position: 2 },
        { id: "AM", position: 3 },
        { id: "AM", position: 4 },
      ], img: Kp
    },
    {
      name: "Rob Walek", shifts: [
        { id: "AM", position: 0 },
        { id: "AM", position: 1 },
        { id: "AM", position: 2 },
        { id: "AM", position: 3 },
        { id: "AM", position: 4 },
      ], img: Rw
    },
    {
      name: "Anthony Pierre-Louis", shifts: [
        { id: "AM", position: 0 },
        { id: "AM", position: 1 },
        { id: "AM", position: 2 },
        { id: "AM", position: 3 },
        { id: "AM", position: 4 },
      ], img: Ap
    },
    {
      name: "Katie Fandozzi", shifts: [
        { id: "AM", position: 0 },
        { id: "AM", position: 1 },
        { id: "AM", position: 2 },
        { id: "AM", position: 3 },
        { id: "AM", position: 4 },
      ], img: Kf
    }
  ];

  const [selectedWeek, setSelectedWeek] = useState(() => {
    const savedSelectedWeek = window.localStorage.getItem("selectedWeek");
    if (savedSelectedWeek) {
      return parseInt(savedSelectedWeek);
    } else {
      return 0;
    }
  });
  const [data, setData] = useState(() => {
    const yearWeek = formatISO(currentWeekStart);
    const savedData = window.localStorage.getItem(yearWeek);
    if (savedData) {
      return JSON.parse(savedData);
    } else {
      return initialData;
    }
  });

  const selectedWeekRef = useRef(0);
  useEffect(() => {
    const savedSelectedWeek = window.localStorage.getItem("selectedWeek");
    if (savedSelectedWeek) {
      selectedWeekRef.current = parseInt(savedSelectedWeek);
    }
  }, []);
  
  useEffect(() => {
    const yearWeek = formatISO(currentWeekStart);
    window.localStorage.setItem(yearWeek, JSON.stringify(data));
    window.localStorage.setItem("currentWeekStart", currentWeekStart.toISOString());
  }, [data, currentWeekStart]);
  
  const handleWeekChange = (weekOffset) => {
    const newWeekStart = new Date(currentWeekStart);
    newWeekStart.setDate(newWeekStart.getDate() + (weekOffset * 7));
    setCurrentWeekStart(newWeekStart);
    selectedWeekRef.current = selectedWeekRef.current + weekOffset;
    window.localStorage.setItem("selectedWeek", selectedWeekRef.current.toString());
  };


  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const handleClick = (name, day, shift) => {
    const newData = [...data];
    const index = newData.findIndex((row) => row.name === name);
    const shiftIndex = shifts.findIndex((s) => s.id === shift);
    newData[index].shifts[day] = shifts[(shiftIndex + 1) % 3].id;
    setData(newData);
    setSelectedEmployee(name);
  };

  const [mergedColumns, setMergedColumns] = useState([]);
  

  const getDatesForWeek = () => {
    const weekStart = new Date(currentWeekStart);
    weekStart.setDate(weekStart.getDate() - weekStart.getDay() + 1);
    const dates = [];
    for (let i = 0; i < daysOfWeek.length; i++) {
      if (i === 0) {
        // Monday
        const date = new Date(weekStart);
        dates.push(date);
      } else {
        // Tuesday to Friday
        const date = new Date(dates[0]);
        date.setDate(date.getDate() + i);
        dates.push(date);
      }
    }
    return dates;
  };
  

  const handleMergeColumn = (dayIndex) => {
    const columnsToMerge = [];
    for (let i = 0; i < shifts.length; i++) {
      columnsToMerge.push(i + dayIndex * shifts.length);
    }

    if (selectedEmployee) {
      const newData = [...data];
      const index = newData.findIndex((row) => row.name === selectedEmployee);

      const isMerged = mergedColumns.some((col) =>
        columnsToMerge.includes(col)
      );
      if (isMerged) {
        // Unmerge the cells
        columnsToMerge.forEach((col) => {
          const shiftIndex = Math.floor(col / shifts.length);
          const shift = shifts[col % shifts.length];
          newData[index].shifts[shiftIndex] = { ...shift, position: shiftIndex * shifts.length + shiftIndex };
        });
        setMergedColumns(
          mergedColumns.filter((col) => !columnsToMerge.includes(col))
        );
      } else {
        // Merge the cells
        columnsToMerge.forEach((col) => {
          const shiftIndex = Math.floor(col / shifts.length);
          const shift = shifts[col % shifts.length];
          newData[index].shifts[shiftIndex] = { id: "OOO", label: "", position: col };
        });
        setMergedColumns([...mergedColumns, ...columnsToMerge]);
      }
      setData(newData);
    } else {
      // No employee selected
      setMergedColumns([...mergedColumns, ...columnsToMerge]);
    }
  };



  return (
    <table className="employee-shifts-table">
      <thead>
        <button onClick={() => setCurrentWeekStart(new Date(currentWeekStart.getFullYear(), currentWeekStart.getMonth(), currentWeekStart.getDate() - 7))}>
          Previous Week
        </button>
        <button onClick={() => setCurrentWeekStart(new Date(currentWeekStart.getFullYear(), currentWeekStart.getMonth(), currentWeekStart.getDate() + 7))}>
          Next Week
        </button>

        <tr>
          <th></th>
          {getDatesForWeek().map((date) => (
            <th key={date.toDateString()} colSpan={3} className="employee-shifts-day">
              {date.toDateString()}
            </th>
          ))}
        </tr>
        <tr>
          <th></th>
          {getDatesForWeek().map((date) =>
            shifts.map((shift) => (
              <th key={`${date.toDateString()}-${shift.id}`}>{shift.label}</th>
            ))
          )}
        </tr>
      </thead>
      <tbody>
  {data.map((row) => (
    <tr key={row.name} className={row.name === selectedEmployee ? "selected" : ""}>
      <td className="employee-shifts-cont">
        <img src={row.img} alt="" className="employee-shifts-avatar" />
        <div>
          <div className="employee-shifts-name">{row.name}</div>
          <div className="employee-shifts-title">Position</div>
        </div>
      </td>
      {daysOfWeek.map((day, dayIndex) => (
        <React.Fragment key={`${day}-${dayIndex}`}>
          {shifts.map((shift) => (
            <td
              key={`${day}-${dayIndex}-${shift.id}`}
              onClick={() => handleClick(row.name, dayIndex, shift.id)}
              onDoubleClick={() => handleMergeColumn(dayIndex)}
              className={`employee-shifts-cell employee-shifts-cell-${shift.id} ${row.shifts[dayIndex] === shift.id ? "selected" : ""} ${mergedColumns.includes(dayIndex * shifts.length + shifts.findIndex((s) => s.id === shift.id)) ? "merged" : ""}`}
            >
              {row.shifts[dayIndex] === shift.id ? shift.label : ""}
            </td>
          ))}
        </React.Fragment>
      ))}
    </tr>
  ))}
</tbody>

    </table>
  );
};

export default Table;
