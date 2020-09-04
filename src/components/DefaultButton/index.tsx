import React, { useContext } from 'react';
import {
  Text,
  TouchableNativeFeedback,
  View,
  StyleProp,
  ViewStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { ThemeContext } from '../../contexts/ThemeContext';
import styles from './styles';

interface Props {
  icon: string;
  text: string;
  color?: string;
  style?: StyleProp<ViewStyle>;
  onPress: () => void;
}

const DefaultButton: React.FC<Props> = ({
  icon,
  text,
  color,
  style,
  onPress,
}) => {
  const theme = useContext(ThemeContext);

  return (
    <View
      style={[
        styles.socialItemContainer,
        { backgroundColor: theme.tabsBackgroundColor },
        style,
      ]}
    >
      <TouchableNativeFeedback onPress={onPress}>
        <View style={styles.socialItem}>
          <Icon name={icon} size={20} color={color || theme.textLightColor} />
          <Text
            style={[
              styles.socialItemText,
              { color: color || theme.textLightColor },
            ]}
          >
            {text}
          </Text>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

export default DefaultButton;
