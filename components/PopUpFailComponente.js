import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  NativeModules,
  VrButton,
  asset,
} from 'react-360';

export default class PopUpFailComponente extends React.Component {

  render() {
    if (!this.props.show) {
      return null;
    }else{
          return (
            <View style={styles.flatpanel}>
              <Text>{this.props.text}</Text>
            </View>
          );
    }
  }
};

const styles = StyleSheet.create({
  flatpanel: {
    // Fill the entire surface
    width: 600,
    height: 300,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

