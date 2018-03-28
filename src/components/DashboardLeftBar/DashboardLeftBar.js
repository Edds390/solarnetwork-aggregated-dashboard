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
    const { checklistToggleMap } = this.props;
    const nodeToDsMap = {};
    Object.keys(checklistToggleMap).forEach((checkListItemLabel) => {
      const nodeId = checkListItemLabel.substr(0, checkListItemLabel.indexOf(' '));
      if (nodeToDsMap[nodeId] === undefined) {
        nodeToDsMap[nodeId] = [];
      }
      nodeToDsMap[nodeId].push(checkListItemLabel.substr(checkListItemLabel.indexOf(' ') + 1));
    });

    this.state = {
      nodes: this.props.nodes,
      open: false,
      checklistRenderMap: nodeToDsMap,
    };
  }

  /**
   * Calls the callback function of DashboardPanel to update the
   * state of those node-datasource combination's toggle state
   * based on whether the checked node's nodeID appears in the
   * combination.
   */
  updateCheckNode = (isInputChecked, nodeString) => {
    const { onCheckboxBulkCheck } = this.props;
    onCheckboxBulkCheck(isInputChecked, nodeString);
  }

  /**
   * Calls the callback function to update the single
   * node-datasource combination associated with the check.
   */
  updateCheckNodeDS = (isInputChecked, nodeDsString) => {
    const { onCheckboxCheck } = this.props;
    onCheckboxCheck(isInputChecked, nodeDsString);
  }

  /**
   * Called for opening or closing the left bar drawer.
   */
  handleToggle = () => {
    this.setState({ open: !this.state.open });
  }

  /**
   * Check if the nodeID checkbox instance should be checked
   * based on the state of the map.
   */
  checkNodeIdIsChecked = (nodeString) => {
    const { checklistToggleMap } = this.props;
    let isChecked = false;
    Object.keys(checklistToggleMap).forEach((nodeIdDs) => {
      if (nodeString === nodeIdDs.substr(0, nodeIdDs.indexOf(' '))) {
        if (checklistToggleMap[nodeIdDs]) {
          isChecked = true;
        }
      }
    });
    return isChecked;
  }

  /**
   * Check if the nodeID-Datasource checkbox instance should be checked
   * based on the state of the map.
   */
  checkNodeDSIsChecked = (nodeDSString) => {
    const { checklistToggleMap } = this.props;
    return checklistToggleMap[nodeDSString];
  }

  render() {
    const { checklistToggleMap } = this.props;
    const { open } = this.state;
    const checklistRenderMap = {};
    Object.keys(checklistToggleMap).forEach((checkListItemLabel) => {
      const nodeId = checkListItemLabel.substr(0, checkListItemLabel.indexOf(' '));
      if (checklistRenderMap[nodeId] === undefined) {
        checklistRenderMap[nodeId] = [];
      }
      checklistRenderMap[nodeId].push(checkListItemLabel.substr(checkListItemLabel.indexOf(' ') + 1));
    });
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
          <div>
            {
                Object.keys(checklistRenderMap).map(nodeString => (
                  <div>
                    <Checkbox
                      key={nodeString}
                      label={nodeString}
                      checked={this.checkNodeIdIsChecked(nodeString)}
                      onCheck={(event, isInputChecked) => this.updateCheckNode(isInputChecked, nodeString)}
                    />
                    <Divider />
                    {checklistRenderMap[nodeString].map(dataSource => (
                      <Checkbox
                        key={`${nodeString} ${dataSource}`}
                        label={`${nodeString} ${dataSource}`}
                        checked={this.checkNodeDSIsChecked(`${nodeString} ${dataSource}`)}
                        onCheck={(event, isInputChecked) => this.updateCheckNodeDS(isInputChecked, `${nodeString} ${dataSource}`)}
                      />))}
                      <br />
                  </div>
                  ))
              }
          </div>

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
  checklistToggleMap: PropTypes.object.isRequired,
  onCheckboxCheck: PropTypes.func.isRequired,
  onCheckboxBulkCheck: PropTypes.func.isRequired,
};
