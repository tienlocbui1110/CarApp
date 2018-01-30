import React from "react";
import { Text, Image } from "react-native";
import { View, Button } from "native-base";

import style from "./DriverFoundStyle";

export const DriverFound = ({ driverInfo, getDriverLocation }) => {
  const { profilePic } = driverInfo || "";
  const { vehicle } = driverInfo || {};
  return (
    <View style={style.findDriverContainer}>
      <View style={style.content}>
        <Text>YAY Driver Found!</Text>
        <Image
          resizemode="contain"
          style={style.driverPic}
          source={{ uri: profilePic }}
        />
        <View style={style.driverInfo}>
          <Text style={style.quotationMarkLeft}>""</Text>
          <View style={style.driverBio}>
            <Text style={style.bioText}>Hi my name is</Text>
            <Text style={style.nameText}>
              {driverInfo.firstName} {driverInfo.lastName}
            </Text>
            <Text style={style.bioText}>and I'm 0.5km away</Text>
          </View>
          <Text style={style.quotationMarkRight}>""</Text>
        </View>

        <View style={style.vehicleDetails}>
          <Text style={style.vehicleText}>Vehicle Plate Number:</Text>
          <Text style={style.vehicleNumber}>
            {vehicle && vehicle.plateNumber}
          </Text>
          <Button style={style.nextBtn} onPress={() => getDriverLocation()}>
            <Text style={style.vehicleText}>Next</Text>
          </Button>
        </View>
      </View>
    </View>
  );
};

export default DriverFound;
