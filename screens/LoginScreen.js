import React,{Component} from 'react';
import {View,Text,StyleSheet, Alert} from 'react-native';
import {f,auth,database} from '../config';
import HomeScreen from './HomeScreen';
import App from '../App'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';


export default class LoginScreen extends Component {
  state={
    emailValue:'',
    password:''
  }

    loginButton=(email,password)=>{
      f.auth().signInWithEmailAndPassword(email,password)
      .then(()=>{ 
        console.log('Logged in successfully');

        console.log(f.auth().currentUser.uid);
        this.props.navigation.replace('HomeScreen');

        })
      .catch(function(error){
        //Handle errors here
        var errorCode=error.code;
        var errorMessage='';

        console.log('Error code: '+errorCode+'\n Error Message: '+errorMessage);

        switch(error.code){
          case 'auth/user-not-found':
            errorMessage='Kullanıcı bulunamadı.';
            break;
          default:
            errorMessage='Bilinmeyen hata meydana geldi. Hata kodu:'+errorCode;
        }

        Alert.alert(
          'Hata',
          errorMessage,
          [
            {text: 'Kapat', onPress: () => console.log('OK Pressed')},
          ],
          {cancelable: true},
        );
      })
    }
    
    
    render() {
      const {emailValue}=this.state;
      const {passwordValue}=this.state;      

      

      return (
        <View style={{backgroundColor:'#777',flex:1}}>
          <View style={{justifyContent:"space-around",alignItems:"center"}}>
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
              <TouchableOpacity
                style={styles.ButtonStyle}
                onPress={()=>this.loginButton(emailValue,passwordValue)}>
                <Text style={{color:'white'}}>Giriş Yap</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.ButtonStyle}
                onPress={()=>this.props.navigation.navigate('RegisterScreen')}>
                <Text style={{color:'lightgray'}}>Hesabın yok mu? Üye ol</Text>
              </TouchableOpacity>
          </View>
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