import axios from 'axios';
import { Alert } from 'react-native';
import config from '../config';

const appService = {
  async getInfo() {
    try {
      const url = `https://sitehosting.com.br/controle/mobile_app_config.php?id=${config.id}&key=${config.key}`;
      const { data } = await axios.get(url);
      return data;
    } catch (error) {
      Alert.alert(
        'Atenção',
        'Falha na comunicação com o servidor. Feche o App, verifique sua conexão com a Internet, e tente novamente.',
        [
          {
            text: 'OK',
          },
        ],
        { cancelable: false },
      );
      return false;
    }
  },
};

export default appService;
