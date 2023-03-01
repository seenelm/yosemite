import React from 'react'
import '../css/main.css'
import PieChart from './PieChart'
import TotalCalls from './TotalCalls';
import Tiles from './Tiles';
import GrabData from './/GrabData';
import HistTotCases from './HistTotCases';
import KanbanCard from './KanbanCard';

function Dashboard() {

  return (
    <div className='content-wrapper'>
    <div className='mainContainer'>
      <div className='page-title-header'>
        <Tiles />
      </div>
      <div className='row'>
        <GrabData />
        <div className='spacer'></div>
        <TotalCalls />
        <div className='spacer'></div>
        <PieChart />
      </div>
      <div className='row'>
        <HistTotCases />
      </div>
      <div className='row'>
        <KanbanCard />
      </div>
    </div>
  </div>
  )
}
export default Dashboard

