import React from "react";
import { View, Text } from "native-base";
import MapView from "react-native-maps";
import { Image } from "react-native";
import styles from "./MapContainerStyles";
import SearchBox from "../SearchBox";
import SearchResults from "../SearchResults";

export const MapContainer = ({
  region,
  getInputData,
  toggleSearchResultModel,
  getAddressPrediction,
  resultTypes,
  predictions,
  getSelectedAddress,
  selectedAddress,
  nearbyDrivers,
  carIcon
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

        {nearbyDrivers &&
          nearbyDrivers.map((marker, index) => {
            return (
              <MapView.Marker
                key={index}
                coordinate={{
                  latitude: marker.coordinate.coordinates[1],
                  longitude: marker.coordinate.coordinates[0]
                }}
              >
                <Image source={carIcon} style={{ width: 50, height: 50 }} />
              </MapView.Marker>
            );
          })}
      </MapView>
      <SearchBox
        getInputData={getInputData}
        toggleSearchResultModel={toggleSearchResultModel}
        getAddressPrediction={getAddressPrediction}
        selectedAddress={selectedAddress}
      />
      {(resultTypes.pickUp || resultTypes.dropOff) && (
        <SearchResults
          predictions={predictions}
          getSelectedAddress={getSelectedAddress}
        />
      )}
    </View>
  );
};
export default MapContainer;
