import React from 'react';
import {
  NativeModules,
  asset,
} from 'react-360';

const {AudioModule} = NativeModules;

export default class BackgroundAudio extends React.Component {

  constructor() {
    super();
    //console.log("Esto sale en el constructor");
  }

  componentWillReceiveProps(nextProps) {
    //console.log("Está recibiendo nuevas props");
    if (
      nextProps.playAudio !== this.props.playAudio
    ) {
      if(nextProps.playAudio){
        //console.log("Empieza el audio de ambiente");
        AudioModule.playEnvironmental({
        source: asset('audio/Blue_Jacket.mp3'),
        volume: 0.7,
      });
      }else{
        //console.log("Se para el audio de ambiente");
        AudioModule.stopEnvironmental();
      }
      
    }
  }

  render() {
    return null;
  }
};

