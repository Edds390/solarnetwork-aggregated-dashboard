import React from 'react';
import { ResponsiveLine } from '@nivo/line';

const isTickWhichShouldBeHidden = (tick) => {
  let tickArray = tick.split(" ");
  if (tickArray[1] === "12:00") {
    return false;
  }
  return true;
}

const LineChart = ({ data }) => {
  console.log(data);
  return (
    <div
      style={{
      position: 'fixed',
      top: '10px',
      right: 0,
      bottom: 0,
      left: '15%',
      height: '500px',
      width: '800px',
      zIndex: 100,
    }}
    >
      <div>HI</div>
      <ResponsiveLine
        data={data}
        margin={{
            top: 50,
            right: 110,
            bottom: 50,
            left: 60,
        }}
        minY="auto"
        stacked
        enableArea
        axisBottom={{
            orient: 'bottom',
            format: tick => (isTickWhichShouldBeHidden(tick) ? '' : tick),
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 20,
            legend: 'country code',
            legendOffset: 36,
            legendPosition: 'center',
        }}
        axisLeft={{
            orient: 'left',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'count',
            legendOffset: -40,
            legendPosition: 'center',
        }}
        enableDots={false}
        // dotSize={10}
        // dotColor="inherit:darker(0.3)"
        // dotBorderWidth={2}
        // dotBorderColor="#ffffff"
        // enableDotLabel
        // dotLabel="y"
        // dotLabelYOffset={-12}
        animate
        motionStiffness={90}
        motionDamping={15}
        legends={[
            {
                anchor: 'bottom-right',
                direction: 'column',
                translateX: 100,
                itemWidth: 80,
                itemHeight: 20,
                symbolSize: 12,
                symbolShape: 'circle',
            },
        ]}
      />
      <div className="Title">BAR</div>
    </div>
  );
  
};

export default LineChart;

