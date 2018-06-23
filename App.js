import React from 'react';

import { Main } from './src/components/screens';
import { createBottomTabNavigator } from 'react-navigation';

const Tabs = createBottomTabNavigator(
  {
    nearby: Main,
    search: Main,
    me: Main,
    delivery: Main,
    more: Main,
  },
  {}
);

export default class App extends React.Component {
  render() {
    return <Tabs />;
  }
}
