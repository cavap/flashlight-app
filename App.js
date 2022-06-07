import React, {useState, useEffect, useCallback} from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import imageLightOff from './assets/icons/eco-light-off.png'
import imageLightOn from './assets/icons/eco-light.png'
import Torch from 'react-native-torch';
import RNShake from 'react-native-shake';

const App = () => {
  const [toggle, setToggle] = useState(false);
  const handleToggle = useCallback(() => setToggle(_ => !toggle));

  useEffect(() => {
    Torch.switchState(toggle);
  }, [toggle]);

  useEffect(() => {
    const subscription = RNShake.addListener(() => handleToggle());
    return () => subscription.remove();
  }, [handleToggle]);

  return (
    <View style={toggle ? style.lightContainer : style.darkContainer}>
      <TouchableOpacity onPress={handleToggle}>
        <Image style={toggle ? style.lightingOn : style.lightingOff} source={toggle ? imageLightOn : imageLightOff} />
      </TouchableOpacity>
    </View>
  )
};

export default App;

const style = StyleSheet.create({
  darkContainer: {
    flex: 1,
    backgroundColor: 'gray',
    justifyContent: 'center'
  },
  lightContainer: {
    flex: 1,
    backgroundColor: 'lightblue',
    justifyContent: 'center'
  },
  lightingOn: {
    resizeMode: 'contain',
    alignSelf: 'center',
    width: 150,
    height: 150
  },
  lightingOff: {
    resizeMode: 'contain',
    alignSelf: 'center',
    tintColor: 'lightgray',
    width: 150,
    height: 150
  }
});