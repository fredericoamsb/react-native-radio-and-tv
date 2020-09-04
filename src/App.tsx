import React from 'react';
import { ActivityIndicator } from 'react-native';
import { Navigation } from 'react-native-navigation';

import MainTabbedNavigator from './Navigators/MainTabbedNavigator';

const init = () => {
  Navigation.registerComponent('Loader', () => () => (
    <ActivityIndicator
      color="#fff"
      size="large"
      style={{ flex: 1, backgroundColor: '#111' }}
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
