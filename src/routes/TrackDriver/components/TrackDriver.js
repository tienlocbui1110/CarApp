import React from "react";
import { View, Text } from "react-native";
import { Container } from "native-base";
import HeaderComponent from "../../../components/HeaderComponent";
import MapTrack from "./MapTrack";
import DriverFound from "./DriverFound";
import DriverFooterProfile from "./DriverFooterProfile";
import DriverOnTheWayFooter from "./DriverOnTheWayFooter";
const carMarker = require("../../../assets/img/car_icon.png");

class TrackDriver extends React.Component {
  componentDidMount() {
    this.props.getCurrentLocation();
    this.props.getDriverInfo();
  }
  componentWillReceiveProps(nextProps) {
    if (
      this.props.driverLocation &&
      nextProps.driverLocation !== this.props.driverLocation
    ) {
      this.props.getDistanceFromDriver();
    }
  }

  render() {
    return (
      <Container>
        <View style={{ flex: 1 }}>
          <HeaderComponent />
          {this.props.region && (
            <MapTrack
              region={this.props.region}
              selectedAddress={this.props.selectedAddress}
              driverLocation={this.props.driverLocation}
              showCarMarker={this.props.showCarMarker}
              selectedAddress={this.props.selectedAddress}
              carMarker={carMarker}
            />
          )}
          {this.props.distanceFromDriver.rows && (
            <DriverOnTheWayFooter
              driverInfo={this.props.driverInfo}
              distanceFromDriver={this.props.distanceFromDriver}
            />
          )}

          <DriverFooterProfile driverInfo={this.props.driverInfo} />
          {this.props.showDriverFound && (
            <DriverFound
              driverInfo={this.props.driverInfo}
              getDriverLocation={this.props.getDriverLocation}
            />
          )}
        </View>
      </Container>
    );
  }
}

export default TrackDriver;
