import React, { useContext } from 'react';
import { SafeAreaView, View } from 'react-native';

import { ThemeContext } from '../../contexts/ThemeContext';
import styles from './styles';

interface Props {
  backgroundColor?: string;
}

const Page: React.FC<Props> = ({ children, backgroundColor }) => {
  const theme = useContext(ThemeContext);

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: theme.tabsBackgroundColor }]}
    >
      <View
        style={[
          styles.page,
          { backgroundColor: backgroundColor || theme.backgroundColor },
        ]}
      >
        {children}
      </View>
    </SafeAreaView>
  );
};

export default Page;
