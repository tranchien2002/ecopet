pragma solidity 0.5.0;

import "./PetWallet.sol";

contract PetWalletFactory {
  /*
   *  Events
   */
  event ContractInstantiation(uint petId, address petOwner, address instantiatin);

  address[] public petAddresses;

  /// @dev Allows verified creation of a pet wallet.
  /// @return Returns wallet address.
  function create(address payable _ownerAddress, uint _petId)
    public
    returns (address petAddress)
  {
    petAddress = address(new PetWallet(_ownerAddress, _petId));
    petAddresses.push(petAddress);
    return petAddress;

    emit ContractInstantiation(_petId, _ownerAddress , petAddress);
  }
}