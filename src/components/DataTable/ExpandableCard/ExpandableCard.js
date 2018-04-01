import React from 'react';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import PropTypes from 'prop-types';
import './ExpandableCard.css';

/* This component is for an individual card within the drop down menu for node information.
It is expandable and collapsible depending on what state the user clicks on it. */
export default class ExpandableCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  /* This render method iterates through the nodes selected provided by the DropDownNodeMenu class
  */
  render() {
    const { checklistToggleMap } = this.props;
    const { nodeTimeDataValues } = this.props;
    const { value } = this.props;
    const chosenNodes = new Set(this.state.selectedNodes);

    /* Obtaining the selected nodes */
    Object.keys(checklistToggleMap).forEach((node) => {
      if (checklistToggleMap[node]) {
        chosenNodes.add(node);
      }
    });
    const chosenNodeArray = Array.from(chosenNodes);
    const nodeArrayElements = new Array(chosenNodeArray.length);

    /* Placing in the nodeArrayElements array, the index value the node is with respect to the
      nodeTimeDataValues set */
    let nodeCards;
    if (Object.keys(nodeTimeDataValues).length === 0) { // Need to check if there is any data to process.
      nodeCards = chosenNodeArray.map(nodeId =>
        (
          <Card className="nodeInformationText">
            <CardHeader
              title={nodeId}
              actAsExpander
              showExpandableButton
            />
            <CardText expandable >
              <p>Click on a value</p>
            </CardText>
          </Card>
        ));
    } else { /* There is data to process. */
      for (let i = 0; i < nodeTimeDataValues.labels.length; i++) {
        const label = nodeTimeDataValues.labels[i];
        if (chosenNodes.has(label)) {
          nodeArrayElements[chosenNodeArray.indexOf(label)] = i;
        }
      }

      /* Initialising data arrays, accumulating the sum of values corresponding to each selected node. */
      const sumArray = new Array(nodeArrayElements.length).fill(0);
      const maxArray = new Array(nodeArrayElements.length).fill(0);

      /* Iterating through the dataset and calculating values for each selected node.
      The labels and data rows in nodeTimeDataValues do not directly correspond elements. This is
      because nodeTimeDataValues[0] has a string for date & time. Hence the index should be incremented
      by one.  */
  
      for (let i = 0; i < nodeTimeDataValues.data.length; i++) {
        for (let j = 0; j < nodeArrayElements.length; j++) {
          const timeRow = nodeTimeDataValues.data[i];
          const timeRowIndex = nodeArrayElements[j];
          const dataValue = timeRow[timeRowIndex + 1];
          if (dataValue != null) {
            sumArray[j] += dataValue;
            if (maxArray[j] < dataValue) {
              maxArray[j] = dataValue;
            }
          }
        }
      }

      /* Calculating the averages */
      const averageArray = Array.from(sumArray);
      for (let i = 0; i < averageArray.length; i++) {
        const currentValue = averageArray[i];
        averageArray[i] = currentValue / nodeTimeDataValues.data.length;
      }

      nodeCards = chosenNodeArray.map((nodeId, i) =>
        (
          <Card >
            <CardHeader
              title={nodeId}
              actAsExpander
              showExpandableButton
            />
            <CardText expandable className="nodeInformationText">
              <p>Accumlated total {value}:  {sumArray[i].toFixed(2)}</p>
              <p>Maximum {value}: {maxArray[i].toFixed(2)}</p>
              <p>Average {value}: {averageArray[i].toFixed(2)}</p>
            </CardText>
          </Card>
        ));
    }
    return (
      <div>
        <p>{nodeCards}</p>
      </div>
    );
  }
}

ExpandableCard.propTypes = {
  checklistToggleMap: PropTypes.object.isRequired,
  nodeTimeDataValues: PropTypes.object.isRequired,
  value: PropTypes.string.isRequired,
};
