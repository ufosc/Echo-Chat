
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native'
import React from 'react'
import { CounterProps } from '../../utils/types'

export const NearbyHeader: React.FC<CounterProps> = ({ count }) => {
  return (
    <View style={styles.nearbyContainer}>
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.nearbyText}>Nearby</Text>
        <NearbyCount count={count} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  nearbyContainer: {
    paddingTop: Dimensions.get("window").height * 0.01,
    paddingBottom: Dimensions.get("window").height * 0.01,
    flexDirection: "row",
    alignItems: "center",
  },
  nearbyText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "black",
    textAlign: "left",
    width: "35%",
    marginLeft: "5%",
  },
});

export default NearbyHeader;
