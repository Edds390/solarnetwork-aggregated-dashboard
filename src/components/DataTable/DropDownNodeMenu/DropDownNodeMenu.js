import React from 'react';
import Paper from 'material-ui/Paper';
import PropTypes from 'prop-types';
import ExpandableCard from '../ExpandableCard/ExpandableCard';
import './DropDownNodeMenu.css';


/* Is a scrollable menu (if it exceeds a certain amount of cards) consisting of cards
  (where each card is expandable to reveal more information
  if clicked on) and this acts as a container for these cards. */
export default class DropDownNodeMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: 1 };
  }

  /* When there is a change e.g. if the user chooses another element the state changes to that
  chosen elementin the card array */
  handleChange = (event, index, value) => this.setState({ value });

  /* This renders the drop down menu with respect to the individual node cards which are formatted
 as an ExpandableCard component. */
  render() {
    const { checklistToggleMap } = this.props;
    const { nodeTimeDataValues } = this.props;
    const { value } = this.props;
    return (
      <div className="nodeContainer">
        <div className="info-title">Nodes</div>
        <Paper
          value={this.state.value}
          onChange={this.handleChange}
          className="custom-width"
          autoWidth={false}
          
        >
          <ExpandableCard
            checklistToggleMap={checklistToggleMap}
            nodeTimeDataValues={nodeTimeDataValues}
            value={value}
          />
        </Paper>
      </div>
    );
  }
}
DropDownNodeMenu.propTypes = {
  checklistToggleMap: PropTypes.object.isRequired,
  nodeTimeDataValues: PropTypes.object.isRequired,
  value: PropTypes.string.isRequired,
};
