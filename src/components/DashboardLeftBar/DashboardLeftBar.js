import React from 'react';
import PropTypes from 'prop-types';
import Drawer from 'material-ui/Drawer';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import Checkbox from 'material-ui/Checkbox';
import cloneDeep from 'lodash';

import './DashboardLeftBar.css';

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
   return (
     <div>
       <RaisedButton
         label="Toggle Node Selection"
         onClick={this.handleToggle}
       />
       <Drawer open={this.state.open}>
         <div>Select Nodes</div>
         <Divider />
         {this.state.nodes.map((node, i) => (
           <div>
             <Checkbox
               key={`${node}_${i + 1}`}
               label={`Node: ${node.nodeId}`}
               checked={node.checked}
               onCheck={() => this.updateCheck(node)}
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
  nodes: PropTypes.array,
}
