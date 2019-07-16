import getWeb3 from '../utils/getWeb3';
export const WEB3_CONNECT = 'WEB3_CONNECT';
export const web3Connect = () => async dispatch => {
  // const web3 = new Web3(Web3.givenProvider || 'ws://127.0.0.1:8545');
  const web3 = await getWeb3();
  const accounts = await web3.eth.getAccounts();
  if (accounts.length > 0) {
    const account = accounts[0];
    console.log('Web3 Account:', account);
    const balance = await web3.eth.getBalance(account);
    dispatch({
      type: WEB3_CONNECT,
      web3,
      account,
      balance
    });
  } else {
    console.log('Account not found');
  }
};
