import React from 'react';
import PropTypes from 'prop-types';
import { List, ListItem } from 'material-ui/List';
import Paper from 'material-ui/Paper/Paper';
import './ValueNavigationList.css';


const ValueNavigationlist = (props) => {
  const {
    listItems,
    selectedItem,
    onValueChange,
  } = props;
  return (
    <div>
      <div className="info-title">
        Values
      </div>
      <Paper className="valueContainer" zDepth="1">
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
    </div>
  );
};

ValueNavigationlist.propTypes = {
  listItems: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedItem: PropTypes.string.isRequired,
  onValueChange: PropTypes.func.isRequired,
};

export default ValueNavigationlist;
