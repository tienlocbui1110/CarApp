import React from "react";
import { Text, Image } from "react-native";
import { View, Button } from "native-base";
import StarRating from "react-native-star-rating";
import Icon from "../../../../../node_modules/react-native-vector-icons/dist/FontAwesome";

import style from "./DriverFooterProfileStyle";

export const DriverFooterProfile = ({ driverInfo, getDriverLocation }) => {
  const { profilePic, rating } = driverInfo || "";
  return (
    <View style={style.footerContainer}>
      <View>
        <Image
          resizemode="contain"
          style={style.driverPic}
          source={{ uri: profilePic }}
        />
      </View>
      <View style={style.ratingContainer}>
        <StarRating
          starSize={20}
          disabled={true}
          maxStars={5}
          rating={rating}
          starColor="#FF5E3A"
        />
      </View>
      <View style={style.iconContainer} />
      <View style={style.iconContainer}>
        <Icon name="phone" size={30} style={style.icon} />
      </View>
      <View style={style.iconContainer}>
        <Icon name="comment-o" size={30} style={style.icon} />
      </View>
    </View>
  );
};

export default DriverFooterProfile;
