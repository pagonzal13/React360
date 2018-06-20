import React from 'react';
import {
  Environment,
  asset,
  View,
} from 'react-360';

import Mark from './Mark.js';

export default class Background extends React.Component {

  constructor() {
    super();
    //console.log("Esto sale en el constructor");
  }

  componentWillReceiveProps(nextProps) {
    //console.log("Está recibiendo nuevas props");
    let cambiaURL = false;
    if (nextProps.urlBack !== this.props.urlBack) cambiaURL = true;
    if ( nextProps.imgBack !== this.props.imgBack ) {
      Environment.setBackgroundImage(asset(nextProps.imgBack), {format: nextProps.format});
    } else if ( nextProps.urlBack !== this.props.urlBack ){
      Environment.setBackgroundImage(nextProps.urlBack, {format: nextProps.format});
    }
  }

  render() {
    
    return null
  }
};

