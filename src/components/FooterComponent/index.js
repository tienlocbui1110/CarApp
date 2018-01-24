import React from "react";
import { Text } from "react-native";
import { FooterTab, Button, Footer } from "native-base";
import Icon from "../../../node_modules/react-native-vector-icons/dist/FontAwesome";
import style from "./FooterStyle";

export const FooterComponent = ({ logo }) => {
  // tab bar items
  const tabs = [
    {
      title: "TaxiCar",
      subTitle: "",
      icon: "car"
    },
    {
      title: "TaxiShare",
      subTitle: "",
      icon: "car"
    },
    {
      title: "Premium",
      subTitle: "",
      icon: "car"
    },
    {
      title: "Bike",
      subTitle: "",
      icon: "car"
    }
  ];
  return (
    <Footer>
      <FooterTab style={style.footerContainer}>
        {tabs.map((obj, index) => {
          return (
            <Button key={index}>
              <Icon
                size={20}
                name={obj.icon}
                color={index === 0 ? "#4ad1d6" : "#eee"}
              />
              <Text
                style={{
                  fontSize: 12,
                  color: index === 0 ? "#4ad1d6" : "#eee"
                }}
              >
                {obj.title}
              </Text>
              <Text style={style.subText}>{obj.subTitle}</Text>
            </Button>
          );
        })}
      </FooterTab>
    </Footer>
  );
};

export default FooterComponent;
