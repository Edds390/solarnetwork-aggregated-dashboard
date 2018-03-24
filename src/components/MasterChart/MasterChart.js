import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import { AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

// const data = [
//   {name: new Date(), uv: 4000, pv: 2400, amt: 2400},
//   {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
//   {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
//   {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
//   {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
//   {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
//   {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
// ];
const labels = {
  labels: ["x", "A", "B"],
};

export default class MasterChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedNodes: new Set(),
    };
  }

  makeSeries = () => {
    const startDate = new Date();
    const length = 30;
    const max = 100;
    const data = [];
    let i = 0;
    // const max = Math.random() > 0.5 ? 100000 : 10
    // const multiplier = 10
    // const multiplier = Math.round((Math.random() * 10) + Math.round(Math.random() * 50))
    for (i = 0; i < length; i += 1) {
      startDate.setDate(startDate.getDay() + 1);
      const dayNum = startDate.getDate();
      data.push({
        name: dayNum,
        uv: Math.round(Math.random() + Math.round(Math.random())),
        pv: Math.round(Math.random() * 5),
        amt: Math.round(Math.random()),
      });
    }
    return data;
  }

  render() {
    const data = this.makeSeries();
    return (
      <Paper className="paper">
        <AreaChart width={600} height={400} data={data}
              margin={{top: 10, right: 30, left: 0, bottom: 0}}>
          <XAxis dataKey="name"/>
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Area type='monotone' dataKey='uv' stackId="1" stroke='#8884d8' fill='#8884d8' />
          <Area type='monotone' dataKey='pv' stackId="1" stroke='#82ca9d' fill='#82ca9d' />
          <Area type='monotone' dataKey='amt' stackId="1" stroke='#ffc658' fill='#ffc658' />
        </AreaChart>
      </Paper>

    );
  }
}
