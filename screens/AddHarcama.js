import React,{Component} from 'react';
import {View,Text,StyleSheet,BackHandler} from 'react-native';
import {f,auth,database} from '../config';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';


class AddHarcama extends React.Component {
    static navigationOptions = {
      title: 'AddHarcama',
    };

    handleBackButtonPressAndroid = () => {
        if (!this.props.navigation.isFocused()) {
          // The screen is not focused, so don't do anything
          return false;
        }
    
        if (this.isSelectionModeEnabled()) {
          this.disableSelectionMode();

          this.navigation.navigate('HomeScreen');
    
          // We have handled the back button
          // Return `true` to prevent react-navigation from handling it
          return true;
        } else {
          return false;
        }
      };

    state={
        baslik:'',
        ucret:''
      }

    harcamaEkle=()=>{

      console.log('AddHarcama button pressed');

      f.firestore().doc('users/'+f.auth().currentUser.uid)
      .get()
      .then(doc=>{
        if(!doc.exists){
            console.log("Couldn't find that doc");}
        else{
            const myData=doc.data();

            f.firestore().collection('evler').doc(myData.ev).collection('Harcamalar')
            .add({
                baslik:this.state.baslik,
                ucret:this.state.ucret,
                userAdSoyad:myData.adSoyad
            })
            .then(this.props.navigation.replace('HomeScreen'))
            .catch(err=>{console.log(err)})
        }
      })
    }

    render() {

      return (
        <View style={{flex:1,justifyContent:'flex-start',backgroundColor:'#334'}}>
            <TextInput
            style={styles.InputStyle}
              placeholder="Alınan"
              value={this.state.baslik}
              onChangeText={text=>{this.setState({baslik:text})}}
            />
            <TextInput
            style={styles.InputStyle}
              placeholder="Ücret"
              value={this.state.ucret}
              onChangeText={text=>{this.setState({ucret:text})}}
              keyboardType='email-address'
            />
            <TouchableOpacity
              onPress={()=>this.harcamaEkle()}
            ><Text style={{padding:10,backgroundColor:'#05f',width:'100%',textAlign:'center',color:'#fff',marginTop:25}}>Harcama Ekle</Text></TouchableOpacity>
        </View>
      );
    }
  }

  const styles=StyleSheet.create({
    InputStyle:{
      width:'80%',
      height:40,
      borderRadius: 2,
      borderWidth: 2,
      borderColor: 'gray',
      backgroundColor:'#222',
      marginTop:15,
      paddingHorizontal:10,
      alignSelf: "center",
      color:'white',
    }
  })

  export default AddHarcama;

  