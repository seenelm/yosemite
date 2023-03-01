import React, { useState, useEffect, Component } from 'react';
import { VictoryPie, VictoryAnimation, VictoryLabel } from "victory";
import Test from '../assets/Dashboard.xlsm';
import * as XLSX from 'xlsx';
import '../css/data.css';

class PieChart1 extends Component {
  getData(percent) {
    return [
      { x: 1, y: percent },
      { x: 2, y: 100 - percent },
    ];
  }

  render() {
    const percent = this.props.percent || 0;
    const data = this.getData(percent);

    return (
      <div className='barchart'>
        <h1>Weekly TL</h1>
          <svg style={{paddingTop:"30px", maxHeight:"400px"}} viewBox="0 0 400 400">
            <VictoryPie
              standalone={false}
              animate={{ duration: 1000 }}
              width={400}
              height={400}
              data={data}
              innerRadius={120}
              cornerRadius={25}
              labels={() => null}
              style={{
                data: {
                  fill: ({ datum }) => {
                    const color = datum.y > 75 ? "green" : "red";
                    return datum.x === 1 ? color : "transparent";
                  },
                },
              }}
            />
            <VictoryAnimation duration={1000} data={{ percent }}>
              {(newProps) => {
                return (
                  <React.Fragment>
                    <VictoryLabel
                      textAnchor="middle"
                      verticalAnchor="middle"
                      x={200}
                      y={200}
                      text={`${(Math.round(newProps.percent * 100) / 100).toFixed(2)} Hours`}
                      style={{ fontSize: 45, fill: '#ACBFD2' }}
                    />
                    <VictoryLabel
                      textAnchor="middle"
                      verticalAnchor="middle"
                      x={200}
                      y={240}
                      text="Time Logged"
                      style={{ fontSize: 18, fill: '#ACBFD2' }}
                    />
                  </React.Fragment>
                );
              }}
            </VictoryAnimation>
          </svg>
      </div>
    );
  }
}

function PieChart() {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const fetchParseData = async () => {
      const response = await fetch(Test);
      const blob = await response.blob();
      const reader = new FileReader();
      reader.onload = function (e) {
        const fileData = e.target.result;
        const workbook = XLSX.read(fileData, { type: 'binary' });
        const worksheet = workbook.Sheets[workbook.SheetNames[1]];
        setPercent(worksheet['R6'].v);
      };
      reader.readAsBinaryString(blob);
    };

    fetchParseData();
  }, []);

  return <PieChart1 percent={percent} />;
}

export default PieChart;
