pragma solidity 0.5.0;

import "./PetWallet.sol";

contract PetWalletFactory {
  /*
   *  Events
   */
  event ContractInstantiation(address contractOwner, address instantiatin);

  address[] public petwallets;

  /// @dev Allows verified creation of a pet wallet.
  /// @return Returns wallet address.
  function create(address payable _ownerAddress)
    public
    returns (address walletAddress)
  {
    walletAddress = address(new PetWallet(_ownerAddress));
    petwallets.push(walletAddress);
    return walletAddress;

    emit ContractInstantiation(_ownerAddress , walletAddress);
  }
}