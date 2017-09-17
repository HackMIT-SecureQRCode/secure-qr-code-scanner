import React from 'react';
import {
  AppRegistry,
  Text,
  View,
  Button,
  AsyncStorage,
  StyleSheet,
  AlertIOS
} from 'react-native';
import {getPublicKey} from './api';
const RSAKey = require('react-native-rsa');
import Camera from 'react-native-camera';

export default class Scanner extends React.Component {
    static navigationOptions = {
      title: 'Scanner',
    };
    constructor() {
        super();
        this.state = {isShowingAlert: false}
        this.onBarCodeRead = this.onBarCodeRead.bind(this);
    }
    onDecode(encrypted) {
        getPublicKey("John", (response) => {
            console.log(response);
            AsyncStorage.getItem("@RSAKeyStore:private_key", (err, result) => {
                rsa = new RSAKey();
                rsa.setPublicString(response.data.public);
                rsa.setPrivateString(result);
                const decrypted = rsa.decrypt(encrypted);
                AlertIOS.alert(
                    "QR Found",
                    decrypted,
                    () => {this.setState({isShowingAlert: false})}
                );
            });
        });
    }
    onBarCodeRead(barcode) {
        if(!this.state.isShowingAlert) {
            this.onDecode(barcode.data);
            this.setState({isShowingAlert: true});
        }

    }
    render() {
        const { navigate } = this.props.navigation;
      return (
        <View style={styles.container}>
            <Camera
                ref={(cam) => {
                this.camera = cam;
                }}
                style={styles.preview}
                onBarCodeRead={this.onBarCodeRead}
                aspect={Camera.constants.Aspect.fill}>
            </Camera>
            <Button
                onPress ={() => navigate('Encrypt')}
                title="Create a QR Code"
            />
        </View>
      );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
    },
    preview: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center'
    },
  });