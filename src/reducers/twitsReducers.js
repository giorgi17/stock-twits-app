import { SET_TWITS_DATA, ADD_TWITS_SYMBOL, UPDATE_TWITS_SYMBOL_INPUT,
  GET_TWITS_USER_SYMBOLS, UPDATE_TWITS_SYMBOL_NOT_FOUND, DELETE_TWITS_SYMBOL } from "../actions/types";

const initialState = {
    data: [],
    addNewSymbolInput: '',
    addNewSymbolInputError: '',
    twitsCount: 0,
    symbols: {

    }
};

export default function(state = initialState, action) {
  switch (action.type) {

    case DELETE_TWITS_SYMBOL:
      const symbolsCopy = {...state.symbols};
      if (symbolsCopy.hasOwnProperty(action.payload.symbol)){
        delete symbolsCopy[action.payload.symbol];
        return {
          ...state,
            symbols: {...symbolsCopy}
        };
      }
      break;

    case UPDATE_TWITS_SYMBOL_NOT_FOUND:
      return {
          ...state,
          twitsCount: 0,
            data: []
      };

    case GET_TWITS_USER_SYMBOLS:
      const symbol_obj = {};
      action.payload.forEach(element => {
        symbol_obj[element.toUpperCase()] = 0;
      });
      return {
          ...state,
            symbols: {...symbol_obj}
      };

    case SET_TWITS_DATA:
      return {
          ...state,
            data: action.payload.messages,
            twitsCount: action.payload.messages.length,
            symbols: {
              ...state.symbols,
              [action.payload.symbol.symbol]: action.payload.messages.length
            }
      };

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