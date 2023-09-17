import React, { useEffect } from "react";
import {
  Platform,
  StatusBar,
  KeyboardAvoidingView,
  StyleSheet,
} from "react-native";
import MainNavigator from "./navigations/MainNavigator";
import Orientation from "react-native-orientation";
import { requestCameraPermission } from "./components";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { YaMap } from 'react-native-yamap';
import { API_KEY } from "./constants";

YaMap.init(API_KEY);

const MyApp = () => {

  useEffect(() => {
    Orientation.lockToPortrait();
    if(Platform.OS === 'android'){
      requestCameraPermission()
    }
  });

  return (
      <KeyboardAvoidingView
        behavior={"padding"}
        style={styles.KeyboardAvoidingView}
        contentContainerStyle={styles.contentContainerStyle}
        enabled={Platform.OS === "ios"}>
        <StatusBar barStyle="dark-content" hidden={false} backgroundColor="white" />
        <MainNavigator />
      </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:getStatusBarHeight(true)

  },
  KeyboardAvoidingView: {
    flex: 1,
    backgroundColor: "#000",
  },
  contentContainerStyle: {
    flex: 1,
    backgroundColor: "#000",
  },

});
export default MyApp;
