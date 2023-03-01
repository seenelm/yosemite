import React, { useState, useEffect } from 'react';
import '../css/tiles.css';
import Test from '../assets/Dashboard.xlsm';
import * as XLSX from 'xlsx';


function Tiles() {
  const [items, setItems] = useState({});

  useEffect(() => {
    const fetchParseData = async () => {
      const response = await fetch(Test);
      const blob = await response.blob();
      const reader = new FileReader();
      reader.onload = function (e) {
        const fileData = e.target.result;
        const workbook = XLSX.read(fileData, { type: 'binary' });
        const worksheet = workbook.Sheets[workbook.SheetNames[1]];
        const worksheet1 = workbook.Sheets[workbook.SheetNames[3]]
        const data = {
          totalCases: worksheet['M6'].v,
          totalCallMins: parseFloat(worksheet1['I3'].v).toFixed(2),
          avgResponse: parseFloat(worksheet['O6'].v).toFixed(2),
          timeLogged: parseFloat(worksheet['R6'].v).toFixed(2),
        };
        setItems(data);
      };
      reader.readAsBinaryString(blob);
    };

    fetchParseData();
  }, []);

  return (
    <div className="mainTiles">
      <div className="top">
        <div className="tile tile-1">
          <div className='title'>
            <h1>{items.totalCases}</h1>
            <i className="material-symbols-outlined">Cases</i>
          </div>
          <h2>Total Cases</h2>

        </div>
        <div className="tile tile-2">
          <div className='title'>
            <h1>{items.totalCallMins}</h1>
            <i className="material-symbols-outlined">Call</i>
          </div>
          <h2>Call Time</h2>

        </div>
        <div className="tile tile-3">
          <div className='title'>
            <h1>{items.avgResponse}</h1>
            <i className="material-symbols-outlined">sentiment_calm</i>
          </div>
          <h2>Average Response</h2>

        </div>
        <div className="tile tile-4">
          <div className='title'>
            <h1>{items.timeLogged}</h1>
            <i className="material-symbols-outlined">more_time</i>
          </div>
          <h2>Time Logged</h2>

        </div>
      </div>
    </div>
  );
}

export default Tiles;
