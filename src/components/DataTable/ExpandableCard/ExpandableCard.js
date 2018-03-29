import React from 'react';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import PropTypes from 'prop-types';


/* This component is for an individual card within the drop down menu for node information.
It is expandable and collapsible depending on what state the user clicks on it. */
export default class ExpandableCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  /* This render method iterates through the node map provided by the DropDownNodeMenu class
  (which puts into practice the future intention of obtaining information from other components
  via props). */
  render() {
    const { checklistToggleMap } = this.props;
    //  const { nodeTimeDataValues } = this.props;
      
     const chosenNodes = new Set(this.state.selectedNodes);
  
      Object.keys(checklistToggleMap).forEach((node) => {
        if (checklistToggleMap[node]) {
          chosenNodes.add(node);
        }
      });
      /* At this stage, using manual input data from an external file */
  //    const nodeTimeDataValues = require('./Times.json');
      const nodeTimeDataValues = require('./ShorterTimes.json');
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

    const nodeCards = chosenNodeArray.map((nodeId, i) =>
      (
        <Card>
          <CardHeader
            title={nodeId}
            actAsExpander
            showExpandableButton
          />
          <CardText expandable>
          <p>Sum is {sumArray[i]}</p>
          <p>Maximum Value is {maxArray[i]}</p>
          <p>Average Value is {averageArray[i]}</p>     
          </CardText>
        </Card>
      ));
    return (
      <div>
        {nodeCards}
      </div>
    );
  }
}

ExpandableCard.propTypes = {
    checklistToggleMap: PropTypes.object.isRequired
};
