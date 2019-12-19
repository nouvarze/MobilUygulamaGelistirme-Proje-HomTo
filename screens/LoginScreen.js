import React,{Component} from 'react';
import {View,Text,StyleSheet, Button} from 'react-native';
import {f,auth,database} from '../config';
import HomeScreen from './HomeScreen';
import App from '../App'
import { TextInput } from 'react-native-gesture-handler';

export default class LoginScreen extends Component {
  state={
    emailValue:'adsf',
    password:'asdf'
  }

    componentDidMount(){
    //this.registerUser("lefeyk@gmail.com","123456");
    f.auth().onAuthStateChanged(function (user){
      if(user){
          console.log("if User");
          
      }
      else{
          console.log("if else");
      }
    });
    }
    render() {
      const {emailValue}=this.state.emailValue;
      const {passwordValue}=this.state;
      return (
          <View>
              <Text>Email: {emailValue}</Text>
              <Text>Password: {passwordValue}</Text>
              <TextInput
              style={styles.InputStyle}
                placeholder="Email Adresi"
                value={emailValue}
                onChangeText={text=>{this.setState({emailValue:text})}}
                keyboardType='email-address'
              />
              <TextInput
              style={styles.InputStyle}
                placeholder="Şifre"
                value={passwordValue}
                onChangeText={text=>{this.setState({passwordValue:text})}}
                secureTextEntry={true}
              />
          </View>
      );
    }
  }

  const styles=StyleSheet.create({
    InputStyle:{
      width:'80%',
      height:40,
      borderRadius: 1,
      borderWidth: 2,
      borderColor: 'gray',
      paddingHorizontal:10,
      alignSelf: "center"
    }
  })