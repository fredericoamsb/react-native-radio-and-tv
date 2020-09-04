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
import DefaultButton from '../../components/DefaultButton';
import styles from './styles';

import logoImg from '../../assets/images/jmv.png';

interface Props {
  privacyPolicy: string;
}

const InfoPage: React.FC<Props> = ({ privacyPolicy }) => {
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
          <Text style={styles.developedBy}>Desenvoldido por:</Text>
          <TouchableWithoutFeedback
            onPress={() => handleDeepLinking('https://jmvtechnology.com')}
          >
            <Image style={styles.jmvLogo} source={logoImg} />
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback
            onPress={() => handleDeepLinking('tel:08000374225')}
          >
            <Text style={styles.phone}>0800 037 4225</Text>
          </TouchableWithoutFeedback>

          <DefaultButton
            onPress={() => handleDeepLinking(privacyPolicy)}
            text="Política de privacidade"
            icon="shield-checkmark"
            color={theme.backgroundColor}
            style={styles.privacyPolicy}
          />
        </View>
      </ScrollView>
    </Page>
  );
};

export default InfoPage;
