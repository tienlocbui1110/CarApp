import update from "react-addons-update";
import constants from "./actionConstants";
import { Dimensions } from "react-native";
import RNGooglePlace from "react-native-google-places";
import request from "../../../util/request";
import caculateFare from "../../../util/fareCaculator";

// Constants
const {
  GET_CURRENT_LOCATION,
  GET_INPUT,
  TOGGLE_SEARCH_RESULT,
  GET_ADDRESS_PREDICTION,
  GET_SELECTED_ADDRESS,
  GET_DISTANCE_MATRIX,
  GET_FARE,
  BOOK_CAR,
  GET_NEARBY_DRIVERS
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

// get selected address
export function getSelectedAddress(placeID) {
  const dummyNumbers = {
    baseFare: 5000,
    timeRate: 1000,
    distanceRate: 8000,
    surge: 1
  };
  return (dispatch, store) => {
    RNGooglePlace.lookUpPlaceByID(placeID)
      .then(results => {
        dispatch({
          type: GET_SELECTED_ADDRESS,
          payload: results
        });
      })
      .then(() => {
        // Get the distance and time
        if (
          store().home.selectedAddress.selectedPickUp &&
          store().home.selectedAddress.selectedDropOff
        ) {
          request
            .get("https://maps.googleapis.com/maps/api/distancematrix/json")
            .query({
              origins:
                store().home.selectedAddress.selectedPickUp.latitude +
                "," +
                store().home.selectedAddress.selectedPickUp.longitude,
              destinations:
                store().home.selectedAddress.selectedDropOff.latitude +
                "," +
                store().home.selectedAddress.selectedDropOff.longitude,
              mode: "driving",
              key: "AIzaSyAPthBOs3jMkc19uh3oPG-EUIFmWDg6Fds"
            })
            .finish((err, res) => {
              dispatch({
                type: GET_DISTANCE_MATRIX,
                payload: res.body
              });
            });
          setTimeout(() => {
            if (
              store().home.selectedAddress.selectedPickUp &&
              store().home.selectedAddress.selectedDropOff
            ) {
              const fare = caculateFare(
                dummyNumbers.baseFare,
                dummyNumbers.timeRate,
                store().home.distanceMatrix.rows[0].elements[0].duration.value,
                dummyNumbers.distanceRate,
                store().home.distanceMatrix.rows[0].elements[0].distance.value,
                dummyNumbers.surge
              );
              dispatch({
                type: GET_FARE,
                payload: fare
              });
            }
          }, 1000);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
}

// Book Car

export function bookCar() {
  return (dispatch, store) => {
    const nearbyDrivers = store().home.nearbyDrivers;
    const nearbyDriver =
      nearbyDrivers[Math.floor(Math.random() * nearbyDrivers.length)];
    const payload = {
      data: {
        userName: "loc",
        pickUp: {
          address: store().home.selectedAddress.selectedPickUp.address,
          name: store().home.selectedAddress.selectedPickUp.name,
          latitude: store().home.selectedAddress.selectedPickUp.latitude,
          longitude: store().home.selectedAddress.selectedPickUp.longitude
        },
        dropOff: {
          address: store().home.selectedAddress.selectedDropOff.address,
          name: store().home.selectedAddress.selectedDropOff.name,
          latitude: store().home.selectedAddress.selectedDropOff.latitude,
          longitude: store().home.selectedAddress.selectedDropOff.longitude
        },
        fare: store().home.fare,
        status: "pending",
        nearbyDriver: {
          socketId: nearbyDriver.socketId,
          driverId: nearbyDriver.driverId,
          latitude: nearbyDriver.coordinate.coordinates[1],
          longitude: nearbyDriver.coordinate.coordinates[0]
        }
      }
    };
    console.debug(payload);
    request
      .post("http://192.168.1.101:3000/api/bookings")
      .send(payload)
      .finish((err, res) => {
        if (err) {
          console.log(err);
        } else {
          dispatch({
            type: BOOK_CAR,
            payload: res.body
          });
        }
      });
  };
}
// get nearby driver
export function getNearbyDrivers() {
  return (dispatch, store) => {
    request
      .get("http://192.168.1.101:3000/api/driverLocation")
      .query({
        latitude: store().home.region.latitude,
        longitude: store().home.region.longitude
      })
      .finish((err, res) => {
        if (err) console.debug(err);
        else
          dispatch({
            type: GET_NEARBY_DRIVERS,
            payload: res.body
          });
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

function handleGetSelectedAddress(state, action) {
  let selectedTitle = state.resultTypes.pickUp
    ? "selectedPickUp"
    : "selectedDropOff";
  return update(state, {
    selectedAddress: {
      [selectedTitle]: {
        $set: action.payload
      }
    },
    resultTypes: {
      pickUp: {
        $set: false
      },
      dropOff: {
        $set: false
      }
    }
  });
}

function handleGetDistanceMatrix(state, action) {
  return update(state, {
    distanceMatrix: {
      $set: action.payload
    }
  });
}

function handleGetFare(state, action) {
  return update(state, {
    fare: {
      $set: action.payload
    }
  });
}

function handleBookCar(state, action) {
  return update(state, {
    booking: {
      $set: action.payload
    }
  });
}

function handleGetNearbyDrivers(state, action) {
  return update(state, {
    nearbyDrivers: {
      $set: action.payload
    }
  });
}

function handleConfirmBooking(state, action) {
  console.debug(action.payload);
  return update(state, {
    booking: {
      $set: action.payload
    }
  });
}

const ACTION_HANDLERS = {
  GET_CURRENT_LOCATION: handleGetCurrentLocation,
  GET_INPUT: handleGetInputData,
  TOGGLE_SEARCH_RESULT: handleToggleSearchResult,
  GET_ADDRESS_PREDICTION: handleGetAddressPrediction,
  GET_SELECTED_ADDRESS: handleGetSelectedAddress,
  GET_DISTANCE_MATRIX: handleGetDistanceMatrix,
  GET_FARE: handleGetFare,
  BOOK_CAR: handleBookCar,
  GET_NEARBY_DRIVERS: handleGetNearbyDrivers,
  BOOKING_CONFIRMED: handleConfirmBooking
};
const initialState = {
  region: {},
  inputData: {},
  resultTypes: {},
  selectedAddress: {}
};

export function HomeReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
