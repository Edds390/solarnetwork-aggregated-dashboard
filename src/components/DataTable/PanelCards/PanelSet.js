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
    const chosenNodes = new Set(this.state.selectedNodes);

    Object.keys(checklistToggleMap).forEach((node) => {
      if (checklistToggleMap[node]) {
        chosenNodes.add(node);
      }
    });

    const array = Array.from(chosenNodes);

    const nodeCards = array.map((nodeId, i) => (
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
};
