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

const ConexionModule = NativeModules.ConexionModule;

export default class Marks extends React.Component {

  constructor() {
    super();
    this.state = {
      marks: {},
    };
    this.escucharConexion=this.escucharConexion.bind(this);
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
      return <AnimatedMark key={key} {...mark} onClick={this.sendMarkEvent}/>
      })
      return <View>{marcas}</View>
    }

  }
  sendMarkEvent(mark, box){
    //console.log(mark, box);
    ConexionModule.handleMark(mark, box);
  }
   
};
