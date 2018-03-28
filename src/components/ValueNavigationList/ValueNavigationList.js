import React from 'react';
import PropTypes from 'prop-types';
import { List, ListItem } from 'material-ui/List';
import Paper from 'material-ui/Paper/Paper';


const ValueNavigationlist = (props) => {
  const {
    listItems,
    selectedItem,
    onValueChange,
  } = props;
  return (
    <Paper className="valueBar">
      <List>
        {
        listItems.map((listItem) => {
          const selected = listItem === selectedItem;
          return (<ListItem
            primaryText={listItem}
            isKeyboardFocused={selected}
            value={listItem}
            onClick={() => onValueChange(listItem)}
          />);
        })
      }
      </List>
    </Paper>

  );
};

ValueNavigationlist.propTypes = {
  listItems: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedItem: PropTypes.string.isRequired,
  onValueChange: PropTypes.func.isRequired,
};

export default ValueNavigationlist;
