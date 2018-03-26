import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import Chip from 'material-ui/Chip';
import RaisedButton from 'material-ui/RaisedButton';
import cloneDeep from 'lodash';
import { Link } from 'react-router-dom';
import Autocomplete from '../Autocomplete/Autocomplete';
import TopNavigationBar from '../TopNavigationBar/TopNavigationBar';


import './Home.css';

const projectMap = {
  'University of Auckland': {
    name: 'University of Auckland',
    nodes: [
      {
        nodeId: 234,
        checked: true,
      },
      {
        nodeId: 231,
        checked: true,
      },
      {
        nodeId: 435,
        checked: true,
      },
      {
        nodeId: 463,
        checked: true,
      },
      {
        nodeId: 182,
        checked: true,
      },
    ],
  },
  AUT: {
    name: 'AUT',
    nodes: [
      {
        nodeId: 234,
        checked: true,
      },
      {
        nodeId: 435,
        checked: true,
      },
      {
        nodeId: 463,
        checked: true,
      },
      {
        nodeId: 182,
        checked: true,
      },
    ],
  },
  MIT: {
    name: 'MIT',
    nodes: [
      {
        nodeId: 234,
        checked: true,
      },
      {
        nodeId: 231,
        checked: true,
      },
      {
        nodeId: 435,
        checked: true,
      },
      {
        nodeId: 463,
        checked: true,
      },
      {
        nodeId: 182,
        checked: true,
      },
    ],
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
    const selectedNodes = new Set(projectMap[selectedProject].nodes);
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
    const nodeChips = selectedNodesArray.map(node => (
      <Chip
        style={{ margin: 5 }}
        key={node.nodeId}
        onRequestDelete={() => this.handleRequestDelete(node)}
      >
        {node.nodeId}
      </Chip>));
    return (
      <div>
        <TopNavigationBar />
        <Paper className="home">
          <div className="autocomplete">
            <Autocomplete onSearch={this.handleSearch} suggestionList={projectNames} />
            <Link to={{
              pathname: "/dash",
              state: selectedNodes
            }}>
              <RaisedButton
                className="searchButton"
                label="GO"
                disabled={chipsIsEmpty}
                primary
              />
            </Link>
          </div>
          <div className="chips">
            {nodeChips}
          </div>
        </Paper>
      </div>
    );
  }
}
