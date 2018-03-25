import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import LineChart from './LineChart';
import DataParser from './DataParser';
import nodeInfo from './nodeInfo';
import nodeInfo205 from './nodeInfo205';

const DataParserSample = () => {
  const data = DataParser(nodeInfo);
  return (
    <Paper className="paper">
      <LineChart data={data} />
    </Paper>
  );
};

export default DataParserSample;

