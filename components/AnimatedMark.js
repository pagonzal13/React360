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
      return (
        <VrButton style={{ transform: [ {translate: [coorX ,coorY+1, coorZ]}],
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: 'transparent'

      }} onClick={this.handleMarkClick}>
           <Text style={{
            fontSize: 0.3, 
            color: 'black',
            backgroundColor: 'white',
            transform: [{translate: [0 ,0.8, 0]}], 
            opacity: (this.state.show ? 1:0)}}>
            {this.props.connection}
            </Text>
          <AnimatedEntity
            style={{
              color: this.props.color,
              transform: [
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
          this.setState({show: !this.state.show});
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
  img: {
    margin: 10,
    width: 64,
    height: 64,
  }
});
