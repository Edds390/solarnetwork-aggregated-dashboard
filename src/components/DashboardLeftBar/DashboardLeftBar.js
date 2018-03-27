import React from 'react';
import PropTypes from 'prop-types';
import Drawer from 'material-ui/Drawer';
import { List } from 'material-ui-icons';
import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider';
import Checkbox from 'material-ui/Checkbox';
import cloneDeep from 'lodash';

import './DashboardLeftBar.css';

const styles = {
  listIcon: {
    position: 'absolute',
    bottom: '30px',
    left: '30px',
    zIndex: 1500,
    backgroundColor: 'coral',
    borderRadius: '50px',
  },
};

export default class DashboardLeftBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nodes: this.props.nodes,
      open: false,
    };
    this.updateCheck = this.updateCheck.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
  }

  updateCheck = (node) => {
    const nodes = Array.from(cloneDeep(this.state.nodes));
    const idx = nodes.indexOf(node);
    nodes[idx].checked = !nodes[idx].checked;
    this.setState({ nodes });
  }

 handleToggle = () => {
   this.setState({ open: !this.state.open });
 }

 render() {
   const { open } = this.state;
   return (
     <div>
       <IconButton
         onClick={this.handleToggle}
         style={styles.listIcon}
       >
         <List />
       </IconButton>
       <Drawer
         width={200}
         open={this.state.open}
         onRequestChange={() => this.setState({ open })}
       >
         <Divider />
         {this.state.nodes.map(node => (
           <div>
             <Checkbox
               key={node}
               label={`Node: ${node.nodeId}`}
               checked={node.checked}
               onCheck={() => this.updateCheck(node)}
             />
             <Divider />
             <div className="dataSourceContainer">
               <Checkbox key={1} label="Data source A" />
               <Checkbox key={2} label="Data source B" />
               <Checkbox key={3} label="Data source C" />
             </div>
             <Divider />
           </div>
           ))
         }
       </Drawer>
     </div>
   );
 }
}

DashboardLeftBar.propTypes = {
  nodes: PropTypes.arrayOf(PropTypes.shape({
    nodeId: PropTypes.number.isRequired,
    checked: PropTypes.bool.isRequired,
  })).isRequired,
};
