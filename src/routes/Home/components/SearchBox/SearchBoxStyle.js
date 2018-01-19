import { Dimensions } from "react-native";
var width = Dimensions.get("window").width; //full width
const styles = {
  searchBox: {
    top: 0,
    position: "absolute",
    width: width
  },
  inputWrapper: {
    marginLeft: 25,
    marginRight: 25,
    marginTop: 10,
    marginBottom: 0,
    backgroundColor: "#fff",
    opacity: 0.8,
    borderRadius: 10
  },
  secondInputWrapper: {
    marginLeft: 25,
    marginRight: 25,
    marginTop: 0,
    backgroundColor: "#fff",
    opacity: 0.8,
    borderRadius: 10
  },
  inputSearch: {
    fontSize: 14
  },
  label: {
    fontSize: 10,
    fontStyle: "italic",
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 0
  }
};

export default styles;
