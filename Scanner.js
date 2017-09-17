import React from 'react';
import {
  AppRegistry,
  Text,
  View,
  Button
} from 'react-native';

export default class Scanner extends React.Component {
    static navigationOptions = {
      title: 'Scanner',
    };
    render() {
        const { navigate } = this.props.navigation;
      return (
        <View>
            <Text>Scanner page</Text>
            <Button
                onPress ={() => navigate('Encrypt')}
                title="Create a QR Code"
            />
        </View>
      );
    }
}