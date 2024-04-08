import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { useFonts } from "expo-font";
import { WelcomeEmailInput } from "../../components/common/CustomInputs";
import {
  AuthenticationErrorMessage,
  AuthenticationResponse,
  inValidEmailResponse,
} from "../../components/auth/AuthenticationResponse";

const WelcomeScreen = ({ navigation }: any) => {
  const keyboardVerticalOffest = Platform.OS === "ios" ? 0 : 0;
  const keyboardBehavior = Platform.OS === "ios" ? "padding" : undefined;

  const [fontsLoaded, fontError] = useFonts({
    "Gilroy-ExtraBold": require("../../../assets/fonts/Gilroy-ExtraBold.otf"),
    "Gilroy-Light": require("../../../assets/fonts/Gilroy-Light.otf"),
  });

  const [email, setEmail] = useState<string>("");
  const [authResponse, setAuthResponse] =
    React.useState<AuthenticationResponse>();

  if (!fontsLoaded && !fontError) {
    return null;
  }

  const handleLogin = () => {
    const preparedEmail = email.trim();
    if (preparedEmail.length !== 0 && isValidEmail(preparedEmail)) {
      navigation.navigate("Log In", { newEmail: preparedEmail });
      setAuthResponse(undefined);
    } else {
      console.log("Invalid email");
      setAuthResponse({ user: undefined, error: inValidEmailResponse });
    }
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <View>
      <KeyboardAvoidingView
        behavior={keyboardBehavior}
        keyboardVerticalOffset={keyboardVerticalOffest}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.main_container}>
            <View style={styles.sub_container}>
              <View style={styles.image_container}>
                <Image
                  style={styles.image}
                  source={require("../../../assets/talking_location.png")}
                />
              </View>

              <Text style={styles.header_text}>Welcome to Proximity Chat!</Text>

              <View style={styles.info_container}>
                <View style={styles.login_container}>
                  <Text style={styles.login_text}>Login</Text>

                  <View style={styles.login_mini_container}>
                    <WelcomeEmailInput
                      value={email}
                      onChangeText={(text) => setEmail(text)}
                    />

                    <TouchableOpacity
                      style={styles.login_button}
                      onPress={handleLogin}
                    >
                      <Image
                        style={styles.arrow_image}
                        source={require("../../../assets/angle-right.png")}
                      />
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={styles.error_container}>
                  <AuthenticationErrorMessage
                    response={authResponse}
                    onPress={() => setAuthResponse(undefined)}
                  />
                </View>

                <Text>
                  Don't have an account?{" "}
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("Sign Up"); // Need to restyle
                    }}
                  >
                    <Text style={styles.link}>Sign up.</Text>
                  </TouchableOpacity>
                </Text>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    maxWidth: Dimensions.get("window").width * 1,
    maxHeight: Dimensions.get("window").height * 0.37,
    resizeMode: "contain",
  },

  error_container: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
  },

  header_text: {
    fontFamily: "Gilroy-ExtraBold",
    fontSize: Dimensions.get("window").width * 0.07,
  },

  login_text: {
    fontFamily: "Gilroy-Light",
    fontSize: Dimensions.get("window").width * 0.049,
    marginLeft: Dimensions.get("window").width * 0.02,
  },

  main_container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
    width: "100%",
    justifyContent: "flex-end",
    backgroundColor: "white",
  },

  sub_container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    width: Dimensions.get("window").width * 1,
    height: Dimensions.get("window").height * 0.75,
  },

  info_container: {
    width: Dimensions.get("window").width * 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly",
    minHeight: Dimensions.get("window").height * 0.35,
  },

  login_container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    width: Dimensions.get("window").width * 0.8,
    height: Dimensions.get("window").height * 0.09,
  },

  image_container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  login_mini_container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  login_button: {
    backgroundColor: "#5dbea3",
    width: Dimensions.get("window").width * 0.105,
    height: Dimensions.get("window").width * 0.105,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    boxShadow: "0px 0px 34px -3px rgba(0,0,0,0.1)",
    marginLeft: Dimensions.get("window").width * 0.02,
  },

  arrow_image: {
    width: Dimensions.get("window").width * 0.05,
    height: Dimensions.get("window").width * 0.05,
    resizeMode: "contain",
  },

  link: {
    color: "#5dbea3",
    textDecorationLine: "underline",
  },
});

export default WelcomeScreen;
