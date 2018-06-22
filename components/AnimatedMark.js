import React from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  Environment,
  asset,
  VrButton,
  Animated,
} from 'react-360';
import Easing from 'react-native';

import Entity from 'Entity';
const AnimatedEntity = Animated.createAnimatedComponent(Entity);

export default class AnimatedMark extends React.Component {
  rotation = new Animated.Value(0); 

  constructor() {
    super();
    this.handleMarkClick = this.handleMarkClick.bind(this);
    this.spin = this.spin.bind(this);
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
    
      return (
        <VrButton style={styles.mark} onClick={this.handleMarkClick}>
        
          <AnimatedEntity
            style={{
              color: this.props.color,
              transform: [
                {translate: [coorX ,coorY, coorZ]},
                {scale: 0.02},
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
          this.props.popUpEvent(this.props.connection);
          console.log('POPUP');
          return;
        default:
          this.props.onClick(this.props.id, this.props.origin)
      }
  }

};



const styles = StyleSheet.create({
  mark: {
  },
  texto: {
    color: 'red',
    fontSize: 10,
  },
  img: {
    margin: 10,
    width: 64,
    height: 64,
  }
});
