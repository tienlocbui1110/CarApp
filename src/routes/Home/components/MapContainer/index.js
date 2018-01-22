import React from "react";
import { View, Text } from "native-base";
import MapView from "react-native-maps";
import styles from "./MapContainerStyles";
import SearchBox from "../SearchBox";
import SearchResults from "../SearchResults";

export const MapContainer = ({
  region,
  getInputData,
  toggleSearchResultModel,
  getAddressPrediction,
  resultTypes,
  predictions
}) => {
  return (
    <View style={styles.map}>
      <MapView
        provider={MapView.PROVIDER_GOOGLE}
        style={styles.map}
        region={region}
      >
        <MapView.Marker coordinate={region} pinColor="green" />
      </MapView>
      <SearchBox
        getInputData={getInputData}
        toggleSearchResultModel={toggleSearchResultModel}
        getAddressPrediction={getAddressPrediction}
      />
      {(resultTypes.pickUp || resultTypes.dropOff) && (
        <SearchResults predictions={predictions} />
      )}
    </View>
  );
};
export default MapContainer;
