import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default class ActiveScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Active Screen</Text>
      </View>
    );
  }
}

ActiveScreen.navigationOptions = {
  title: "Active Todos"
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
    justifyContent: "center"
  }
});
