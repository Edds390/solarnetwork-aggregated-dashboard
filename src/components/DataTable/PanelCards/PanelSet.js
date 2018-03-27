import React from 'react';
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
    this.state = { value: 1 };
  }


  render() {

const nodeCards = nodeMap.map((p, i) =>
    (
      <Panel eventKey={i} >
        <Panel.Heading>
      <Panel.Title >{p.title}</Panel.Title>
    </Panel.Heading>
              <Panel.Body >
              <p>Minimum Power: {p.minPower} Watts.</p>
            <p>Maximum Power: {p.maxPower} Watts</p>
    </Panel.Body>
      </Panel>
    ));


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

