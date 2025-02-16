import React, { useEffect } from "react";
import { Text, Platform, StatusBar } from "react-native";
import * as NavigationBar from "expo-navigation-bar";

// Navigation
import AppNavigator from "./navigation/AppNavigator";
import AuthNavigator from "./navigation/AuthNavigator";
// Services/Hooks/Styles
import { AuthStore } from "./services/AuthStore";
import { useGlobalFonts } from "./styles/fonts";

const App = () => {
  const { initialized, isLoggedin } = AuthStore.useState();
  const { fontsLoaded, fontError } = useGlobalFonts();
  

  // Apply a transparent navigation bar on Android
  useEffect(() => {
    if (Platform.OS === "android") {
      NavigationBar.setVisibilityAsync("hidden"); // hides navigation bar
      NavigationBar.setBackgroundColorAsync("transparent"); //makes background space transparent
      NavigationBar.setBehaviorAsync("inset-swipe"); // maintains navigation swiping
      NavigationBar.setPositionAsync("absolute"); // force status bar off-screen
      StatusBar.setHidden(true);  // hide status bar
    }
  }, []);

  if (!fontsLoaded && !fontError) return <Text>Error Loading Fonts!</Text>;

  if (!initialized) return <Text>Loading...</Text>;

  return isLoggedin ? <AppNavigator /> : <AuthNavigator />;
};

export default App;