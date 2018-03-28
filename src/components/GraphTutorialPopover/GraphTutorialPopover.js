import React from 'react';
import Popover, { PopoverAnimationVertical } from 'material-ui/Popover';
import { IconButton } from 'material-ui';
import HelpIcon from 'material-ui/svg-icons/action/help';
import './GraphTutorialPopover.css';

/**
 * Help button popover, used as a means to guide the user on how to
 * interact with the graph component.
 */
export default class PopoverExampleAnimation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };
  }

  handleClick = (event) => {
    // This prevents ghost click.
    event.preventDefault();
    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  };

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

  render() {
    return (
      <div>
        <IconButton
          onClick={this.handleClick}
          className="helpButton"
        >
          <HelpIcon className="helpIcon" />
        </IconButton>

        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
          targetOrigin={{ horizontal: 'left', vertical: 'top' }}
          onRequestClose={this.handleRequestClose}
          animation={PopoverAnimationVertical}
        >
          <div className="helpToolTip">
            <span style={{ fontWeight: 'bold' }}>Zoom by Time</span>: Horizontally drag on grid <br />
            <span style={{ fontWeight: 'bold' }}>Zoom by Value</span>: Vertically drag on grid <br />
            <span style={{ fontWeight: 'bold' }}>Zoom Out</span>: Double-click on grid
          </div>

        </Popover>
      </div>
    );
  }
}
