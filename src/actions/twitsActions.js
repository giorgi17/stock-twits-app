import axios from "axios";
import { SET_TWITS_DATA, ADD_TWITS_SYMBOL, UPDATE_TWITS_SYMBOL_INPUT,
  GET_TWITS_USER_SYMBOLS, UPDATE_TWITS_SYMBOL_NOT_FOUND, 
  DELETE_TWITS_SYMBOL, GET_ERRORS } from "./types";


// DELETING CHOSEN SYMBOL
export const twitsDeleteSymbol = (symbol, id, stock, loading) => dispatch => {
  // const api_url = "http://localhost:8888/api/users/delete-symbol";
  const api_url = "https://stock-twits-backend.herokuapp.com/api/users/delete-symbol";

  try {
    loading();
    axios
      // .post("/users/add-symbol", {'symbol': symbol, 'id': id})
      .post(api_url, {'symbol': symbol, 'id': id, 'stock': stock})
      .then(res => {
        dispatch({
          type: DELETE_TWITS_SYMBOL,
          payload: {symbol: symbol.toUpperCase()}
        });
        loading();
      }) 
      .catch(err => {
        dispatch({
          type: GET_ERRORS,
          payload: err
        });
        loading();
      });
    } catch (e) {
      console.log("Error is - " + e.message);
    }
};

// POPULATING SYMBOLS PROPERTY WITH USER SYMBOLS
export const twitsGetUserSymbols = (id, stock, loading) => dispatch => {
  try {
    loading();
    axios
      // .post("http://localhost:8888/api/users/get-symbols", {'id': id, 'stock': stock})
      .post("https://stock-twits-backend.herokuapp.com/api/users/get-symbols", {'id': id, 'stock': stock})
      .then(res => {
        dispatch({
          type: GET_TWITS_USER_SYMBOLS,
          payload: res.data[0].symbols
        });
        loading();
      }) 
      .catch(err => {
        dispatch({
          type: GET_ERRORS,
          payload: err.message
        });
        loading();
      });
    } catch (e) {
      console.log("Error is - " + e.message);
    }

};

// GETTING DATA FOR A CERTAIN SYMBOL
export const twitsGetData = (symbol, loading) => dispatch => {
  // const api_url = "http://localhost:8888/api/users/get-twits-data";
  const api_url = "https://stock-twits-backend.herokuapp.com/api/users/get-twits-data";

  loading();
  axios
    .post(api_url, {'symbol': symbol.target.value})
    .then(res => {
        // console.log("SECOND - " + res.symbol.symbol);
        dispatch({
            type: SET_TWITS_DATA,
            payload: res.data
        });
        loading();
    }) 
    .catch(err => {
      dispatch({
        type: UPDATE_TWITS_SYMBOL_NOT_FOUND,
        payload: "Symbol not found"
      });
      loading();

      // dispatch({
      //   type: GET_ERRORS,
      //   payload: err.response
      // });
    }
    ); 
};

// ADDING NEW SYMBOL
export const twitsAddSymbol = (symbol, id, stock, loading) => dispatch => {
  // const api_url = "http://localhost:8888/api/users/add-symbol";
  const api_url = "https://stock-twits-backend.herokuapp.com/api/users/add-symbol";

  try {
    loading();
    axios
      .post(api_url, {'symbol': symbol, 'id': id, 'stock': stock})
      .then(res => {
        dispatch({
          type: ADD_TWITS_SYMBOL,
          payload: symbol.toUpperCase()
        });
        loading();
      }) 
      .catch(err => {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        });
        loading();
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
      error: (!symbol.target.value) ? "input is empty!" : ''
    }
  });
};