import React from "react";
import { Text, Image } from "react-native";
import { View, Button } from "native-base";
import Icon from "../../../../../node_modules/react-native-vector-icons/dist/FontAwesome";

import style from "./DOTWFStyle";

export const DriverOnTheWayFooter = ({ driverInfo, distanceFromDriver }) => {
  const { vehicle } = driverInfo || {};
  const { duration } = distanceFromDriver.rows[0].elements[0] || "";
  return (
    <View style={style.footerContainer}>
      <View style={style.iconContainer}>
        <Icon name="window-minimize" style={style.icon} />
        <Text style={style.distanceText}>
          {duration.value < 100 ? "Your driver has arrived" : duration.text}
        </Text>
        <Text style={style.onWayText}>Your driver is on the way</Text>
        <Text style={style.vehicleText}>
          {vehicle && vehicle.plateNumber} {vehicle && vehicle.model}
        </Text>
      </View>
    </View>
  );
};

export default DriverOnTheWayFooter;
