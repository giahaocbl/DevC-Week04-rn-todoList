import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  TextInput,
  ScrollView,
  ImageBackground,
  KeyboardAvoidingView
} from "react-native";
import { TODOS } from "../utils/data.js";

const TodoItem = props => {
  const statusStyle = {
    backgroundColor: props.todo.status === "Done" ? "#3385FF" : "#0BDE14"
  };

  const onLongPress = todo => {
    const prompt = `"${todo.body}"`;
    Alert.alert(
      "Delete your todo?",
      prompt,
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => props.onDeleteTodo(todo.id) }
      ],
      { cancelable: true }
    );
  };

  return (
    <TouchableOpacity
      key={props.todo.body}
      style={[styles.todoItem, statusStyle]}
      onPress={() => props.onPress(props.idx)}
      onLongPress={() => onLongPress(props.todo)}
    >
      <Text style={styles.todoText}>
        {props.idx + 1}: {props.todo.body}
      </Text>
    </TouchableOpacity>
  );
};

export default class AllScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todoList: TODOS,
      newTodoBody: ""
    };
  }

  onDeleteTodo = id => {
    const list = this.state.todoList.filter(todo => todo.id !== id);
    this.setState({ todoList: list });
  };

  onSubmitTodo = () => {
    const newTodo = {
      body: this.state.newTodoBody,
      status: "Active",
      id: this.state.todoList.length + 1
    };
    const list = this.state.todoList;
    list.push(newTodo);
    this.setState({ todoList: list });
  };

  onPress = i => {
    const todo = this.state.todoList.find((item, j) => j === i);
    this.setState(state => {
      const list = state.todoList.map((item, j) => {
        if (j === i) {
          item.status = item.status === "Done" ? "Active" : "Done";
          return item;
        } else {
          return item;
        }
      });
      return {
        list
      };
    });
    setTimeout(() => {
      this.props.navigation.navigate("SingleTodo", {
        updatedTodo: todo
      });
    }, 300);
  };

  onChangeText = text => {
    this.setState({ newTodoBody: text });
  };

  render() {
    return (
      <ImageBackground style = {styles.container} source = {require('../assets/images/bg.jpg')}>
        <KeyboardAvoidingView enabled behavior = "padding" style = {styles.keyboard}>
          <ScrollView style = {styles.scrollView}>
            <View style={{marginTop : "5%"}}>
              {this.state.todoList.map((todo, idx) => {
                return (
                  <TodoItem
                    key={todo.body}
                    todo={todo}
                    idx={idx}
                    onPress={this.onPress}
                    onDeleteTodo={this.onDeleteTodo}
                  />
                );
              })}
              <View style={styles.inputContainer}>
                <TextInput
                  value={this.state.newTodoBody}
                  style={styles.todoInput}
                  onChangeText={text => this.onChangeText(text)}
                />
                <TouchableOpacity style={styles.button} onPress={this.onSubmitTodo}>
                  <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </ImageBackground>
    );
  }
}

AllScreen.navigationOptions = {
  title: "All Todos"
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
    backgroundColor: "black",
    justifyContent: "center"
  },
  todoItem: {
    margin: 5,
    padding: 10,
    minHeight: 50,
    width: "95%",
    color: "white",
    borderRadius: 5,
    flexWrap: "wrap"
  },
  todoText: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold"
  },
  todoInput: {
    width: "95%",
    minHeight: 30,
    color: "white",
    borderWidth: 3,
    marginTop: "20%",
    marginBottom: "5%",
    paddingHorizontal: "10%",
    fontSize: 18,
    borderColor: "darkblue"
  },
  inputContainer: {
    flex: 1,
    width: "90%",
    marginTop: 20,
    marginBottom: "10%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 100
  },
  button: {
    height: 50,
    width: "50%",
    borderRadius: 10,
    alignItems: "center",
    backgroundColor: "darkblue",
    justifyContent: "center"
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20
  },
  scrollView: {
    flex: 1,
  },
  keyboard: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  }
});
