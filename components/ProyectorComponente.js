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

const ConexionModule = NativeModules.ConexionModule;

//Este array tendrá que reemplazarse por uno con las imagenes que elija el profesor en EDiphy
const arrayImgs = [
  {
    key: 0,
    currentImg: 'madrid.jpg',
  },
  {
    key: 1,
    currentImg: 'cibeles.jpg',
  },
  {
    key: 2,
    currentImg: 'escaperoom.jpg',
  }
];

export default class ProyectorComponente extends React.Component {

  constructor() {
    super();
    this.state = {
      keySelected: 0,
      currentImg: undefined,
    };
    this.escucharConexion=this.escucharConexion.bind(this);
    this.onPrevClick=this.onPrevClick.bind(this);
    this.onNextClick=this.onNextClick.bind(this);
  }

  escucharConexion() {
    ConexionModule.conexionIframe(datos => {
      if(datos.urlPanel){
          this.setState({
            currentImg: datos.urlPanel
          });
      }
      this.escucharConexion();
    });
  }

  componentDidMount() {
    this.escucharConexion();
  }

  onPrevClick(){
    let key = this.state.keySelected;
    if(key != undefined){
      if(key == 0){key = 0;}else{ key = key-1;}
    }else{return null;}
    this.setState({keySelected: key, currentImg: arrayImgs[key].currentImg});
  }
  onNextClick(){
    let key = this.state.keySelected;
    if(key != undefined){
      if(key == arrayImgs.length-1){key = arrayImgs.length-1;}else{key = key+1;}
    }else{return null;}
    this.setState({keySelected: key, currentImg: arrayImgs[key].currentImg});
  }

  render() {
    if (!this.state.currentImg) {
      return (
        <View style={styles.none}>
          <Text style={styles.flatpanelText}>Loading...</Text>
        </View>
      );
    }else{
          return (
            <View style={styles.flatpanel}>
              <View style={styles.controls}>
                <VrButton onClick={this.onPrevClick}>
                  <Image style={styles.iconPrev} source={asset('icons/prev.png')} />
                </VrButton>
                <Image style={styles.img} source={{uri: this.state.currentImg}} />
                <VrButton onClick={this.onNextClick}>
                  <Image style={styles.iconNext} source={asset('icons/next.png')} />
                </VrButton>
              </View>
            </View>
          );
    }
  }
};

const styles = StyleSheet.create({
 flatpanel: {
    width: 700,
    height: 400,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderColor: '#303050',
    borderWidth: 2,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    
  },
  none: {
    display: 'none',
  },
  flatpanelText: {
    alignItems: 'center',
    margin: 30,
    color: 'white',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 170,
  },
  iconPrev: {
    alignSelf: 'flex-start',
    margin: 1,
    width: 30,
    height: 50,
  },
  iconNext: {
    alignSelf: 'flex-end',
    margin: 1,
    width: 30,
    height: 50,
  },
  img: {
    margin: 10,
  },
});

