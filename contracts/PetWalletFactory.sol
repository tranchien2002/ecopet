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
  function create(address payable _ownerAddress, uint _petId)
    public
    returns (address petAddress)
  {
    petAddress = address(new PetWallet(_ownerAddress, _petId));
    petAddresses[_ownerAddress].push(petAddress);
    return petAddress;

    emit ContractInstantiation(_petId, _ownerAddress , petAddress);
  }

  /// @dev Allows to get all pet addresses of an user
  /// @param _petOwner: an user address
  /// @return Returns all pet addresses of an address.
  function getAllPetAddressOf(address _petOwner) public view returns (address[] memory) {
    return petAddresses[_petOwner];
  }
}
