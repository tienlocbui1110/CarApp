import React from "react";
import { Text } from "react-native";
import { View, Button } from "native-base";
import Icon from "../../../../../node_modules/react-native-vector-icons/dist/FontAwesome";
import style from "./FindDriverStyle";

var Spinner = require("react-native-spinkit");

export const FindDriver = ({ selectedAddress }) => {
  const { selectedPickUp, selectedDropOff } = selectedAddress || {};
  console.debug("Da vao day");
  return (
    <View style={style.findDriverContainer}>
      <Spinner
        style={style.spinner}
        isVisible
        size={150}
        type="Pulse"
        color="#ffffff"
      />
      <View style={style.content}>
        <Text style={style.text}> Processing your request</Text>
        <Icon style={style.locationIcon} name="map-marker" />

        <View style={style.pickup}>
          <Text>{selectedPickUp.name}</Text>
        </View>
        <Icon style={style.toArrow} name="long-arrow-down" />
        <View style={style.dropoff}>
          <Text>{selectedDropOff.name}</Text>
        </View>
        <View>
          <Text style={style.termsText}>
            By booking you confirm that you access our T & C
          </Text>
          <Button style={style.cancelBtn}>
            <Text style={style.cancelBtn}>Cancel </Text>
          </Button>
        </View>
      </View>
    </View>
  );
};

export default FindDriver;
