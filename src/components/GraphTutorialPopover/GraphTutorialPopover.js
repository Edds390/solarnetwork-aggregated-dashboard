import React from 'react';
import Popover, { PopoverAnimationVertical } from 'material-ui/Popover';
import { IconButton } from 'material-ui';
import HelpIcon from 'material-ui/svg-icons/action/help';
import './GraphTutorialPopover.css';

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
          label="Click me"
          className="helpButton"
        >
          <HelpIcon className="helpIcon" />
        </IconButton>
        
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          onRequestClose={this.handleRequestClose}
          animation={PopoverAnimationVertical}
        >
          Drag Horizontal <br />
          Drag Veritcal
        </Popover>
      </div>
    );
  }
}