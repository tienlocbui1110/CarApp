import update from "react-addons-update";
import constants from "./actionConstants";
import { Dimensions } from "react-native";
import RNGooglePlace from "react-native-google-places";
// Constants
const {
  GET_CURRENT_LOCATION,
  GET_INPUT,
  TOGGLE_SEARCH_RESULT,
  GET_ADDRESS_PREDICTION
} = constants;
const { width, height } = Dimensions.get("window");
const ASPECT_RATION = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = ASPECT_RATION * LATITUDE_DELTA;

// Action

export function getCurrentLocation() {
  return dispatch => {
    navigator.geolocation.getCurrentPosition(
      position => {
        dispatch({
          type: GET_CURRENT_LOCATION,
          payload: position
        });
      },
      error => console.debug(error.message),
      { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 }
    );
  };
}

export function getInputData(payload) {
  return {
    type: GET_INPUT,
    payload
  };
}

// search result model

export function toggleSearchResultModel(payload) {
  getAddressPrediction();
  return {
    type: TOGGLE_SEARCH_RESULT,
    payload
  };
}

// get prediction of google place
export function getAddressPrediction() {
  return (dispatch, store) => {
    let userInput = store().home.resultTypes.pickUp
      ? store().home.inputData.pickUp
      : store().home.inputData.dropOff;
    RNGooglePlace.getAutocompletePredictions(userInput, {
      country: "VN"
    })
      .then(results => {
        dispatch({
          type: GET_ADDRESS_PREDICTION,
          payload: results
        });
      })
      .catch(err => {
        console.log(err.message);
      });
  };
}
// Action handler

function handleGetCurrentLocation(state, action) {
  return update(state, {
    region: {
      latitude: {
        $set: action.payload.coords.latitude
      },
      longitude: {
        $set: action.payload.coords.longitude
      },
      latitudeDelta: {
        $set: LATITUDE_DELTA
      },
      longitudeDelta: {
        $set: LONGITUDE_DELTA
      }
    }
  });
}

function handleGetInputData(state, action) {
  const { key, value } = action.payload;
  return update(state, {
    inputData: {
      [key]: {
        $set: value
      }
    }
  });
}

function handleToggleSearchResult(state, action) {
  if (action.payload === "pickUp") {
    return update(state, {
      resultTypes: {
        pickUp: {
          $set: true
        },
        dropOff: {
          $set: false
        }
      },
      predictions: {
        $set: []
      }
    });
  }
  if (action.payload === "dropOff") {
    return update(state, {
      resultTypes: {
        pickUp: {
          $set: false
        },
        dropOff: {
          $set: true
        }
      },
      predictions: {
        $set: []
      }
    });
  }
}

function handleGetAddressPrediction(state, action) {
  return update(state, {
    predictions: {
      $set: action.payload
    }
  });
}

const ACTION_HANDLERS = {
  GET_CURRENT_LOCATION: handleGetCurrentLocation,
  GET_INPUT: handleGetInputData,
  TOGGLE_SEARCH_RESULT: handleToggleSearchResult,
  GET_ADDRESS_PREDICTION: handleGetAddressPrediction
};
const initialState = {
  region: {},
  inputData: {},
  resultTypes: {}
};

export function HomeReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
