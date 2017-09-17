import React from 'react';
import {
  AppRegistry,
  Text,
  TextInput,
  Button,
  View,
  AsyncStorage
} from 'react-native';
import {createEncryption} from './api';
import RSAKey from 'react-native-rsa';

export default class Encrypt extends React.Component {
    static navigationOptions = {
      title: 'Encrypt',
    };
    constructor(props) {
        super(props);
        this.state = {text: '', cypher_text: ''}
        this.onEncrypt = this.onEncrypt.bind(this);
    }
    onEncrypt() {
        createEncryption("John", this.state.text, (response) => {
            const encrypted_message = response.data.text
            // obviously insecure, use a keychain system irl
            AsyncStorage.setItem("@RSAKeyStore:private_key", response.data.key);

            this.setState({cypher_text: encrypted_message});
        });
    }
    render() {
      return (
          <View style={{padding: 10}}>
            <TextInput
                style={{height: 40}}
                placeholder="Type your plaintext here"
                onChangeText={(text) => this.setState({text})}
            />
            <Button
                onPress={this.onEncrypt}
                title="Generate QR Code"
            />
          </View>
      );
    }
}
