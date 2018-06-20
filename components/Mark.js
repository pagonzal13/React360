import React from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  Environment,
  asset,
  VrButton
} from 'react-360';

import Entity from 'Entity';
export default class Mark extends React.Component {

  constructor() {
    super();
    this.handleMarkClick = this.handleMarkClick.bind(this);
  }

  render() {
    console.log(this.props.title)
    return (
      <VrButton style={styles.mark} onClick={this.handleMarkClick}>
      {/*<Image  style={styles.img} source={asset('icons/mapmarker.png')} />*/}
      <Entity
      source={{
        obj: asset('icons/model.obj'),
        mtl: asset('icons/materials.mtl'),
      }}
      style={{color: '#ff0000', transform: [
            {scale: [3,3,3]},
            {translate: [3,3,3]}
            ]}}
    />
      <Text>{this.props.title}</Text>
      </VrButton>
    );
  }

  handleMarkClick(){
      switch (this.props.connectMode) {
        case 'popup':
          // TODO
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
