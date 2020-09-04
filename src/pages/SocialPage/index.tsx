import React from 'react';
import { Linking, ScrollView } from 'react-native';

import Page from '../../components/Page';
import DefaultButton from '../../components/DefaultButton';
import styles from './styles';

interface Social {
  facebook?: string;
  twitter?: string;
  instagram?: string;
  youtube?: string;
  email?: string;
  whatsapp?: string;
}

interface Props {
  social: Social;
}

const SocialPage: React.FC<Props> = ({ social }) => {
  const items: [string, string][] = Object.entries(social);
  const socialItems = items.filter((i) => i[1]); // list only the registered items

  function handleDeepLinking(socialName: string, source: string) {
    let url = source;

    switch (socialName) {
      case 'email':
        url = `mailto:${source}`;
        break;
      case 'whatsapp':
        url = `https://wa.me/55${source}`;
        break;
      default:
        break;
    }

    Linking.openURL(url);
  }

  function getSocialNetworkColor(socialName: string) {
    switch (socialName) {
      case 'facebook':
        return '#1877f2';
      case 'twitter':
        return '#1da1f2';
      case 'instagram':
        return '#c32aa3';
      case 'youtube':
        return '#ff0000';
      case 'whatsapp':
        return '#25d366';
      default:
        return '#346EBF';
    }
  }

  return (
    <Page>
      <ScrollView contentContainerStyle={styles.contentScrollView}>
        {socialItems.map(([socialName, source], index) => (
          <DefaultButton
            key={String(index)}
            onPress={() => handleDeepLinking(socialName, source)}
            text={`${socialName[0].toUpperCase()}${socialName.slice(1)}`}
            icon={socialName === 'email' ? 'mail' : `logo-${socialName}`}
            style={{ backgroundColor: getSocialNetworkColor(socialName) }}
          />
        ))}
      </ScrollView>
    </Page>
  );
};

export default SocialPage;
