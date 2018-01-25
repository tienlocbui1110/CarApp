import React from "react";
import { Text } from "react-native";
import { View, InputGroup, Input } from "native-base";

import Icon from "../../../../../node_modules/react-native-vector-icons/dist/FontAwesome";
import style from "./SearchBoxStyle";

export const SearchBox = ({
  getInputData,
  toggleSearchResultModel,
  getAddressPrediction,
  selectedAddress
}) => {
  const { selectedPickUp, selectedDropOff } = selectedAddress || {};
  function handleInput(key, val) {
    getInputData({
      key,
      value: val
    });
    getAddressPrediction();
  }
  return (
    <View style={style.searchBox}>
      <View style={style.inputWrapper}>
        <Text style={style.label}>START LOCATION</Text>
        <InputGroup>
          <Icon name="search" size={15} color="#4ad1d6" />
          <Input
            style={style.inputSearch}
            placeholder="Chon diem bat dau"
            onChangeText={handleInput.bind(this, "pickUp")}
            value={selectedPickUp && selectedPickUp.name}
            onFocus={() => toggleSearchResultModel("pickUp")}
          />
        </InputGroup>
      </View>
      <View style={style.secondInputWrapper}>
        <Text style={style.label}>DESTINATION LOCATION</Text>
        <InputGroup>
          <Icon name="search" size={15} color="#4ad1d6" />
          <Input
            style={style.inputSearch}
            placeholder="Chon diem den"
            onChangeText={handleInput.bind(this, "dropOff")}
            value={selectedDropOff && selectedDropOff.name}
            onFocus={() => toggleSearchResultModel("dropOff")}
          />
        </InputGroup>
      </View>
    </View>
  );
};

export default SearchBox;
