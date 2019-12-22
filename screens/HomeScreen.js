import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  StyleSheet
} from "react-native";
import { Card } from "react-native-elements";
import App from "../App";
import { f } from "../config";
import {
  TextInput,
  TouchableOpacity,
  FlatList
} from "react-native-gesture-handler";

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "Ana Sayfa"
  };

  constructor() {
    super();
    this.unsubscribe = null;
    this.state = {
      loading: true,
      harcamalar: []
    };
  }
  componentDidMount() {
    console.log("Homescreen. UID:" + f.auth().currentUser.uid);

    this.renderPage();
  }

  renderPage = ()=>{
    const db = f.firestore();
    db.collection('users').doc(f.auth().currentUser.uid)
      .get()
      .then(doc => {
        if (!doc.exists) {
          console.log("Couldn't find user");
        } else {
          const myData = doc.data();

          console.log(myData.ev);

          db.collection("evler")
            .doc(myData.ev)
            .collection("Harcamalar")
            .get()
            .then(evDoc => {
              this.state.evDoc = evDoc;

              const harcamalar = [];
              evDoc.forEach(hDoc => {
                const { baslik, ucret, userAdSoyad } = hDoc.data();
                harcamalar.push({
                  key: hDoc.id,
                  hDoc,
                  baslik,
                  ucret,
                  userAdSoyad
                });

                this.setState({ harcamalar, loading: false });
              });
            });
        }
      })
      .catch(err => {
        console.log("Data error:" + err);
      });
  }

  render() {
    if (this.state.loading) return <ActivityIndicator size="large" />;
    return (
      <View style={{ flex: 1, backgroundColor: "#555" }}>
        <FlatList
          renderItem={({ item }) => (
            <View
              style={{
                padding: 10,
                backgroundColor: "#dee",
                marginTop: 5,
                marginBottom: 5,
                borderRadius: 15
              }}
            >
              <View style={{ flex: 1, flexDirection: "row" }}>
                <Text style={{ flex: 2, alignSelf: "flex-start" }}>
                  Alınan: {item.baslik}
                </Text>
                <Text style={{ flex: 1, alignSelf: "flex-end" }}>
                  Ücret: {item.ucret} TL
                </Text>
              </View>
              <View style={{ flex: 1, flexDirection: "row" }}>
                <Text style={{ flex: 2, alignSelf: "flex-start" }}>
                  Harcama yapan:
                </Text>
                <Text style={{ flex: 1, alignSelf: "flex-end" }}>
                  {item.userAdSoyad}
                </Text>
              </View>
            </View>
          )}
          data={this.state.harcamalar}
        />

        <TouchableOpacity
          style={{
            width: 60,
            height: 60,
            borderRadius: 30,
            alignItems: "center",
            justifyContent: "center",
            shadowColor: "#333333C0",
            shadowOffset: { x: 1, y: 1 },
            shadowRadius: 30,
            position: "relative",
            alignSelf: "flex-end",
            bottom: 10,
            right: 10,
            backgroundColor: "#226",
            elevation: 20
          }}
          onPress={() => {
            this.props.navigation.replace("AddHarcama");
          }}
        >
          <Text style={{ fontSize: 36, color: "#fff", alignSelf: "center" }}>
            +
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default HomeScreen;
