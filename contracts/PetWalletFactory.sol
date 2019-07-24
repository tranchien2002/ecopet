pragma solidity 0.5.0;

import "./PetWallet.sol";

contract PetWalletFactory {
  /*
   *  Events
   */

  event ContractInstantiation(uint petId, address petOwner, address instantiatin);

  /*
   * Storage
   */

  mapping(address => address[]) public petAddresses;

  /// @dev Allows verified creation of a pet wallet.
  /// @return Returns wallet address.
  function create(uint _petId)
    public
    returns (address petAddress)
  {
    petAddress = address(new PetWallet(msg.sender, _petId));
    petAddresses[msg.sender].push(petAddress);
    emit ContractInstantiation(_petId, msg.sender, petAddress);

    return petAddress;
  }

  function getAllPetAddressOf(address _petOwner) public view returns (address[] memory) {
    return petAddresses[_petOwner];
  }
}
