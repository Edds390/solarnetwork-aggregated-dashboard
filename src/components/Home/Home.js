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
      selectedNodes: [],
    };
  }

  handleSearch = (selectedProject) => {
    const selectedNodes = projectMap[selectedProject].nodes;
    this.setState({ selectedNodes });
  }

  handleRequestDelete = (node) => {
    const selectedNodes = Array.from(cloneDeep(this.state.selectedNodes));
    const idx = selectedNodes.indexOf(node);
    selectedNodes[idx].checked = false;
    this.setState({ selectedNodes });
  }

  render() {
    const { selectedNodes } = this.state;
    const projectNames = Object.keys(projectMap).map(projectName => projectName);
    const chipsIsEmpty = selectedNodes.length > 0 && true;
    const nodeChips = selectedNodes.map(node => (
      node.checked &&
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
