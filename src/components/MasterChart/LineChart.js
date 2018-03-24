import React, { Component } from 'react';
import { ResponsiveLine } from '@nivo/line';
import Toggle from 'material-ui/Toggle';
import './LineChart.css';

const data = [
  {
    id: 'whisky',
    color: 'hsl(170, 70%, 50%)',
    data: [
      {
        color: 'hsl(59, 70%, 50%)',
        x: 'PL',
        y: 50,
      },
      {
        color: 'hsl(92, 70%, 50%)',
        x: 'UZ',
        y: 44,
      },
      {
        color: 'hsl(185, 70%, 50%)',
        x: 'TD',
        y: 29,
      },
      {
        color: 'hsl(199, 70%, 50%)',
        x: 'VC',
        y: 18,
      },
      {
        color: 'hsl(74, 70%, 50%)',
        x: 'TO',
        y: 56,
      },
      {
        color: 'hsl(9, 70%, 50%)',
        x: 'GS',
        y: 48,
      },
      {
        color: 'hsl(163, 70%, 50%)',
        x: 'IL',
        y: 35,
      },
      {
        color: 'hsl(324, 70%, 50%)',
        x: 'AQ',
        y: 21,
      },
      {
        color: 'hsl(55, 70%, 50%)',
        x: 'MS',
        y: 51,
      },
    ],
  },
  {
    id: 'rhum',
    color: 'hsl(289, 70%, 50%)',
    data: [
      {
        color: 'hsl(50, 70%, 50%)',
        x: 'PL',
        y: 35,
      },
      {
        color: 'hsl(281, 70%, 50%)',
        x: 'UZ',
        y: 48,
      },
      {
        color: 'hsl(119, 70%, 50%)',
        x: 'TD',
        y: 51,
      },
      {
        color: 'hsl(28, 70%, 50%)',
        x: 'VC',
        y: 24,
      },
      {
        color: 'hsl(313, 70%, 50%)',
        x: 'TO',
        y: 42,
      },
      {
        color: 'hsl(329, 70%, 50%)',
        x: 'GS',
        y: 21,
      },
      {
        color: 'hsl(209, 70%, 50%)',
        x: 'IL',
        y: 9,
      },
      {
        color: 'hsl(184, 70%, 50%)',
        x: 'AQ',
        y: 43,
      },
      {
        color: 'hsl(359, 70%, 50%)',
        x: 'MS',
        y: 56,
      },
    ],
  },
  {
    id: 'gin',
    color: 'hsl(105, 70%, 50%)',
    data: [
      {
        color: 'hsl(270, 70%, 50%)',
        x: 'PL',
        y: 40,
      },
      {
        color: 'hsl(70, 70%, 50%)',
        x: 'UZ',
        y: 16,
      },
      {
        color: 'hsl(276, 70%, 50%)',
        x: 'TD',
        y: 36,
      },
      {
        color: 'hsl(208, 70%, 50%)',
        x: 'VC',
        y: 36,
      },
      {
        color: 'hsl(186, 70%, 50%)',
        x: 'TO',
        y: 34,
      },
      {
        color: 'hsl(89, 70%, 50%)',
        x: 'GS',
        y: 47,
      },
      {
        color: 'hsl(257, 70%, 50%)',
        x: 'IL',
        y: 17,
      },
      {
        color: 'hsl(73, 70%, 50%)',
        x: 'AQ',
        y: 16,
      },
      {
        color: 'hsl(217, 70%, 50%)',
        x: 'MS',
        y: 48,
      },
    ],
  },
  {
    id: 'vodka',
    color: 'hsl(25, 70%, 50%)',
    data: [
      {
        color: 'hsl(179, 70%, 50%)',
        x: 'PL',
        y: 34,
      },
      {
        color: 'hsl(305, 70%, 50%)',
        x: 'UZ',
        y: 27,
      },
      {
        color: 'hsl(248, 70%, 50%)',
        x: 'TD',
        y: 13,
      },
      {
        color: 'hsl(38, 70%, 50%)',
        x: 'VC',
        y: 40,
      },
      {
        color: 'hsl(325, 70%, 50%)',
        x: 'TO',
        y: 33,
      },
      {
        color: 'hsl(80, 70%, 50%)',
        x: 'GS',
        y: 5,
      },
      {
        color: 'hsl(15, 70%, 50%)',
        x: 'IL',
        y: 24,
      },
      {
        color: 'hsl(167, 70%, 50%)',
        x: 'AQ',
        y: 2,
      },
      {
        color: 'hsl(299, 70%, 50%)',
        x: 'MS',
        y: 52,
      },
    ],
  },
  {
    id: 'cognac',
    color: 'hsl(52, 70%, 50%)',
    data: [
      {
        color: 'hsl(335, 70%, 50%)',
        x: 'PL',
        y: 24,
      },
      {
        color: 'hsl(356, 70%, 50%)',
        x: 'UZ',
        y: 38,
      },
      {
        color: 'hsl(282, 70%, 50%)',
        x: 'TD',
        y: 42,
      },
      {
        color: 'hsl(86, 70%, 50%)',
        x: 'VC',
        y: 13,
      },
      {
        color: 'hsl(129, 70%, 50%)',
        x: 'TO',
        y: 40,
      },
      {
        color: 'hsl(356, 70%, 50%)',
        x: 'GS',
        y: 6,
      },
      {
        color: 'hsl(295, 70%, 50%)',
        x: 'IL',
        y: 38,
      },
      {
        color: 'hsl(345, 70%, 50%)',
        x: 'AQ',
        y: 44,
      },
      {
        color: 'hsl(297, 70%, 50%)',
        x: 'MS',
        y: 18,
      },
    ],
  },
];

export default class LineChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stacked: false,
    };
  }

  render() {
    return (
      <div>
        <div className="lineChart">
          <ResponsiveLine
            data={data}
            margin={{
                top: 50,
                right: 110,
                bottom: 50,
                left: 60,
            }}
            minY="auto"
            stacked={this.state.stacked}
            axisBottom={{
                orient: 'bottom',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
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
            dotSize={10}
            dotColor="inherit:darker(0.3)"
            dotBorderWidth={2}
            dotBorderColor="#ffffff"
            enableDotLabel
            dotLabel="y"
            dotLabelYOffset={-12}
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
        </div>

        <Toggle
          label="Stacked View"
          defaultToggled={false}
          onToggle={() => { this.setState(prevState => ({ stacked: !prevState.stacked })); }}
        />

      </div>
    );
  }
}

