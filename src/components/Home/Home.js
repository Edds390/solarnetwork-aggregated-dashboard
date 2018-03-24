import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import Chip from 'material-ui/Chip';
import cloneDeep from 'lodash';
import Autocomplete from '../Autocomplete/Autocomplete';
import RaisedButton from 'material-ui/RaisedButton';


import './Home.css';

const projectMap = {
  'University of Auckland': {
    name: 'University of Auckland',
    nodeIds: [234, 231, 435, 463, 182],
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
    this.state = {
      selectedNodes: new Set(),
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

  render() {
    const { selectedNodes } = this.state;
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
      <Paper className="home">
        <div className="autocomplete">
          <Autocomplete onSearch={this.handleSearch} suggestionList={projectNames} />
        </div>
        <div className="chips">
          {nodeChips}
        </div>
        <RaisedButton label="GO" disabled={chipsIsEmpty} style={{ position: 'absolute', bottom: '15px' }} primary />
      </Paper>

    );
  }
}