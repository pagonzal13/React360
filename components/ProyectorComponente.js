import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Environment,
  asset,
} from 'react-360';

export default class ProyectorComponente extends React.Component {

  constructor() {
    super();
  }

  render() {
    return (
      <View style={styles.flatpanel}>
    	<Text style={styles.flatpanelText}>{'Este es su proyector de contenidos'}</Text>
  	</View>
    );
  }
};

const styles = StyleSheet.create({
 flatpanel: {
    width: 1000,
    height: 600,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  flatpanelText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 170,
    padding: 5,
    margin: 30,
    color: 'white',
  },
});

