import React from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Routes from './navigation/index';
import { LogBox } from "react-native";

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs()

export default function App() {

  const Stack = createNativeStackNavigator();
  return (
    <Provider store={store}>
       <Routes />
    </Provider>
  );
}

