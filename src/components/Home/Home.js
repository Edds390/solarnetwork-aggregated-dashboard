import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import Chip from 'material-ui/Chip';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';
import * as moment from 'moment';
import cloneDeep from 'lodash';
import { Link } from 'react-router-dom';
import Autocomplete from '../Autocomplete/Autocomplete';
import TopNavigationBar from '../TopNavigationBar/TopNavigationBar';


import './Home.css';

const projectMap = {
  'University of Auckland': {
    name: 'University of Auckland',
    nodeIds: [205, 149, 135, 165, 182],
  },
  AUT: {
    name: 'AUT',
    nodeIds: [234, 435, 463, 182],
  },
  MIT: {
    name: 'MIT',
    nodeIds: [234, 231, 435, 463, 182],
  },
};

export default class Home extends Component {
  constructor(props) {
    super(props);
    const dateToday = moment().toDate();
    const weekAgoDate = moment().subtract(7, 'days').toDate();
    this.state = {
      selectedNodes: new Set(),
      startDate: weekAgoDate,
      endDate: dateToday,
    };
  }

  handleSearch = (selectedProject) => {
    const selectedNodes = new Set(projectMap[selectedProject].nodeIds);
    this.setState({ selectedNodes });
  }

  handleRequestDelete = (key) => {
    const selectedNodes = new Set(cloneDeep(this.state.selectedNodes));
    selectedNodes.delete(key);
    this.setState({ selectedNodes });
  }

  handleStartDateChange = (event, date) => {
    this.setState({ startDate: date });
  }

  handleEndDateChange = (event, date) => {
    this.setState({ endDate: date });
  }

  render() {
    const { selectedNodes, startDate, endDate } = this.state;
    const projectNames = Object.keys(projectMap).map(projectName => projectName);
    const selectedNodesArray = Array.from(selectedNodes);
    let chipsIsEmpty = true;
    if (selectedNodesArray.length > 0) {
      chipsIsEmpty = false;
    }
    const nodeChips = selectedNodesArray.map(nodeId => (
      <Chip
        style={{ margin: 5 }}
        key={nodeId}
        onRequestDelete={() => this.handleRequestDelete(nodeId)}
      >
        {nodeId}
      </Chip>));
    return (
      <div>
        <TopNavigationBar />
        <Paper className="home">
          <div className="autocomplete">
            <Autocomplete onSearch={this.handleSearch} suggestionList={projectNames} />
            <Link to={{
              pathname: "/dash",
              state: { selectedNodes: selectedNodes, startDate: startDate, endDate: endDate  }
            }}>
              <RaisedButton
                className="searchButton"
                label="GO"
                disabled={chipsIsEmpty}
                primary
              />
            </Link>
          </div>
          <div className="datepickers">
            <DatePicker hintText="Start Date" container="inline" value={this.state.startDate} onChange={this.handleStartDateChange} />
            <DatePicker hintText="End Date" container="inline" value={this.state.endDate} onChange={this.handleEndDateChange} />
          </div>
          <div className="chips">
            {nodeChips}
          </div>
        </Paper>
      </div>
    );
  }
}
