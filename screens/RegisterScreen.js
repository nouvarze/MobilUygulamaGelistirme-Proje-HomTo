import React,{Component} from 'react';
import {View,Text,StyleSheet,Button} from 'react-native';
import {f,auth,database} from '../config';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';


class RegisterScreen extends React.Component {
    static navigationOptions = {
      title: 'RegisterScreen',
    };

    state={
        emailValue:'',
        password:'',
        adSoyad:''
      }

    registerSuccessful=()=>{
      console.log('register successful ');

      const db = f.firestore();

      console.log('database access');

      db.collection("users").doc(f.auth().currentUser.uid).set({
          adSoyad: this.state.adSoyad,
          email: this.state.emailValue,
          ev: 'ebshtlrLto9T1YBGzmLu',
      });

      this.props.navigation.replace('HomeScreen');
    }

    registerButton=(email,password)=>{

      console.log('register button pressed');

      f.auth().createUserWithEmailAndPassword(email,password)
      .then(()=>this.registerSuccessful())
      .catch(function(error){

        console.log('AUTH ERROR!');
        //Handle errors here
        var errorCode=error.code;
        var errorMessage=error.message;

        console.log('AUTH ERROR!'+errorMessage);
      })
    }

    render() {

      return (
        <View style={{alignItems:"center", backgroundColor:'#777',flex:1}}>
            <TextInput
            style={styles.InputStyle}
              placeholder="Ad Soyad"
              value={this.state.adSoyad}
              onChangeText={text=>{this.setState({adSoyad:text})}}
            />
            <TextInput
            style={styles.InputStyle}
              placeholder="Email Adresi"
              value={this.state.emailValue}
              onChangeText={text=>{this.setState({emailValue:text})}}
              keyboardType='email-address'
            />
            <TextInput
            style={styles.InputStyle}
              placeholder="Şifre"
              value={this.state.password}
              onChangeText={text=>{this.setState({password:text})}}
              secureTextEntry={true}
            />
            <TouchableOpacity
            style={styles.ButtonStyle}
              onPress={()=>this.registerButton(this.state.emailValue,this.state.password)}
            ><Text>Üye Ol</Text></TouchableOpacity>
        </View>
      );
    }
  }

  const styles=StyleSheet.create({
    InputStyle:{
      width:'80%',
      height:45,
      margin:15,
      borderRadius: 15,
      borderWidth: 2,
      borderColor: '#BBB',
      color:'white',
      paddingHorizontal:10,
      alignSelf: "center"
    },
    ButtonStyle:{
      width:240,
      alignItems:'center',
      justifyContent:'center',
      padding:10,
      margin:5,
      borderRadius:8,
      backgroundColor:'#4477FF',
      color:'white'
    }
  })

  export default RegisterScreen;

  