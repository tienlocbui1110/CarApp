import React from "react";
import { View, Text } from "native-base";
import MapView from "react-native-maps";
import { Image } from "react-native";
import styles from "./MapTrackStyle";

export const MapContainer = ({
  region,
  driverLocation,
  showCarMarker,
  selectedAddress,
  carMarker
}) => {
  const { selectedPickUp, selectedDropOff } = selectedAddress || {};
  return (
    <View style={styles.map}>
      <MapView
        provider={MapView.PROVIDER_GOOGLE}
        style={styles.map}
        region={region}
      >
        {/* Use to rendering Pickup and dropOff */}
        {selectedPickUp && (
          <MapView.Marker coordinate={selectedPickUp} pinColor="green" />
        )}
        {selectedDropOff && (
          <MapView.Marker coordinate={selectedDropOff} pinColor="red" />
        )}
        {showCarMarker && (
          <MapView.Marker
            coordinate={{
              latitude: driverLocation.coordinate.coordinates[1],
              longitude: driverLocation.coordinate.coordinates[0]
            }}
            pinColor="red"
            image={carMarker}
          />
        )}
      </MapView>
    </View>
  );
};
export default MapContainer;
