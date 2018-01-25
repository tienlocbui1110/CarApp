import React from "react";
import { Text } from "react-native";
import { View, Button } from "native-base";

import style from "./FabStyle";

export const Fab = ({ onPressAction }) => {
  return (
    <Button style={style.fabContainer} onPress={onPressAction}>
      <Text style={style.btnText}>Book</Text>
    </Button>
  );
};

export default Fab;
