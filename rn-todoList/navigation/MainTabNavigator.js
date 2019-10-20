import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";
import CompleteScreen from "../screens/CompleteScreen";
import AllScreen from "../screens/AllScreen";
import ActiveScreen from "../screens/ActiveScreen";
import SingleTodoScreen from '../screens/SingleTodoScreen';

const config = Platform.select({
  web: { headerMode: "screen" },
  default: {}
});

const CompleteStack = createStackNavigator(
  {
    Complete: CompleteScreen
  },
  config
);

CompleteStack.navigationOptions = {
  tabBarLabel: "Complete",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-done-all" : "md-done-all"}
    />
  )
};

CompleteStack.path = "";

const AllStack = createStackNavigator(
  {
    All: AllScreen,
    SingleTodo: SingleTodoScreen
  },
  config
);

AllStack.navigationOptions = {
  tabBarLabel: "All",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-list" : "md-list"}
    />
  )
};

AllStack.path = "";

const ActiveStack = createStackNavigator(
  {
    Active: ActiveScreen
  },
  config
);

ActiveStack.navigationOptions = {
  tabBarLabel: "Active",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-walk" : "md-walk"}
    />
  )
};

ActiveStack.path = "";

const tabNavigator = createBottomTabNavigator({
  CompleteStack,
  AllStack,
  ActiveStack
});

tabNavigator.path = "";

export default tabNavigator;
