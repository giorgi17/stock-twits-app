import axios from "axios";
import { SET_TWITS_DATA, ADD_TWITS_SYMBOL, UPDATE_TWITS_SYMBOL_INPUT,
  GET_TWITS_USER_SYMBOLS, UPDATE_TWITS_SYMBOL_NOT_FOUND, GET_ERRORS } from "./types";

// POPULATING SYMBOLS PROPERTY WITH USER SYMBOLS
export const twitsGetUserSymbols = (id, stock) => dispatch => {
  try {
    axios
      // .post("http://localhost:8888/api/users/get-symbols", {'id': id})
      .post("https://stock-twits-backend.herokuapp.com/api/users/get-symbols", {'id': id, 'stock': stock})
      .then(res => {
        console.log("jandaba - " + JSON.stringify(res.data[0].symbols));
        dispatch({
          type: GET_TWITS_USER_SYMBOLS,
          payload: res.data[0].symbols
        });
      }) 
      .catch(err => {
        console.log("Error is - " + err.message);
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      });
    } catch (e) {
      console.log("Error is - " + e.message);
    }

};

// GETTING DATA FOR A CERTAIN SYMBOL
export const twitsGetData = symbol => dispatch => {
  // const api_url = "http://localhost:8888/api/users/get-twits-data";
  const api_url = "https://stock-twits-backend.herokuapp.com/api/users/get-twits-data";

  axios
    .post(api_url, {'symbol': symbol.target.value})
    .then(res => {
        // console.log("SECOND - " + res.symbol.symbol);
        dispatch({
            type: SET_TWITS_DATA,
            payload: res.data
        })
    }) 
    .catch(err => {
      console.log("SECOND ERROR- " + err.message);
      dispatch({
        type: UPDATE_TWITS_SYMBOL_NOT_FOUND,
        payload: "Symbol not found"
      });

      // dispatch({
      //   type: GET_ERRORS,
      //   payload: err.response
      // });
    }
    ); 
};

// ADDING NEW SYMBOL
export const twitsAddSymbol = (symbol, id) => dispatch => {
  // Axios instance 
  const instance = axios.create({
    baseURL: '/api'
  });

  // instance.defaults.headers.common['Authorization'] = '';
  console.log("CALLED!");
  try {
    instance
      // .post("/users/add-symbol", {'symbol': symbol, 'id': id})
      .post("https://stock-twits-backend.herokuapp.com/users/add-symbol", {'symbol': symbol, 'id': id})
      .then(res => {
        console.log("Done!");
        dispatch({
          type: ADD_TWITS_SYMBOL,
          payload: symbol.toUpperCase()
        });
      }) 
      .catch(err => {
        console.log("Error is - " + err.message);
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      });
    } catch (e) {
      console.log("Error is - " + e.message);
    }
};

// UPDATING USER INPUT FOR SYMBOL AS USER TYPES
export const updateNewSymbolInput = symbol => dispatch => {
  dispatch({
    type: UPDATE_TWITS_SYMBOL_INPUT,
    payload: {
      str: symbol.target.value,
      error: (symbol.target.value == 0) ? "input is empty!" : ''
    }
  });
};