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
  AsyncStorage,
} from 'react-360';

import Background from './components/Background.js';
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
      imgBack: undefined,
      urlBack: undefined,
      format:'2D',
      playAudio: false,
      showAudio: false,
    };
    this.escucharConexion=this.escucharConexion.bind(this);
  }

  escucharConexion() {
    ConexionModule.conexionIframe(datos => {
      /*try{
          AsyncStorage.setItem('showAudio', datos.audioBack.play);
        }catch(error){
          console.log("Error al guardar datos");
        }*/
      if(datos.audioBack){
          this.setState({
            showAudio: datos.audioBack.play
          });
        this.escucharConexion();
       
      }
      if(datos.urlBack){
        this.setState({
          urlBack: datos.urlBack
        });
        //console.log("Cambia la imagen a: "+this.state.imgBack);
        this.escucharConexion();
      }
      if(datos.imagenBack){
        /*try{
          AsyncStorage.setItem('imgBack', datos.imagenBack);
        }catch(error){
          console.log("Error al guardar datos");
        }*/
        this.setState({
          imgBack: datos.imagenBack
        });
        //console.log("Cambia la imagen a: "+this.state.imgBack);
        this.escucharConexion();
      }
      this.escucharConexion();
    });
  }

  componentDidMount() {
    this.escucharConexion();
    /*try {
      const valueI = AsyncStorage.getItem('imgBack');
      valueI.then(valorI =>{
        if(valorI !== null){
          this.setState({ imgBack: valorI });
        }
      });
      const valueA = AsyncStorage.getItem('showAudio');
      valueA.then(valorA =>{
        if(valorA !== null){
          this.setState({ showAudio: valorA });
        }
      });
      
    }catch(error){
      console.log("Error al leer datos");
    }*/
    
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
    //console.log("La imagen es: "+this.state.imgBack);
    if(this.state.showAudio){
      return (
        <View style={styles.panel}>
  
          <Background imgBack={this.state.imgBack} urlBack={this.state.urlBack} format={this.state.format} />
         
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
    }else{
      return (
        <View style={styles.panel}>
  
          <Background imgBack={this.state.imgBack} urlBack={this.state.urlBack} format={this.state.format} />
      
        </View>
      );
    }
    
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
