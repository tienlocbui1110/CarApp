import React from "react";
import { View, Text } from "react-native";
import { Container, Content } from "native-base";
import MapContainer from "./MapContainer";
import HeaderComponent from "../../../components/HeaderComponent";
import FooterComponent from "../../../components/FooterComponent";

const logoTaxi = require("../../../assets/img/taxi.png");

class Home extends React.Component {
  componentDidMount() {
    this.props.getCurrentLocation();
  }
  render() {
    var region = {
      latitude: 10.823099,
      longitude: 106.629664,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
    };
    return (
      <Container>
        <HeaderComponent logo={logoTaxi} />
        <Content />
        {this.props.region.latitude && (
          <MapContainer
            region={this.props.region}
            getInputData={this.props.getInputData}
            toggleSearchResultModel={this.props.toggleSearchResultModel}
            getAddressPrediction={this.props.getAddressPrediction}
            resultTypes={this.props.resultTypes}
            predictions={this.props.predictions}
          />
        )}
        <FooterComponent />
      </Container>
    );
  }
}

export default Home;
