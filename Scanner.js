import React from 'react';
import {
  AppRegistry,
  Text,
  View,
  Button
} from 'react-native';
import {getPublicKey} from './api';
import RSAKey from 'react-native-rsa';

export default class Scanner extends React.Component {
    static navigationOptions = {
      title: 'Scanner',
    };
    onDecode(encrypted) {
        getPublicKey("John", (response) => {
            const rsa = new RSAKey();
            rsa.setPublicString(response.public);
            rsa.setPrivateString(/* get private string */);
            const decrypted = rsa.decrypted(encrypted);
            console.log(response);
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