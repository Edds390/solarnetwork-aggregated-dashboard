import React from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import ExpandableCard from '../DataTable/ExpandableCard';

const styles = {
  customWidth: {
    width: 600,
  },
};

export default class DropDownNodeMenu extends React.Component {

  constructor(props) {
    super(props);
    this.state = {value: 1};
  }

  handleChange = (event, index, value) => this.setState({value});

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
        <ExpandableCard nodeMap={this.props.nodeMap}/>
        </DropDownMenu>
      </div>
    );
  }
}