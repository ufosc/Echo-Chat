import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";

import LoginScreen from "../screens/auth/LoginScreen";
import SignUpScreen from "../screens/auth/SignUpScreen";
import WelcomeScreen from "../screens/auth/WelcomeScreen";
import EmailVerificationScreen from "../screens/auth/EmailVerificationScreen";
import { NavigationContainer, NavigationIndependentTree } from "@react-navigation/native";
import DisplayNameScreen from "@app/screens/auth/DisplayNameScreen";

const Stack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <NavigationIndependentTree>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Log In" component={LoginScreen} />
          <Stack.Screen name="Sign Up" component={SignUpScreen} />
          <Stack.Screen
            name="Email Verification"
            component={EmailVerificationScreen}
          />
          {/* <Stack.Screen name="Display Name" component={DisplayNameScreen} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </NavigationIndependentTree>
  );
};

export default AuthNavigator;
