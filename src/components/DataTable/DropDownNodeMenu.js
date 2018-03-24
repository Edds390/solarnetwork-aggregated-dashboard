import React from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import CardExampleExpandable from '../DataTable/CardExampleExpandable';

const styles = {
  customWidth: {
    width: 300,
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
         <CardExampleExpandable />
        </DropDownMenu>
      </div>
    );
  }
}