import React from "react";
import { Text } from "react-native";
import { View, List, ListItem, Left, Body } from "native-base";

import Icon from "../../../../../node_modules/react-native-vector-icons/dist/MaterialIcons";
import style from "./SearchResultsStyle";

export const SearchResults = predictions => {
  console.debug(predictions.predictions);
  return (
    <View style={style.searchResultsWrapper}>
      <List
        dataArray={predictions.predictions}
        renderRow={item => (
          <ListItem button avatar>
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
