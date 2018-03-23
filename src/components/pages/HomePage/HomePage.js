import React from 'react';
import MultiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Home from '../../Home/Home';

import './HomePage.css';

export default function HomePage() {
  return (
    <MultiThemeProvider >
      <Home />
    </MultiThemeProvider>
  );
}
