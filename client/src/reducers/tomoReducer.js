import * as actions from '../actions';

const initialState = {
  web3: null,
  account: null,
  balance: 0,
  pets: null,
  newPet: null,
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
    case actions.CREATE_NEW_PET:
      return {
        ...state,
        newPet: action.newPet
      };
    default:
      return state;
  }
};

export default tomoReducer;
