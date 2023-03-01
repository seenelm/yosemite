import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import '../css/data.css';
import Test from '../assets/Dashboard.xlsm';

function TotalCalls() {
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
            name: new Date((worksheet['L2'].v - (25567 + 1)) * 86400 * 1000).toLocaleDateString('en-US', { month: 'numeric', day: 'numeric' }),
            'Call Volume': worksheet['N2'].v
          },
          {
            name: new Date((worksheet['L3'].v - (25567 + 1)) * 86400 * 1000).toLocaleDateString('en-US', { month: 'numeric', day: 'numeric' }),
            'Call Volume': worksheet['N3'].v,
          },
          {
            name: new Date((worksheet['L4'].v - (25567 + 1)) * 86400 * 1000).toLocaleDateString('en-US', { month: 'numeric', day: 'numeric' }),
            'Call Volume': worksheet['N4'].v,
          },
          {
            name: new Date((worksheet['L5'].v - (25567 + 1)) * 86400 * 1000).toLocaleDateString('en-US', { month: 'numeric', day: 'numeric' }),
            'Call Volume': worksheet['N5'].v,
          },
          {
            name: new Date((worksheet['L6'].v - (25567 + 1)) * 86400 * 1000).toLocaleDateString('en-US', { month: 'numeric', day: 'numeric' }),
            'Call Volume': worksheet['N6'].v,
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
      <h1>Weekly Calls</h1>
      <div style={{ height: '400px', width: '700px', paddingTop:'30px' }}>
        <ResponsiveContainer width='100%' height='100%'>
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
            <XAxis dataKey='name' tick={{ fill: '#ACBFD2' }} />
            <YAxis tick={{ fill: '#ACBFD2' }} />
            <Tooltip wrapperStyle={{ background: 'transparent' }} contentStyle={{ background: 'rgba(255, 255, 255, 0.8)', border: 'none' }} cursor={{fill: 'transparent'}} />
            <Legend />
            <Bar dataKey='Call Volume' fill='#82ca9d'  />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default TotalCalls;
