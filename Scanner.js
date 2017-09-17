import React from 'react';
import {
  AppRegistry,
  Text,
  View,
  Button,
  AsyncStorage
} from 'react-native';
import {getPublicKey} from './api';
const RSAKey = require('react-native-rsa');

export default class Scanner extends React.Component {
    static navigationOptions = {
      title: 'Scanner',
    };
    onDecode(encrypted) {
        getPublicKey("John", (response) => {
            AsyncStorage.getItem("@RSAKeyStore:private_key", (err, result) => {
                rsa.setPrivateString(result);
                const decrypted = rsa.decrypted(encrypted);
            });
        });
    }
    render() {
        const { navigate } = this.props.navigation;
      return (
        <View>
            <Text>Scanner page</Text>
            <Button
                onPress ={() => navigate('Encrypt')}
                title="Create a QR Code"
            />
            <Button
                onPress={(e) => this.onDecode(e, /* scanned QR Code */)}
                title="Decode"
            />
        </View>
      );
    }
}