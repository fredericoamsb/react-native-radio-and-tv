import React from 'react';
import { ActivityIndicator } from 'react-native';
import { Navigation } from 'react-native-navigation';

import MainTabbedNavigator from './Navigators/MainTabbedNavigator';
import { theme } from './contexts/ThemeContext';

const init = () => {
  Navigation.registerComponent('Loader', () => () => (
    <ActivityIndicator
      color={theme.tabsBackgroundColor}
      size="large"
      style={{ flex: 1, backgroundColor: theme.backgroundColor }}
    />
  ));

  Navigation.events().registerAppLaunchedListener(async () => {
    Navigation.setRoot({
      root: {
        component: {
          id: 'Loader',
          name: 'Loader',
        },
      },
    });

    MainTabbedNavigator.resetToMainTabsNavigation();
  });
};

export default init;
