import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
  },

  contentScrollView: {
    flexGrow: 1,
    paddingVertical: 20,
  },

  infoContainer: {
    flex: 1,
    justifyContent: 'space-evenly',
  },

  developedBy: {
    fontSize: 20,
    marginLeft: 30,
  },

  jmvLogo: {
    alignSelf: 'center',
    maxWidth: '100%',
  },

  phone: {
    alignSelf: 'center',
    fontSize: 30,
  },
});

export default styles;
