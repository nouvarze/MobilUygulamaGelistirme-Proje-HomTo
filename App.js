import React from 'react';
import { StyleSheet, Text, View, YellowBox } from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import AddHarcama from './screens/AddHarcama';
import _ from 'lodash';

YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};

const App = createStackNavigator(
  {
  LoginScreen:{screen:LoginScreen},
  HomeScreen: {screen:HomeScreen},
  RegisterScreen:{screen:RegisterScreen},
  AddHarcama:{screen:AddHarcama}
},
{
  initialRouteName:'LoginScreen',
  defaultNavigationOptions:{
    title:'App'
  }
}
);

export default createAppContainer(App);

  // navigateToScreen(){
  //   const {navigate} = this.props.navigation.navigate;
  //   //this.registerUser("lefeyk@gmail.com","123456");
  //   f.auth().onAuthStateChanged(function (user){
  //     if(user){
  //       navigate(HomeScreen,);
  //     }
  //     else{
  //       navigate('LoginScreen');
  //     }
  //   })

  // registerUser=(email,password)=>{
  //   console.log(email,password);
  //   f.auth().createUserWithEmailAndPassword(email,password)
  //   .then((userObj)=>console.log(email,password,userObj))
  //   .catch((error)=>console.log("error logging in",error));
  // }