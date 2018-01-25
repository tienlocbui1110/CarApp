import React from "react";
import { Text } from "react-native";
import { View, List, ListItem, Left, Body } from "native-base";

import Icon from "../../../../../node_modules/react-native-vector-icons/dist/MaterialIcons";
import style from "./SearchResultsStyle";

export const SearchResults = ({ predictions, getSelectedAddress }) => {
  function handleSelectedAddress(placeID) {
    getSelectedAddress(placeID);
  }
  return (
    <View style={style.searchResultsWrapper}>
      <List
        dataArray={predictions}
        renderRow={item => (
          <ListItem
            onPress={() => {
              handleSelectedAddress(item.placeID);
            }}
            button
            avatar
          >
            <Left style={style.leftContainer}>
              <Icon style={style.leftIcon} name="location-on" />
            </Left>
            <Body>
              <Text style={style.primaryText}>{item.primaryText}</Text>
              <Text style={style.secondaryText}>{item.secondaryText}</Text>
            </Body>
          </ListItem>
        )}
      />
    </View>
  );
};

export default SearchResults;
