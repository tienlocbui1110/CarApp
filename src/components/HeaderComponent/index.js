import React from "react";
import { Text, Image, StatusBar } from "react-native";
import { Header, Left, Body, Right, Button } from "native-base";
import Icon from "../../../node_modules/react-native-vector-icons/dist/FontAwesome";
import style from "./HeaderStyle";
export const HeaderComponent = ({ logo }) => {
  return (
    <Header style={{ backgroundColor: "#4ad1d6" }}>
      <Left>
        <StatusBar barStyle="light-content" />
        <Button transparent>
          <Icon name="bars" style={style.icon} />
        </Button>
      </Left>
      <Body>
        {(logo && (
          <Image resizeMode="contain" style={style.logo} source={logo} />
        )) || <Text style={style.headerText}>Driver on the way</Text>}
      </Body>
      <Right> 
        <Button transparent>
          <Icon name="gift" style={style.icon} />
        </Button>
      </Right>
    </Header>
  );
};

export default HeaderComponent;
