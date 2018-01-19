import React from "react";
import { Text } from "react-native";
import { View, InputGroup, Input } from "native-base";

import Icon from "../../../../../node_modules/react-native-vector-icons/dist/FontAwesome";
import style from "./SearchBoxStyle";

export const SearchBox = () => {
  return (
    <View style={style.searchBox}>
      <View style={style.inputWrapper}>
        <Text style={style.label}>START LOCATION</Text>
        <InputGroup>
          <Icon name="search" size={15} color="#4ad1d6" />
          <Input style={style.inputSearch} placeholder="Chon diem bat dau" />
        </InputGroup>
      </View>
      <View style={style.secondInputWrapper}>
        <Text style={style.label}>DESTINATION LOCATION</Text>
        <InputGroup>
          <Icon name="search" size={15} color="#4ad1d6" />
          <Input style={style.inputSearch} placeholder="Chon diem den" />
        </InputGroup>
      </View>
    </View>
  );
};

export default SearchBox;
