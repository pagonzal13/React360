import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  NativeModules,
  VrButton,
  asset,
} from 'react-360';

import Background from './components/Background.js';

// Extract our custom native module
const ConexionModule = NativeModules.ConexionModule;

export default class Ediphy360 extends React.Component {

  constructor() {
    super();

    this.state = {
      datosPadre: "Texto provisional",
      imgBack: undefined,
      format:'2D',
    };
  }

  componentDidMount() {
    ConexionModule.conexionIframe(datos => {
      console.log("Ha llegado algo al index! es: " + datos);
      this.setState({
        datosPadre: datos.conexion
      });
    });
  }

  _prevPhoto = () => {
    this.setState({
      imgBack: 'pano-planets.jpg',
    });
  };
  _nextPhoto = () => {
    this.setState({
      imgBack: 'pano-nature.jpg',
    });
  };

  render() {
    
    return (
      <View style={styles.panel}>

        <Background imgBack={this.state.imgBack} format={this.state.format} />
        
        <View style={styles.greetingBox}>
          <Text style={styles.greeting}>
            Esto es lo que queremos comunicar
          </Text>
          <Text style={styles.greeting}>{this.state.datosPadre}</Text>
        </View>
        
        <View style={styles.controls}>
          <VrButton onClick={this._prevPhoto} style={styles.button}>
              <Text style={styles.buttonText}>{'<'}</Text>
          </VrButton>
          <VrButton onClick={this._nextPhoto} style={styles.button}>
              <Text style={styles.buttonText}>{'>'}</Text>
          </VrButton>
        </View>

      </View>
    );
  }
};

const styles = StyleSheet.create({
  panel: {
    // Fill the entire surface
    width: 1000,
    height: 600,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  greetingBox: {
    padding: 20,
    backgroundColor: '#000000',
    borderColor: '#639dda',
    borderWidth: 2,
  },
  greeting: {
    fontSize: 30,
  },
  controls: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 120,
    padding: 10,
  },
  button: {
    backgroundColor: '#c0c0d0',
    borderRadius: 5,
    width: 40,
    height: 44,
  },
  buttonText: {
    textAlign: 'center',
    color: '#000000',
    fontSize: 30,
    fontWeight: 'bold',
  },
});

AppRegistry.registerComponent('Ediphy360', () => Ediphy360);
