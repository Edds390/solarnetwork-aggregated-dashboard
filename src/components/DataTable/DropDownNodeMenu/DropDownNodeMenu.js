import React from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import ExpandableCard from '../ExpandableCard/ExpandableCard';
import Paper from 'material-ui/Paper';
import './DropDownNodeMenu.css';

/* Manual input at this stage representing dummy data to be parsed through for each card,
that represents each node. The intention is to obtain information in the format below and
to be transferred between the components as props. */
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
      <div className="nodeContainer">
        <div className="info-title">Nodes</div>
        <Paper
          value={this.state.value}
          onChange={this.handleChange}
          className="custom-width"
          autoWidth={false}>
          <ExpandableCard nodeMap={nodeMap} />
        </Paper>
      </div>
    );
  }
}
