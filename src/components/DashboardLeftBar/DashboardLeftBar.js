import React from 'react';
import PropTypes from 'prop-types';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import Checkbox from 'material-ui/Checkbox';

import './DashboardLeftBar.css';

export default class DashboardLeftBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedNodes: this.props.selectedNodes,
      open: false,
      checked: true,
    };
    this.updateCheck = this.updateCheck.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
  }

  updateCheck = () => {
    this.setState((oldState) => {
      return {
        checked: !oldState.checked,
      };
    });
  }

 handleToggle = () => {
   this.setState({ open: !this.state.open });
 }

 render() {
   return (
     <div>
       <RaisedButton
         label="Toggle Node Selection"
         onClick={this.handleToggle}
       />
       <Drawer open={this.state.open}>
         <div>Selected Nodes</div>
         <Divider />
         {this.state.selectedNodes.map((node, i) => (
           <div>
             <Checkbox
               key={`${Node}_${i + 1}`}
               label={`Node: ${node}`}
               checked={this.state.checked}
               onCheck={this.updateCheck}
             />
           </div>
           ))
         }
       </Drawer>
     </div>
   );
 }
}

DashboardLeftBar.propTypes = {
  selectedNodes: PropTypes.array,
}
