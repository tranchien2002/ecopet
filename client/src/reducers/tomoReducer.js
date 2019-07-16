import * as actions from '../actions';

const initialState = {
  web3: null,
  account: null,
  balance: 0
};

const tomoReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.WEB3_CONNECT:
      return {
        ...state,
        web3: action.web3,
        account: action.account
      };
    default:
      return state;
  }
};

export default tomoReducer;
