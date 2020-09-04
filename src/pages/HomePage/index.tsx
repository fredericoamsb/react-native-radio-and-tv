import React, { useContext, useState, useRef, useEffect } from 'react';
import { View, Alert, ActivityIndicator, Linking, Text } from 'react-native';
import { WebView, WebViewNavigation } from 'react-native-webview';
import TrackPlayer from 'react-native-track-player';
import { Navigation } from 'react-native-navigation';
import axios from 'axios';

import { ThemeContext } from '../../contexts/ThemeContext';
import Page from '../../components/Page';
import MediaButton from '../../components/MediaButton';
import styles from './styles';

import logoImg from '../../assets/images/media.png';

interface Props {
  media: {
    type: string;
    audio: string;
    video: string;
  };
  website: string;
}

let firstAudioPlay = true;
let trackUpdater: NodeJS.Timeout;
let playListener: TrackPlayer.EmitterSubscription;
let pauseListener: TrackPlayer.EmitterSubscription;
let stopListener: TrackPlayer.EmitterSubscription;
let stateListener: TrackPlayer.EmitterSubscription;
let errorListener: TrackPlayer.EmitterSubscription;

const HomePage: React.FC<Props> = ({ media, website }) => {
  const theme = useContext(ThemeContext);

  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isLoadingAudio, setIsLoadingAudio] = useState(false);
  const [currentTrack, setCurrentTrack] = useState('');

  const webViewRef = useRef<WebView>(null);

  async function setupAudio() {
    const state = await TrackPlayer.getState();

    // if is playing
    if (state === 3 || state === 'playing') {
      setIsPlayingAudio(true);
    } else {
      await TrackPlayer.setupPlayer({
        waitForBuffer: true,
      });

      await TrackPlayer.updateOptions({
        stopWithApp: true,
        capabilities: [
          TrackPlayer.CAPABILITY_PLAY,
          TrackPlayer.CAPABILITY_PAUSE,
          TrackPlayer.CAPABILITY_STOP,
        ],
        compactCapabilities: [
          TrackPlayer.CAPABILITY_PLAY,
          TrackPlayer.CAPABILITY_PAUSE,
          TrackPlayer.CAPABILITY_STOP,
        ],
      });

      const track = {
        id: 'streamingTrack', // Must be a string, required
        url: media.audio, // Load media from the network
        title: 'Ao vivo',
        artist: 'UP!DJs',
        artwork: logoImg, // Load artwork from the app bundle
      };
      await TrackPlayer.add(track);
    }
  }

  async function getCurrentTrack(): Promise<string> {
    const url = media.audio.match(/.*\//); // removes last parameter from the url
    if (url?.length) {
      const response = await axios(url[0]);
      const result: string = await response.data;
      const data = result.match(/class="streamstats">.+?(?=<\/td>)/g);
      if (data) {
        const track = data[6].split('>')[1];
        return track;
      }
    }
    return '';
  }

  async function updateCurrentTrack() {
    const track = await getCurrentTrack();
    const state = await TrackPlayer.getState();
    // if is playing
    if (state === 3 || state === 'playing') {
      setCurrentTrack(track);
      TrackPlayer.updateMetadataForTrack('streamingTrack', {
        title: track,
        artist: 'UP!DJs',
      });
    }
  }

  async function playAudio() {
    if (firstAudioPlay) {
      firstAudioPlay = false;
      addEventListeners();
      await setupAudio();
    }

    setIsLoadingAudio(true);
    await TrackPlayer.play();
    setIsPlayingAudio(true);

    updateCurrentTrack();
    trackUpdater = setInterval(() => {
      updateCurrentTrack();
    }, 10000);
  }

  async function pauseAudio() {
    setIsLoadingAudio(false);
    await TrackPlayer.pause();
    setIsPlayingAudio(false);
    clearInterval(trackUpdater);
    setCurrentTrack('');
  }

  async function stopAudio() {
    setIsLoadingAudio(false);
    await TrackPlayer.stop();
    setIsPlayingAudio(false);
    clearInterval(trackUpdater);
    setCurrentTrack('');
  }

  function onAudioPlaybackStateChanged(response: TrackPlayer.Event) {
    const { state } = response;
    // if is playing
    if (state === 3 || state === 'playing') {
      setIsLoadingAudio(false);
    }
  }

  function onAudioPlaybackError() {
    Alert.alert(
      'Atenção',
      'Erro na reprodução da rádio.',
      [
        {
          text: 'OK',
        },
      ],
      { cancelable: false },
    );
  }

  function toggleAudio() {
    if (isPlayingAudio) {
      pauseAudio();
    } else {
      playAudio();
    }
  }

  async function playVideo() {
    await Navigation.push('HomeStack', {
      component: {
        name: 'VideoPage',
        options: {
          topBar: {
            title: {
              text: 'Transmissão em vídeo',
            },
            visible: true,
          },
        },
      },
    });
    pauseAudio();
    setIsPlayingAudio(false);
  }

  function handleWebViewNavigationStateChange(navigator: WebViewNavigation) {
    // open only the website pages in webview
    if (navigator.url.indexOf(website) === 0) {
      return true;
    }
    // open in browser
    webViewRef.current?.stopLoading();
    Linking.openURL(navigator.url);
    return false;
  }

  function addEventListeners() {
    playListener = TrackPlayer.addEventListener('remote-play', playAudio);
    pauseListener = TrackPlayer.addEventListener('remote-pause', pauseAudio);
    stopListener = TrackPlayer.addEventListener('remote-stop', stopAudio);
    stateListener = TrackPlayer.addEventListener(
      'playback-state',
      onAudioPlaybackStateChanged,
    );
    errorListener = TrackPlayer.addEventListener(
      'playback-error',
      onAudioPlaybackError,
    );
  }

  function removeEventListeners() {
    playListener?.remove();
    pauseListener?.remove();
    stopListener?.remove();
    stateListener?.remove();
    errorListener?.remove();
  }

  useEffect(() => {
    firstAudioPlay = true;

    TrackPlayer.getState().then((state) => {
      // if is playing
      if (state === 3 || state === 'playing') {
        setIsPlayingAudio(true);
        firstAudioPlay = false;
      }
    });

    // unmount
    return () => {
      removeEventListeners();
      clearInterval(trackUpdater);
    };
  }, []);

  return (
    <Page>
      <ActivityIndicator
        style={styles.spinner}
        color={theme.textLightColor}
        size="large"
      />
      <WebView
        ref={webViewRef}
        style={styles.webView}
        originWhitelist={['*']}
        source={{ uri: website }}
        onNavigationStateChange={handleWebViewNavigationStateChange}
        allowsInlineMediaPlayback
        allowsFullscreenVideo
      />
      <View style={styles.buttonsContainer}>
        {media.audio ? (
          <MediaButton
            onPress={toggleAudio}
            icon="headphones"
            isPlaying={isPlayingAudio}
            isLoading={isLoadingAudio}
          />
        ) : null}
        {media.video ? (
          <MediaButton
            onPress={playVideo}
            icon="video"
            style={[
              styles.lastMediaButton,
              { backgroundColor: theme.secondaryColor },
            ]}
          />
        ) : null}
      </View>
      {currentTrack ? (
        <View
          style={[
            styles.currentTrackContainer,
            { backgroundColor: theme.primaryColor },
          ]}
        >
          <Text style={[styles.currentTrack, { color: theme.textLightColor }]}>
            {currentTrack}
          </Text>
        </View>
      ) : null}
    </Page>
  );
};

export default HomePage;
