import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  NativeModules,
  VrButton,
  Image,
  asset,
} from 'react-360';

import Background from './components/Background.js';
import BackgroundAudio from './components/BackgroundAudio.js';
import ProyectorComponente from './components/ProyectorComponente.js';

const Proyector = () => (
  <ProyectorComponente/>
);
// Extract our custom native module
const ConexionModule = NativeModules.ConexionModule;
const {AudioModule} = NativeModules;

export default class Ediphy360 extends React.Component {

  constructor() {
    super();

    this.state = {
      imgBack: '360_world.jpg',
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
        console.log("aaaaaa " + this.state.imgBack);
        ConexionModule.updateStateIframe(this.state);
      }
      this.escucharConexion();
    });
  }

  componentDidMount() {
    this.escucharConexion();
  }

  _showImgs = () => {
      //Pasar prop true a Proyector para que muestre las imágenes que tiene en su arrayImgs (antes, key e img = undefined)
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
    console.log("bbbbbb: " + this.state.imgBack);
    return (
      <View style={styles.panel}>

        <Background imgBack={this.state.imgBack} format={this.state.format} />
        <BackgroundAudio playAudio={this.state.playAudio} />
      
        <VrButton onClick={this._showImgs}>
          <Image style={styles.imgMenu} source={asset('icons/lecture.png')} />
        </VrButton>
       
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
    width: 900,
    height: 625,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    flexDirection: 'column',
    justifyContent: 'flex-start',
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
  imgMenu: {
    margin: 15,
    width: 100,
    height: 100,
  }
});

AppRegistry.registerComponent('Ediphy360', () => Ediphy360);
AppRegistry.registerComponent('Proyector', () => Proyector);
