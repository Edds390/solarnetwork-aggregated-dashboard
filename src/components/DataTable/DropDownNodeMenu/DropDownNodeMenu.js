import React from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import ExpandableCard from '../ExpandableCard/ExpandableCard';

/* Provided by Material UI for the width of the drop down menu.
TO DO: Place this formatting into separate .css file */
const styles = {
  customWidth: {
    width: 600,
  },
};

/* Manual input at this stage representing dummy data to be parsed through for each card,
that represents each node. The intention is to obtain information in the format below and
to be transferred between the components as props. */
const nodeMap = [
  {
    title: 'Node 263',
    minPower: 'Min Power: 288 Watts',
    maxPower: 'Max Power: 465 Watts',
  },
  {
    title: 'Node 5',
    minPower: 'Min Power: 123 Watts',
    maxPower: 'Max Power: 354 Watts',
  },
  {
    title: 'Node 135',
    minPower: 'Min Power: 7 Watts',
    maxPower: 'Max Power: 45 Watts',
  },
];

/* Is a drop down menu consisting of cards (where each card is expandable to reveal more information
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
 as an ExpandableCard component. There is one MenuItem or element as "Choose Node" because there
 isn't a place holder text option. If this is clicked on, it will close the drop down menu */
  render() {
    return (
      <div>
        <DropDownMenu
          value={this.state.value}
          onChange={this.handleChange}
          style={styles.customWidth}
          autoWidth={false}
        >
          <MenuItem value={1} label="Choose Node" primaryText="Choose Node" />
          <ExpandableCard nodeMap={nodeMap} />
        </DropDownMenu>
      </div>
    );
  }
}
