import React from 'react';
import { Card, CardHeader, CardText } from 'material-ui/Card';

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
    const nodeCards = this.props.nodeMap.map(p =>
      (
        <Card>
          <CardHeader
            title={p.title}
            actAsExpander
            showExpandableButton
          />
          <CardText expandable>
            <p>{p.minPower}</p>
            <p>{p.maxPower}</p>
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

