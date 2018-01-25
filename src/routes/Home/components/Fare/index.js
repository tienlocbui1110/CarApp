import React from "react";
import { Text } from "react-native";
import { View } from "native-base";

import style from "./FareStyle";

export const Fare = ({ fare }) => {
  return (
    <View style={style.fareContainer}>
      <Text>
        <Text style={style.fareText}> Gia tien: </Text>
        <Text style={style.amount}>{fare}</Text>
        <Text style={style.fareText}> VND</Text>
      </Text>
    </View>
  );
};

export default Fare;
