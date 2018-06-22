import React from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  Environment,
  asset,
  VrButton,
  AsyncStorage,
  NativeModules,
  Animated,
} from 'react-360';

import AnimatedMark from './AnimatedMark.js';
import PopUpFailComponente from './PopUpFailComponente.js';

const ConexionModule = NativeModules.ConexionModule;

export default class Marks extends React.Component {

  constructor() {
    super();
    this.state = {
      marks: {},
      showPopUp: false,
      textPopUp: "",
    };
    this.escucharConexion=this.escucharConexion.bind(this);
    this.popUpEvent=this.popUpEvent.bind(this);
  }
  escucharConexion() {
    ConexionModule.conexionIframe(datos => {
      if (datos.marks) {
        console.log(datos.marks)
        this.setState({
          marks: datos.marks
        })
      }
      this.escucharConexion();
    });
  }

  componentDidMount() {
    this.escucharConexion();
  }

  render() {
    let marks = [];
    for (let mark in this.state.marks) {
       marks.push(this.state.marks[mark])
    }
    if(marks === []){
      return null
    }else{
     let marcas =  marks.map((mark,key)=>{
      return <AnimatedMark key={key} {...mark} onClick={this.sendMarkEvent} popUpEvent={this.popUpEvent}/>
      })
      return <View>{marcas}
              <PopUpFailComponente show={this.state.showPopUp} text={this.state.textPopUp}/>
      </View>
    }

  }
  sendMarkEvent(mark, box){
    console.log(mark, box);
    ConexionModule.handleMark(mark, box);
  }
  popUpEvent(text){
    console.log("Es un popUp con este texto: " +text);
    this.setState({
      showPopUp: true,
      textPopUp: text,
    });
  }
};

const styles = StyleSheet.create({
  mark: {
  },
});