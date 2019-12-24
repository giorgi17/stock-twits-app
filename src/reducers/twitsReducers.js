import { SET_TWITS_DATA, ADD_TWITS_SYMBOL, UPDATE_TWITS_SYMBOL_INPUT,
  GET_TWITS_USER_SYMBOLS, UPDATE_TWITS_SYMBOL_NOT_FOUND } from "../actions/types";

const initialState = {
    data: [],
    addNewSymbolInput: '',
    addNewSymbolInputError: '',
    symbols: {

    }
};

export default function(state = initialState, action) {
  switch (action.type) {

    case UPDATE_TWITS_SYMBOL_NOT_FOUND:
      return {
          ...state,
            data: [],
      };
      break;

    case GET_TWITS_USER_SYMBOLS:
      const symbol_obj = {};
      action.payload.forEach(element => {
        symbol_obj[element.toUpperCase()] = 0;
      });
      return {
          ...state,
            symbols: {
              ... symbol_obj
            }
      };
      break;

    case SET_TWITS_DATA:
      return {
          ...state,
            data: action.payload.messages,
            symbols: {
              ...state.symbols,
              [action.payload.symbol.symbol]: action.payload.messages.length
            }
      };
      break;

    case ADD_TWITS_SYMBOL:
      return {
            ...state,
            addNewSymbolInput: '',
            addNewSymbolInputError: '',
            symbols: {
              ...state.symbols,
              [action.payload]: 0
            }
      };
      break;

      case UPDATE_TWITS_SYMBOL_INPUT:
        return {
            ...state,
            addNewSymbolInput: action.payload.str,
            addNewSymbolInputError: action.payload.error
        };

    default:
      return state;
  }
}