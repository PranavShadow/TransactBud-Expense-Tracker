import React from 'react'
import { Bar, BarChart, Legend, Tooltip, XAxis, YAxis } from 'recharts'

function BarChartDashBoard({budgetList}) {
  return (
    <div className='border rounded-lg p-5'>
        <h2 className='font-bold text-lg mb-3'>Activity</h2>
        <BarChart
        width={500}
        height={300}
        data={budgetList}
        margin={{
            top:7,
        }}>
            <XAxis dataKey='name'/>
            <YAxis/>
            <Tooltip/>
            <Legend/>
            <Bar dataKey='totalSpend' stackId='a' fill='#000000'/>
            <Bar dataKey='amount' stackId='a' fill='#17CF97'/>


        </BarChart>
    </div>
  )
}

export default BarChartDashBoard