import React from "react";
import { Text } from "react-native";
import { View, InputGroup, Input } from "native-base";

// import Icon from "react-native-vector-icons/FontAwesome";
import style from "./SearchBoxStyle";

export const SearchBox = () => {
  return (
    <View style={style.searchBox}>
      <Text style={style.label}>PICK asass</Text>
      <InputGroup>
        <Input style={style.inputSearch} placeholder="Chon diem bat dau" />
      </InputGroup>
    </View>
  );
};

export default SearchBox;
