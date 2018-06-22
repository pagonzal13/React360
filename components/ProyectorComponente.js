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

export default class ProyectorComponente extends React.Component {

  constructor() {
    super();
    this.state = {
      arrayImgs: [],
      keySelected: undefined,
      currentImg: undefined,
      showPanel: false,
    };
    this.escucharConexion=this.escucharConexion.bind(this);
    this.onPrevClick=this.onPrevClick.bind(this);
    this.onNextClick=this.onNextClick.bind(this);
  }

  escucharConexion() {
    ConexionModule.conexionIframe(datos => {
      console.log(datos)
      if(datos.imgs && datos.imgs.length > 0){
  
        this.setState({
            arrayImgs: datos.imgs,
            keySelected: 0,
            currentImg: datos.imgs[0].currentImg,
          });
      }
      if(datos.showPanel){
          this.setState({
            showPanel: datos.showPanel.show,
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
    this.setState({keySelected: key, currentImg: this.state.arrayImgs[key].currentImg});
  }
  onNextClick(){
    let key = this.state.keySelected;
    if(key != undefined){
      if(key == this.state.arrayImgs.length-1){key = this.state.arrayImgs.length-1;}else{key = key+1;}
    }else{return null;}
    this.setState({keySelected: key, currentImg: this.state.arrayImgs[key].currentImg});
  }

  render() {
    console.log(this.state)
    if (!this.state.showPanel) {
      return (
        <View style={styles.none}>
          <Text style={styles.flatpanelText}>Loading...</Text>
        </View>
      );
    }else{
          return (
            <View style={styles.flatpanel}>
              <View style={styles.controls}>
                <VrButton onClick={this.onPrevClick} disabled={this.state.arrayImgs.length < 1}>
                  <Image style={styles.iconPrev} source={asset('icons/prev.png')} />
                </VrButton>
               
                {this.state.currentImg ? (
                 /*<Image style={styles.img} source={asset('proyectorImgs/' + this.state.currentImg)} />*/
                 <Image style={styles.img} source={{uri: this.state.currentImg}} />
                ) : <View style={styles.img}></View>}

                <VrButton onClick={this.onNextClick} disabled={this.state.arrayImgs.length < 1}>
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
    height: 550,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderColor: '#303050',
    borderWidth: 2,
    justifyContent: 'center',
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
    width: 600,
    height: 400,
    margin: 10,
  },
});

