import React,{Component} from 'react';
import {View,Text} from 'react-native';

class HomeScreen extends React.Component {
    static navigationOptions = {
      title: 'HomeScreen',
    };
    render() {
      return (
        <View>
              <Text>HomeScreen</Text>
          </View>
      );
    }
  }

  export default HomeScreen;