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
      NavigationBar.setVisibilityAsync("hidden"); // Hide navigation bar
      NavigationBar.setBackgroundColorAsync("transparent"); // Fully transparent
      NavigationBar.setBehaviorAsync("inset-swipe"); // Keeps navigation gestures
      NavigationBar.setPositionAsync("absolute"); // Forces it off-screen
      StatusBar.setHidden(true); // Hide status bar for full immersion
    }
  }, []);

  if (!fontsLoaded && !fontError) return <Text>Error Loading Fonts!</Text>;

  if (!initialized) return <Text>Loading...</Text>;

  return isLoggedin ? <AppNavigator /> : <AuthNavigator />;
};

export default App;