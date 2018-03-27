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
    const nodeCards = this.props.nodeMap.map(p =>
      (
        <Card>
          <CardHeader
            title={p.title}
            actAsExpander
            showExpandableButton
          />
          <CardText expandable>
            <p>Minimum Power: {p.minPower} Watts</p>
            <p>Maximum Power: {p.maxPower} Watts</p>
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
  nodeMap: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    minPower: PropTypes.number.isRequired,
    maxPower: PropTypes.number.isRequired,
  }).isRequired).isRequired,
};