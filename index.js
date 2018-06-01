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
import BackgroundAudio from './components/BackgroundAudio.js';

// Extract our custom native module
const ConexionModule = NativeModules.ConexionModule;
const {AudioModule} = NativeModules;

export default class Ediphy360 extends React.Component {

  constructor() {
    super();

    this.state = {
      imgBack: undefined,
      format:'2D',
      playAudio: false,
    };
    this.escucharConexion=this.escucharConexion.bind(this);
  }

  escucharConexion() {
    ConexionModule.conexionIframe(datos => {
      if(datos.audioBack){
          this.setState({
            playAudio: datos.audioBack.play
          });
        this.escucharConexion();
      }
      if(datos.imagenBack){
        this.setState({
          imgBack: datos.imagenBack
        });
        this.escucharConexion();
      }
      this.escucharConexion();
    });
  }

  componentDidMount() {
    this.escucharConexion();
  }

  _playAudio = () => {
    //console.log("Empieza el audio de ambiente");
    AudioModule.playEnvironmental({
      source: asset('audio/Blue_Jacket.mp3'),
      volume: 0.7,
    });
  };
  _stopAudio = () => {
    //console.log("Se para el audio de ambiente");
    AudioModule.stopEnvironmental();
  };

  render() {
    
    return (
      <View style={styles.panel}>

        <Background imgBack={this.state.imgBack} format={this.state.format} />
        <BackgroundAudio playAudio={this.state.playAudio} />
        
        <View style={styles.controls}>
          <VrButton onClick={this._playAudio} style={styles.button}>
              <Text style={styles.buttonText}>{'Play'}</Text>
          </VrButton>
          <VrButton onClick={this._stopAudio} style={styles.button}>
              <Text style={styles.buttonText}>{'Stop'}</Text>
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
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 170,
    padding: 5,
    margin: 30,
  },
  button: {
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: 5,
    justifyContent: 'center',
    width: 60,
    height: 60,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

AppRegistry.registerComponent('Ediphy360', () => Ediphy360);
