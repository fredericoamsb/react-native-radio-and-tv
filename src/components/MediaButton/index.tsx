import React, { useContext, useRef } from 'react';
import {
  TouchableWithoutFeedback,
  StyleProp,
  ViewStyle,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { ThemeContext } from '../../contexts/ThemeContext';
import styles from './styles';

interface Props {
  style?: StyleProp<ViewStyle>;
  isPlaying?: boolean;
  isLoading?: boolean;
  icon: string;
  onPress: () => void;
}

const MediaButton: React.FC<Props> = (props) => {
  const theme = useContext(ThemeContext);

  const rotateAnim = useRef(new Animated.Value(0)).current;

  const { style, isPlaying, isLoading, icon, onPress } = props;

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  if (isLoading) {
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 5000,
        useNativeDriver: true,
      }),
    ).start();
  } else {
    Animated.timing(rotateAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Animated.View
        style={[
          {
            backgroundColor: theme.primaryColor,
            borderColor: theme.textLightColor,
            transform: [{ rotate }],
          },
          styles.button,
          style,
        ]}
      >
        <Icon
          name={isPlaying ? 'pause' : icon}
          size={20}
          color={theme.textLightColor}
        />
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default MediaButton;
