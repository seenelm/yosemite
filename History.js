import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import Test from '../assets/Dashboard.xlsm';
import '../css/history.css';

function Table() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchParseData = async () => {
      const response = await fetch(Test);
      const blob = await response.blob();
      const reader = new FileReader();
      reader.onload = function (e) {
        const fileData = e.target.result;
        const workbook = XLSX.read(fileData, { type: 'binary' });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        const headers = data[0];
        const rows = data.slice(1).map((row, index) =>
          headers.reduce((acc, curr, i) => {
            if (curr === 'Date') {
              const date = new Date((row[i] - (25567 + 1)) * 86400 * 1000);
              acc[curr] = date.toLocaleDateString('en-US', {
                month: 'numeric',
                day: 'numeric',
                year: 'numeric',
              });
            } else if (curr === 'Index') {
              acc[curr] = index;
            } else {
              const value = parseFloat(row[i]);
              acc[curr] = isNaN(value) ? row[i] : value.toFixed(2);
            }
            return acc;
          }, {})
        );
        setItems(rows);
      };
      reader.readAsBinaryString(blob);
    };
    fetchParseData();
  }, []);

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            {items.length > 0 &&
              Object.keys(items[0]).map((key, i) => <th key={i}>{key}</th>)}
          </tr>
        </thead>
        <tbody>
          {items.map((row, i) => (
            <tr key={i}>
              {Object.values(row).map((cell, j) => (
                <td key={j}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
