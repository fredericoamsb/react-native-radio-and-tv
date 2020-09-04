import React, { useContext } from 'react';
import {
  Text,
  Linking,
  View,
  Image,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';

import { ThemeContext } from '../../contexts/ThemeContext';
import Page from '../../components/Page';
import styles from './styles';

import logoImg from '../../assets/images/jmv.png';

const InfoPage: React.FC = () => {
  const theme = useContext(ThemeContext);

  function handleDeepLinking(url: string) {
    Linking.openURL(url);
  }

  return (
    <Page>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentScrollView}
      >
        <View style={styles.infoContainer}>
          <Text style={[styles.developedBy, { color: theme.developedByColor }]}>
            Desenvoldido por:
          </Text>
          <TouchableWithoutFeedback
            onPress={() => handleDeepLinking('https://jmvtechnology.com')}
          >
            <Image style={styles.jmvLogo} source={logoImg} />
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback
            onPress={() => handleDeepLinking('tel:08000374225')}
          >
            <Text style={[styles.phone, { color: theme.developedByColor }]}>
              0800 037 4225
            </Text>
          </TouchableWithoutFeedback>
        </View>
      </ScrollView>
    </Page>
  );
};

export default InfoPage;
