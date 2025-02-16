import React from "react";
import { 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  Dimensions,
  ActivityIndicator,
  View 
} from "react-native";

import { LargeTextButtonProps } from "../../types/Props";

interface ExtendedLargeTextButtonProps extends LargeTextButtonProps {
  loading?: boolean;
}

const LargeTextButton: React.FC<ExtendedLargeTextButtonProps> = ({ 
  onPress, 
  buttonText,
  loading = false 
}) => {
  return (
    <TouchableOpacity 
      style={styles.button} 
      onPress={onPress}
      disabled={loading}
    >
      <View style={styles.contentContainer}>
        <Text style={styles.button_text}>{buttonText}</Text>
        {loading && (
          <ActivityIndicator 
            size="large"  
            color="#FFFFFF"  
            style={styles.spinner}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#5dbea3",
    width: Dimensions.get("window").width * 0.5,
    height: Dimensions.get("window").height * 0.05,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: Dimensions.get("window").height / 2,
    shadowColor: "#8E8E8E",
    shadowRadius: 2,
    shadowOpacity: 0.7,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 2,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10  // Increased gap
  },
  button_text: {
    color: "white",
    fontFamily: "Quicksand-Medium",
    fontSize: Dimensions.get("window").height * 0.027,
  },
  spinner: {
    height: Dimensions.get("window").height * 0.04,  
    marginLeft: 8  
  }
});

export default LargeTextButton;