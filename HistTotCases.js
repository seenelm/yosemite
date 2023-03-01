import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import Test from '../assets/Dashboard.xlsm';
import * as XLSX from 'xlsx';
import '../css/data.css';

function HistTotCases() {
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
                const rows = data.slice(1).map(row =>
                    headers.reduce((acc, curr, i) => {
                        if (curr === 'Date') {
                            const date = new Date((row[i] - (25567 + 1)) * 86400 * 1000);
                            acc[curr] = date.toLocaleDateString('en-US', {
                                month: 'numeric',
                                day: 'numeric',
                                year: 'numeric',
                            });
                        } else if (curr === 'Total Cases') {
                            acc[curr] = row[i];
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
        <div className='barchart'>
            <h1>Historical Cases</h1>
            <div style={{ width: '100%', height: '20vh', paddingTop: '50px' }} >
                <ResponsiveContainer>
                    <AreaChart
                        data={items}
                        margin={{
                            top: 10,
                            right: 30,
                            left: 0,
                            bottom: 0,
                        }}
                    >
                        <XAxis dataKey="Date" visibility="hidden" />
                        <YAxis tick={{ fill: '#ACBFD2' }} />
                        <Tooltip />
                        <Area type="monotone" dataKey="Total Cases" stroke="#0075C9" fill="#0075C9" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default HistTotCases;
