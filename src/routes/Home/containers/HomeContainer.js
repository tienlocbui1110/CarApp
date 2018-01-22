import { connect } from "react-redux";
import Home from "../components/Home";
import {} from "../modules/home";
import {
  getCurrentLocation,
  getInputData,
  toggleSearchResultModel,
  getAddressPrediction
} from "../modules/home";
const mapStateToProps = state => ({
  region: state.home.region,
  inputData: state.home.inputData || {},
  resultTypes: state.home.resultTypes || {},
  predictions: state.home.predictions || []
});

const mapActionCreators = {
  getCurrentLocation,
  getInputData,
  toggleSearchResultModel,
  getAddressPrediction
};
export default connect(mapStateToProps, mapActionCreators)(Home);
