import getWeb3 from '../utils/getWeb3';
import Factory from 'contracts/PetWalletFactory.json';
import petWallet from 'contracts/PetWallet.json';

export const WEB3_CONNECT = 'WEB3_CONNECT';
export const web3Connect = () => async (dispatch) => {
  const web3 = await getWeb3();
  const accounts = await web3.eth.getAccounts();
  if (accounts.length > 0) {
    const account = accounts[0];
    dispatch({
      type: WEB3_CONNECT,
      web3,
      account
    });
  } else {
    console.log('Account not found');
  }
  dispatch(instantiateContracts());
  dispatch(getAllPets());
};

export const web3TomoWalletConnect = () => async (dispatch) => {
  var Web3 = require('web3');
  const web3 = new Web3(window.web3.currentProvider);
  window.web3.eth.getAccounts((e, accounts) => {
    if (accounts.length > 0) {
      const account = accounts[0];
      dispatch({
        type: WEB3_CONNECT,
        web3,
        account
      });
      dispatch(instantiateContracts());
      dispatch(getAllPets());
    } else {
      console.log('Account not found');
    }
  });
};

export const INSTANTIATE_CONTRACT = 'INSTANTIATE_CONTRACT';
export const instantiateContracts = () => async (dispatch, getState) => {
  const state = getState();
  let web3 = state.tomo.web3;
  const networkId = process.env.REACT_APP_TOMO_ID;
  let factoryAddress = Factory.networks[networkId].address;
  let factory = new web3.eth.Contract(Factory.abi, factoryAddress);
  dispatch({
    type: INSTANTIATE_CONTRACT,
    factory
  });
};

export const GET_ALL_PETS = 'GET_ALL_PETS';
export const getAllPets = () => async (dispatch, getState) => {
  const state = getState();
  let web3 = state.tomo.web3;
  const factory = state.tomo.factory;
  const account = state.tomo.account;
  let petArray = await factory.methods.getAllPetAddressOf(account).call({ from: account });

  const pets = [];
  for (let i = 0; i < petArray.length; i++) {
    let pet = {
      instance: null,
      id: 0,
      amount: 0,
      time: 0,
      targetFund: 0,
      duration: 0,
      purpose: ''
    };
    pet.instance = new web3.eth.Contract(petWallet.abi, petArray[i]);
    let petInfo = await pet.instance.methods.getInfomation().call();
    pet.id = petInfo[0];
    pet.amount = petInfo[1];
    pet.time = petInfo[2];
    pet.targetFund = petInfo[3];
    pet.duration = petInfo[4];
    pet.purpose = petInfo[5];
    pets.push(pet);
  }
  dispatch({
    type: GET_ALL_PETS,
    pets
  });
};
export const GET_ALL_PETS_ADDRESS = 'GET_ALL_PETS_ADDRESS';
export const getAllPetsAddress = () => async (dispatch, getState) => {
  const state = getState();
  const factory = state.tomo.factory;
  const account = state.tomo.account;
  let petsAddress = await factory.methods.getAllPetAddressOf(account).call({ from: account });
  dispatch({
    type: GET_ALL_PETS_ADDRESS,
    petsAddress
  });
};

export const CREATE_NEW_PET = 'CREATE_NEW_PET';
export const createNewPet = (petId, targetFund, duration, purpose) => async (
  dispatch,
  getState
) => {
  const state = getState();
  const factory = state.tomo.factory;
  const account = state.tomo.account;
  let newPet = await factory.methods
    .create(petId, targetFund, duration, purpose)
    .send({ from: account })
    .then(() => {
      dispatch({
        type: CREATE_NEW_PET,
        newPet
      });
    })
    .catch((e) => {
      console.log('Create pet action error', e);
    });
};
