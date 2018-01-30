import React from "react";
import { View, Text } from "react-native";
import { Container, Content } from "native-base";
import MapContainer from "./MapContainer";
import HeaderComponent from "../../../components/HeaderComponent";
import FooterComponent from "../../../components/FooterComponent";
import { Actions } from "react-native-router-flux";

import Fare from "./Fare";
import Fab from "./Fab";
import FindDriver from "./FindDriver";
const logoTaxi = require("../../../assets/img/taxi.png");
const carIcon = require("../../../assets/img/car_icon.png");

class Home extends React.Component {
  componentDidMount() {
    var rx = this;
    this.props.getCurrentLocation();
    setTimeout(function() {
      rx.props.getNearbyDrivers();
    }, 5000);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.booking.status === "confirmed") {
      Actions.trackDriver({ type: "reset" });
    }
  }

  render() {
    const { status } = this.props.booking;
    return (
      <Container keyboardShouldPersistTaps={true} keyboardDismissMode="on-drag">
        {(status !== "pending" && (
          <View style={{ flex: 1 }}>
            <HeaderComponent logo={logoTaxi} />
            <Content />
            {this.props.region.latitude && (
              <MapContainer
                keyboardShouldPersistTaps={true}
                region={this.props.region}
                getInputData={this.props.getInputData}
                toggleSearchResultModel={this.props.toggleSearchResultModel}
                getAddressPrediction={this.props.getAddressPrediction}
                resultTypes={this.props.resultTypes}
                predictions={this.props.predictions}
                getSelectedAddress={this.props.getSelectedAddress}
                selectedAddress={this.props.selectedAddress}
                nearbyDrivers={this.props.nearbyDrivers}
                carIcon={carIcon}
              />
            )}
            <Fab onPressAction={this.props.bookCar} />
            {this.props.fare && <Fare fare={this.props.fare} />}
            <FooterComponent />
          </View>
        )) || <FindDriver selectedAddress={this.props.selectedAddress} />}
      </Container>
    );
  }
}

export default Home;
