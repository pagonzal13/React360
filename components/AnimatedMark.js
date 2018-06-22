import React from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  Environment,
  NativeModules,
  asset,
  VrButton,
  Animated,
} from 'react-360';
import Easing from 'react-native';

import Entity from 'Entity';
const AnimatedEntity = Animated.createAnimatedComponent(Entity);
const ConexionModule = NativeModules.ConexionModule;

export default class AnimatedMark extends React.Component {
  rotation = new Animated.Value(0); 

  constructor() {
    super();
    this.handleMarkClick = this.handleMarkClick.bind(this);
    this.spin = this.spin.bind(this);
    this.state = {show:false}
  }

  componentDidMount(){
    this.spin();
  }

  spin = () => {
    this.rotation.setValue(0);
    Animated.timing(this.rotation, {toValue: 360, easing: Easing.linear, duration: 2500}).start((animation) => {
      if (animation.finished) {
        this.spin();
      }
    });
   
  };

  render() {
    let coorX = Number(this.props.value.split(",")[0]);
    let coorY = Number(this.props.value.split(",")[1]);
    let coorZ = Number(this.props.value.split(",")[2]);
    let yPos = -coorX*90/7.5;
    let zPos = 1;
    if (coorZ && coorZ>0) zPos = -1;
    if (coorZ && coorZ>0 && coorX>0) yPos = -(0.5-coorX*90);
    if (coorZ && coorZ>0 && coorX<0) yPos = (1.5-coorX*90);
      return (
        <VrButton style={{ transform: [ {translate: [coorX ,coorY+1, coorZ]}],
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'transparent',
        position: 'absolute',
      }} onClick={this.handleMarkClick}>
           <Text style={{
            fontSize: 0.2, 
            width: 2,
            color: 'black',
            backgroundColor: 'rgba(255, 255, 255, 0.4)',
            transform: [{translate: [0 ,0.8, zPos]}, {rotateY: yPos}], 
            opacity: (this.state.show ? 1:0)}}>
            {this.props.connection}
            </Text>
          <AnimatedEntity
            style={{
              color: this.props.color,
              transform: [
                {scale: 0.01},
                {rotateY: this.rotation}
              ]}}
            source={{
              obj: asset('icons/modelHueco.obj'),
            }}
          />  
        </VrButton>
      )
  }

  handleMarkClick(){
      switch (this.props.connectMode) {
        case 'popup':
        let visor = ConexionModule.enVisor(visor => {
          if(visor === 'true'){
            this.setState({show: !this.state.show});
          }
        });
          return;
        default:
          this.props.onClick(this.props.id, this.props.origin)
      }
  }

};



const styles = StyleSheet.create({
  mark: {
  },
  img: {
    margin: 10,
    width: 64,
    height: 64,
  }
});
