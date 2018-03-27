import React from 'react';
import PropTypes from 'prop-types';
import {
  Panel, PanelGroup, Button } from 'react-bootstrap';

const nodeMap = [
  {
    title: 'Node 263',
    minPower: 288,
    maxPower: 465,
  },
  {
    title: 'Node 5',
    minPower: 123,
    maxPower: 354,
  },
  {
    title: 'Node 135',
    minPower: 7,
    maxPower: 45,
  },
];

export default class PanelSet extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: 1,
      selectedNodes: new Set() };
  }
    
  
  render() {
const { checklistToggleMap } = this.props;

console.log(checklistToggleMap);
const chosenNodes = new Set(this.state.selectedNodes);
Object.keys(checklistToggleMap).forEach((node) => {
  if (checklistToggleMap[node]) {
    chosenNodes.add(node);
  }
});
console.log(chosenNodes);
const array = Array.from(chosenNodes);

const nodeCards = array.map((nodeId,i) => (
  <Panel eventKey={i} >
  <Panel.Heading>
<Panel.Title >{nodeId}</Panel.Title>
</Panel.Heading>
        <Panel.Body >
        <p>Minimum Power: ... Watts.</p>
      <p>Maximum Power: ... Watts</p>
</Panel.Body>
</Panel>));
    return (

     <div>
     <Button onClick={() => this.setState({ open: !this.state.open })}>
          View Node Information
        </Button>
        <br />
        <Panel id="collapsible-panel-example-1" expanded={this.state.open}>
          <Panel.Collapse>
            <Panel.Body>
             <PanelGroup>{nodeCards}
                 </PanelGroup>
            </Panel.Body>
          </Panel.Collapse>
        </Panel>
        </div>
    );
  }
}

PanelSet.propTypes = {
  checklistToggleMap: PropTypes.object.isRequired
};
