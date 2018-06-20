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
import MarksComponente from './components/Marks.js';
const Proyector = () => (
  <ProyectorComponente/>
);
const Marks = () => (
  <MarksComponente/>
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
      
      if(datos.audioBack){
        /*try{
          AsyncStorage.setItem('showAudio', datos.audioBack.play);
        }catch(error){
          console.log("Error al guardar datos");
        }*/
          this.setState({
            showAudio: datos.audioBack.play
          });
      }
      if(datos.urlBack){
        /*try{
          AsyncStorage.setItem('urlBack', datos.urlBack);
        }catch(error){
          console.log("Error al guardar datos");
        }*/
        this.setState({
          urlBack: datos.urlBack
        });
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
      }
     
      
      this.escucharConexion();
    });
  }

  componentDidMount() {
    this.escucharConexion();
    /*try {
      const valueI = AsyncStorage.getItem('imgBack');
      valueI.then(valor =>{
        if(valor !== null){
          this.setState({ imgBack: valor });
        }
      });
      const valueA = AsyncStorage.getItem('showAudio');
      valueA.then(valor =>{
        if(valor !== null){
          this.setState({ showAudio: valor });
        }
      });
      const valueU = AsyncStorage.getItem('urlBack');
      valueU.then(valor =>{
        if(valor !== null){
          this.setState({ urlBack: valor });
        }
      });
      const valueM = AsyncStorage.getItem('marks');
      valueM.then(valor =>{
        if(valor !== null){
          this.setState({ marks: valor });
        }
      });
    }catch(error){
      console.log("Error al leer datos");
    }*/
    
  }

  _playAudio = () => {
    let visor = ConexionModule.enVisor(visor => {
      if(visor === 'true'){
        //console.log("Empieza el audio de ambiente");
        AudioModule.playEnvironmental({
          source: asset('audio/Blue_Jacket.mp3'),
          volume: 0.7,
        });
      }
    });
  };
  _stopAudio = () => {
    //console.log("Se para el audio de ambiente");
    AudioModule.stopEnvironmental();
  };

  render() {
    
      return (
        <View style={styles.panel}>
  
          <Background imgBack={this.state.imgBack} urlBack={this.state.urlBack} format={this.state.format} />
          {this.state.showAudio ? (
            <View style={styles.controls}>
            <VrButton onClick={this._playAudio} style={styles.button}>
                <Text style={styles.buttonText}>{'Play'}</Text>
            </VrButton>
            <VrButton onClick={this._stopAudio} style={styles.button}>
                <Text style={styles.buttonText}>{'Stop'}</Text>
            </VrButton>
          </View>) : null}
          
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
    overflow: 'visible'
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
AppRegistry.registerComponent('Marks', () => Marks);
