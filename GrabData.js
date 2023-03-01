import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import '../css/data.css';
import Test from '../assets/Dashboard.xlsm';

function GrabData() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchParseData = async () => {
      const response = await fetch(Test);
      const blob = await response.blob();
      const reader = new FileReader();
      reader.onload = function (e) {
        const fileData = e.target.result;
        const workbook = XLSX.read(fileData, { type: 'binary' });
        const worksheet = workbook.Sheets[workbook.SheetNames[1]];
        const data = [
          {
            name: 'Total Cases',
            current: worksheet['M6'].v,
            previous: worksheet['M5'].v
          },
          {
            name: 'Inbound Calls',
            current: worksheet['N6'].v,
            previous: worksheet['N5'].v
          },
          {
            name: 'RT',
            current: worksheet['O6'].v.toFixed(2),
            previous: worksheet['O5'].v.toFixed(2)
          },
          {
            name: 'RT +1',
            current: worksheet['P6'].v.toFixed(2),
            previous: worksheet['P5'].v.toFixed(2)
          },
          {
            name: 'Vol of RT +1',
            current: worksheet['Q6'].v,
            previous: worksheet['Q5'].v
          },
          {
            name: 'Time Logged',
            current: worksheet['R6'].v.toFixed(2),
            previous: worksheet['R5'].v.toFixed(2)
          },
        ];
        setItems(data);
      };
      reader.readAsBinaryString(blob);
    };

    fetchParseData();
  }, []);

  return (
    <div className='barchart'>
      <h1>Previous Week</h1>
      <div style={{ height: '400px', width: '700px' }}>
        <ResponsiveContainer>
          <BarChart
            width={500}
            height={300}
            data={items}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <XAxis dataKey="name" tick={{ fill: '#ACBFD2' }} />
            <YAxis tick={{ fill: '#ACBFD2' }} />
            <Tooltip
              wrapperStyle={{ background: 'transparent' }}
              contentStyle={{ background: 'rgba(255, 255, 255, 0.8)' }}
              cursor={{ fill: 'transparent' }}
            />



            <Legend />
            <Bar dataKey="previous" fill="#8884d8" />
            <Bar dataKey="current" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default GrabData;

