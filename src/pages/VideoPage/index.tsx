import React, { useContext } from 'react';
import { ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';

import { ThemeContext } from '../../contexts/ThemeContext';
import Page from '../../components/Page';
import styles from './styles';

interface Props {
  source: string;
}

const VideoPage: React.FC<Props> = ({ source }) => {
  const theme = useContext(ThemeContext);

  return (
    <Page backgroundColor={theme.videoPageBackgroundColor}>
      <ActivityIndicator
        style={styles.spinner}
        color={theme.textLightColor}
        size="large"
      />
      <WebView
        style={styles.webView}
        originWhitelist={['*']}
        source={{ uri: source }}
        allowsInlineMediaPlayback
        allowsFullscreenVideo
      />
    </Page>
  );
};

export default VideoPage;
