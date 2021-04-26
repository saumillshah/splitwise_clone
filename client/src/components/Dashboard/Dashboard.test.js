import React from 'react';
import ReactDOM from 'react-dom';
import DashboardNav from './DashboardNav';

it('renders dashboard', () => {
  const div = document.createElement('div');
  ReactDOM.render(<DashboardNav />, div);
  ReactDOM.unmountComponentAtNode(div);
});
