import * as actions from '../actions';

const initialState = {
  web3: null,
  account: null,
  balance: 0,
  pets: null,
  factory: null
};

const tomoReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.WEB3_CONNECT:
      return {
        ...state,
        web3: action.web3,
        account: action.account
      };
    case actions.INSTANTIATE_CONTRACT:
      return {
        ...state,
        factory: action.factory
      };
    case actions.GET_ALL_PETS:
      return {
        ...state,
        pets: action.pets
      };
    default:
      return state;
  }
};

export default tomoReducer;
