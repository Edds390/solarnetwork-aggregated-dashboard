import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router-dom';
import { WbSunny } from '../../icons';
import solarnodeicon  from '../../icons/solarnodeicon.png';

import './TopNavigationBar.css';

export default function TopNavigationBar() {
  const style = {
    color: '#00bcd4',
  };
  return (
    <div className="topNavigationBar">
      <Link to="/" id="about" className="link">
          <p>About</p>
      </Link>
      <Link to="/home" className="link">
          <img src={solarnodeicon} className="icon" align="middle"/>
      </Link>
      <Link to="/" id="contact" className="link">
          <p>Contact</p>
      </Link>
    </div>
  );
}
