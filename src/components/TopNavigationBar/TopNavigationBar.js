import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router-dom';
import { WbSunny } from '../../icons';

import './TopNavigationBar.css';

export default function TopNavigationBar() {
  const style = {
    color: '#00bcd4',
  };
  return (
    <div className="topNavigationBar">
      <Link to="/home">
        <FlatButton
          style={style}
          icon={<WbSunny className="icon" />}
        />
      </Link>
    </div>
  );
}
