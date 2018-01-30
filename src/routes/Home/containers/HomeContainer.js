import { connect } from "react-redux";
import Home from "../components/Home";
import {} from "../modules/home";
import {
  getCurrentLocation,
  getInputData,
  toggleSearchResultModel,
  getAddressPrediction,
  getSelectedAddress,
  bookCar,
  getNearbyDrivers
} from "../modules/home";
const mapStateToProps = state => ({
  region: state.home.region,
  inputData: state.home.inputData || {},
  resultTypes: state.home.resultTypes || {},
  predictions: state.home.predictions || [],
  selectedAddress: state.home.selectedAddress || {},
  fare: state.home.fare,
  booking: state.home.booking || {},
  nearbyDrivers: state.home.nearbyDrivers || []
});

const mapActionCreators = {
  getCurrentLocation,
  getInputData,
  toggleSearchResultModel,
  getAddressPrediction,
  getSelectedAddress,
  bookCar,
  getNearbyDrivers
};
export default connect(mapStateToProps, mapActionCreators)(Home);
