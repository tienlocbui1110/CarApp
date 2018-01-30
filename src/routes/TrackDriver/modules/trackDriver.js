import update from "react-addons-update";
import constants from "./actionConstants";
import { Dimensions } from "react-native";
import request from "../../../util/request";

// Constants
const {
  GET_CURRENT_LOCATION,
  GET_DRIVER_INFORMATION,
  GET_DRIVER_LOCATION,
  GET_DISTANCE_FROM_DRIVER,
  UPDATE_DRIVER_LOCATION
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

// get Driver info

export function getDriverInfo() {
  return (dispatch, store) => {
    let id = store().home.booking.driverId;
    request
      .get("http://192.168.1.101:3000/api/driver/" + id)
      .finish((err, res) => {
        console.debug(res.body);
        if (!err)
          dispatch({
            type: GET_DRIVER_INFORMATION,
            payload: res.body
          });
        else console.debug(err);
      });
  };
}

// get driver location
export function getDriverLocation() {
  return (dispatch, store) => {
    let id = store().home.booking.driverId;
    request
      .get("http://192.168.1.101:3000/api/driverLocation/" + id)
      .finish((err, res) => {
        if (!err)
          dispatch({
            type: GET_DRIVER_LOCATION,
            payload: res.body
          });
        else console.debug(err);
      });
  };
}

//get distance from driver
export function getDistanceFromDriver() {
  return (dispatch, store) => {
    if (store().trackDriver.driverLocation) {
      request
        .get("https://maps.googleapis.com/maps/api/distancematrix/json")
        .query({
          origins:
            store().home.selectedAddress.selectedPickUp.latitude +
            "," +
            store().home.selectedAddress.selectedPickUp.longitude,
          destinations:
            store().trackDriver.driverLocation.coordinate.coordinates[1] +
            "," +
            store().trackDriver.driverLocation.coordinate.coordinates[0],
          mode: "driving",
          key: "AIzaSyAPthBOs3jMkc19uh3oPG-EUIFmWDg6Fds"
        })
        .finish((err, res) => {
          dispatch({
            type: GET_DISTANCE_FROM_DRIVER,
            payload: res.body
          });
        });
    }
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

function handleGetDriverInfomation(state, action) {
  return update(state, {
    driverInfo: {
      $set: action.payload
    }
  });
}

function handleUpdateDriverLocation(state, action) {
  return update(state, {
    driverLocation: {
      $set: action.payload
    }
  });
}

function handleGetDriverLocation(state, action) {
  return update(state, {
    driverLocation: {
      $set: action.payload
    },
    showDriverFound: {
      $set: false
    },
    showCarMarker: {
      $set: true
    }
  });
}

function handleGetDistanceFromDriver(state, action) {
  return update(state, {
    distanceFromDriver: {
      $set: action.payload
    }
  });
}

const ACTION_HANDLERS = {
  GET_CURRENT_LOCATION: handleGetCurrentLocation,
  GET_DRIVER_INFORMATION: handleGetDriverInfomation,
  UPDATE_DRIVER_LOCATION: handleUpdateDriverLocation,
  GET_DISTANCE_FROM_DRIVER: handleGetDistanceFromDriver,
  GET_DRIVER_LOCATION: handleGetDriverLocation
};
const initialState = {
  region: {},
  showDriverFound: true
};

export function TrackDriverReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
