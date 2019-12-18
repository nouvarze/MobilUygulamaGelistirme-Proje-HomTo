import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {f,auth,database} from './config'

export default class App extends React.Component{

  constructor(props){
    super(props);
    //this.registerUser("lefeyk@gmail.com","123456");
    f.auth().onAuthStateChanged(function (user){
      if(user){
        console.log("User Mail: "+user.email+"\nUsername: "+user.displayName);
      }
      else{
        
      }
    })
  }

registerUser=(email,password)=>{
  console.log(email,password);
  f.auth().createUserWithEmailAndPassword(email,password)
  .then((userObj)=>console.log(email,password,userObj))
  .catch((error)=>console.log("error logging in",error));
}

render(){
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
    </View>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
