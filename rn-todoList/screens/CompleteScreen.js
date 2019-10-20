import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default class CompleteScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Complete Screen</Text>
      </View>
    );
  }
}


CompleteScreen.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    justifyContent: 'center'
  }
});