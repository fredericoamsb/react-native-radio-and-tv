import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
  logo: {
    alignSelf: 'center',
    resizeMode: 'contain',
    maxHeight: '95%',
    maxWidth: '95%',
  },

  buttonsContainer: {
    position: 'absolute',
    right: 20,
    bottom: 20,
  },

  lastMediaButton: {
    marginTop: 10,
  },

  currentTrackContainer: {
    position: 'absolute',
    left: 20,
    bottom: 20,
    padding: 5,
    borderRadius: 5,
    shadowColor: 'black',
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 5,
    borderWidth: 1,
    borderColor: 'white',
    maxWidth: Dimensions.get('screen').width - 130,
  },

  currentTrack: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default styles;
