import React from "react";
import { View, Text } from "native-base";
import MapView from "react-native-maps";
import styles from "./MapContainerStyles";
import SearchBox from "../SearchBox";

export const MapContainer = ({ region }) => {
  console.debug(region);
  return (
    <View style={styles.map}>
      <MapView
        provider={MapView.PROVIDER_GOOGLE}
        style={styles.map}
        region={region}
      >
        <MapView.Marker coordinate={region} pinColor="green" />
      </MapView>
      <SearchBox />
    </View>
  );
};
export default MapContainer;
