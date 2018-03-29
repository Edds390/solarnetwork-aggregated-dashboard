import React from 'react';
import PropTypes from 'prop-types';
import { Panel, PanelGroup, Button } from 'react-bootstrap';

/* A new component created for the node data table, due to the initial one causing overlap with the
graph. Used the bootstrap library for this implementation */
export default class PanelSet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedNodes: new Set(),
    };
  }

  /* By using the selectedNodes prop obtained from the DashBoardPanel component,
this functionality filters through the nodes and selects the one that are true
(were selected by the user). Once there is a filtered list of nodes, each panel is created to
display information associated with their corresponding node */
  render() {
    const { checklistToggleMap } = this.props;
    const { nodeTimeDataValues } = this.props;
    
   const chosenNodes = new Set(this.state.selectedNodes);

    Object.keys(checklistToggleMap).forEach((node) => {
      if (checklistToggleMap[node]) {
        chosenNodes.add(node);
      }
    });
    /* At this stage, using manual input data from an external file */
//    const nodeTimeDataValues = require('./Times.json');
  //  const nodeTimeDataValues = require('./ShorterTimes.json');
    const chosenNodeArray = Array.from(chosenNodes);
    const nodeArrayElements = new Array(chosenNodeArray.length);

    /* Placing in the nodeArrayElements array the index value the node is with respect to the
    nodeTimeDataValues set */
    for (let i = 0; i < nodeTimeDataValues.labels.length; i++) {
      const label = nodeTimeDataValues.labels[i];
      if (chosenNodes.has(label)) {
        nodeArrayElements[chosenNodeArray.indexOf(label)] = i;
      }
    }

    /* Initialising a sum array - accumulating the sum of values corresponding to each selected node. */
    const sumArray = new Array(nodeArrayElements.length).fill(0);
    const maxArray = new Array(nodeArrayElements.length).fill(0);
 
    /* Iterating through the dataset and calculating values for each selected node */
    for (let i = 0; i < nodeTimeDataValues.data.length; i++) {
      for (let j = 0; j < nodeArrayElements.length; j++) {
        const timeRow = nodeTimeDataValues.data[i];
        const timeRowIndex = nodeArrayElements[j];
        const value = timeRow[timeRowIndex];
        if (value != null) {
          sumArray[j] += value;
          if(maxArray[j] < value) { 
            maxArray[j] = value;
          }  
        }
      }
    }

    const averageArray = Array.from(sumArray);
    for(let i = 0; i < averageArray.length; i++) {
      const currentValue = averageArray[i];
      averageArray[i] = currentValue / nodeTimeDataValues.data.length;
    }

    const nodeCards = chosenNodeArray.map((nodeId, i) => (
      <Panel eventKey={i} >
        <Panel.Heading>
          <Panel.Title >{nodeId}</Panel.Title>
        </Panel.Heading>
        <Panel.Body >
          <p>Sum is {sumArray[i]}</p>
          <p>Maximum Value is {maxArray[i]}</p>
          <p>Average Value is {averageArray[i]}</p>          
        </Panel.Body>
      </Panel>));
    return (
      <div>
        <Button onClick={() => this.setState({ open: !this.state.open })}>
          View Node Information
        </Button>
        <br />
        <Panel id="collapsible-panel-example-1" expanded={this.state.open} onToggle>
          <Panel.Collapse>
            <Panel.Body>
              <PanelGroup id="node-panel-group">{nodeCards}
              </PanelGroup>
            </Panel.Body>
          </Panel.Collapse>
        </Panel>
      </div>
    );
  }
}

PanelSet.propTypes = {
  checklistToggleMap: PropTypes.object.isRequired,
  nodeTimeDataValues: PropTypes.object.isRequired,
};
