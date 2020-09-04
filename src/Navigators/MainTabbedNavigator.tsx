import React from 'react';
import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

import { ThemeContextProvider, theme } from '../contexts/ThemeContext';
import HomePage from '../pages/HomePage';
import SocialPage from '../pages/SocialPage';
import InfoPage from '../pages/InfoPage';
import VideoPage from '../pages/VideoPage';
import appService from '../services/appService';

Navigation.setDefaultOptions({
  topBar: {
    title: {
      color: theme.textLightColor,
    },
    background: {
      color: theme.tabsBackgroundColor,
    },
    backButton: {
      color: theme.textLightColor,
    },
  },
  bottomTab: {
    iconColor: theme.textLightOpaqueColor,
    textColor: theme.textLightOpaqueColor,
    selectedIconColor: theme.textLightColor,
    selectedTextColor: theme.textLightColor,
  },
  bottomTabs: {
    backgroundColor: theme.tabsBackgroundColor,
  },
  statusBar: {
    backgroundColor: theme.tabsBackgroundColor,
  },
});

const navigation = {
  async resetToMainTabsNavigation() {
    const result = await appService.getInfo();

    const data = {
      media: {
        type: result.tipo,
        audio: result.http.audio,
        video: result.http.video,
      },
      social: {
        facebook: result.fanpage,
        twitter: result.twitter,
        instagram: result.instagram,
        youtube: result.youtube,
        email: result.email,
        whatsapp: result.whatsapp,
      },
      website: 'https://updjs.com.br',
    };

    Navigation.registerComponent('HomePage', () => () => (
      <ThemeContextProvider theme={theme}>
        <HomePage media={data.media} website={data.website} />
      </ThemeContextProvider>
    ));

    Navigation.registerComponent('SocialPage', () => () => (
      <ThemeContextProvider theme={theme}>
        <SocialPage social={data.social} />
      </ThemeContextProvider>
    ));

    Navigation.registerComponent('InfoPage', () => () => (
      <ThemeContextProvider theme={theme}>
        <InfoPage />
      </ThemeContextProvider>
    ));

    Navigation.registerComponent('VideoPage', () => () => (
      <ThemeContextProvider theme={theme}>
        <VideoPage source={data.media.video} />
      </ThemeContextProvider>
    ));

    const tabIcons = await Promise.all([
      Icon.getImageSource('home-outline', 26),
      Icon.getImageSource('share-social-outline', 26),
      Icon.getImageSource('information-circle-outline', 26),
    ]);

    const [HomeIcon, SocialIcon, InfoIcon] = tabIcons;

    Navigation.setRoot({
      root: {
        bottomTabs: {
          id: 'TabsLayout',
          children: [
            {
              stack: {
                id: 'HomeStack',
                children: [
                  {
                    component: {
                      id: 'HomePage',
                      name: 'HomePage',
                      options: {
                        topBar: {
                          title: {
                            text: 'UP!DJs',
                          },
                        },
                      },
                    },
                  },
                ],
                options: {
                  bottomTab: {
                    text: 'Início',
                    icon: HomeIcon,
                  },
                },
              },
            },
            {
              stack: {
                children: [
                  {
                    component: {
                      id: 'SocialPage',
                      name: 'SocialPage',
                      options: {
                        topBar: {
                          title: {
                            text: 'Redes sociais',
                          },
                        },
                        bottomTab: {
                          text: 'Social',
                          icon: SocialIcon,
                        },
                      },
                    },
                  },
                ],
              },
            },
            {
              stack: {
                children: [
                  {
                    component: {
                      id: 'InfoPage',
                      name: 'InfoPage',
                      options: {
                        topBar: {
                          title: {
                            text: 'Informações',
                          },
                        },
                        bottomTab: {
                          text: 'Info',
                          icon: InfoIcon,
                        },
                      },
                    },
                  },
                ],
              },
            },
          ],
        },
      },
    });
  },
};

export default navigation;
