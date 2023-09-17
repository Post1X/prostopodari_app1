import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  ChooseScreen,
  SignIn,
  SignupScreen,
  SplashScreen,
  WaitingScreen,
  CreateShopScreen,
} from "../screens";
import {
  ChooseName,
  SignInName,
  SignupName,
  SplashName,
  WaitingName,
  CreateShopName,
} from "../constants";

const Stack = createStackNavigator();

function AuthNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={SplashName} component={SplashScreen} />
      <Stack.Screen name={ChooseName} component={ChooseScreen} />
      <Stack.Screen name={SignupName} component={SignupScreen} />
      <Stack.Screen name={SignInName} component={SignIn} />
      <Stack.Screen name={WaitingName} component={WaitingScreen} />
      <Stack.Screen name={CreateShopName} component={CreateShopScreen} />
    </Stack.Navigator>
  );
}

export default AuthNavigation;
