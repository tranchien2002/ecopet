pragma solidity 0.5.0;

import './SafeMath.sol';

contract PetWallet {
  using SafeMath for uint;
  /*
   * Storage
   */

  address payable public petOwner;
  uint public petId;
  uint public providentFund;
  uint public initialTime;
  uint public growthTime;
  uint public lastTimeSavingMoney;
  uint public lastTimeWithdrawMoney;
  bool public isFreezing;
  uint public nextTimeFreezing;

  /*
   * Events
   */

   event SavingMoney(uint amoutSaving, uint sendTime);
   event WithDrawMoney(uint amount, uint time);

  /*
   * Modifiers
   */

  modifier validTransaction(uint _value) {
    require(_value > 0, 'should send with a value');
    require(msg.value >= _value, 'can not send msg.value less than target value');
    _;
  }

  modifier onlyOwner() {
    require(msg.sender == petOwner, 'only owner can send money to their wallet');
    _;
  }

  modifier enoughMoney(uint _amount) {
    require(address(this).balance >= _amount, 'not enough money to perform');
    _;
  }

  /// @dev Contract constructor sets initial owner of wallet and initial time.
  constructor(address payable _owner, uint _id) public {
    petOwner = _owner;
    petId = _id;
    initialTime = now;
    lastTimeSavingMoney = now;
    nextTimeFreezing = now + 3 days;
  }

  // @dev Allows to owner send money to their wallet.
  // @param _sendValue: amount of money want to saving.
  function savingMoney(uint _sendValue)
    payable
    public
    onlyOwner()
    validTransaction(_sendValue)
  {
  if (msg.value > _sendValue) {
    msg.sender.transfer(msg.value.sub(_sendValue));
  }
  providentFund = providentFund.add(_sendValue);

  if(lastTimeSavingMoney > lastTimeWithdrawMoney) {
    if(now > nextTimeFreezing) {
      growthTime += 3 days;
    } else {
      growthTime = growthTime.add(now.sub(lastTimeSavingMoney));
    }
  }

  isFreezing = false;
  lastTimeSavingMoney = now;
  nextTimeFreezing = now + 3 days;

  emit SavingMoney(_sendValue, now);
  }

  // @dev Allows to owner withdraw money in their wallet.
  // @param _amount: amount of money want to withdraw.
  function withdrawMoney(uint _amount)
    public
    onlyOwner()
    enoughMoney(_amount)
  {
    if(lastTimeWithdrawMoney <= lastTimeSavingMoney) {
      growthTime = growthTime.add(now.sub(lastTimeSavingMoney));
    }

    petOwner.transfer(_amount);
    providentFund = providentFund.sub(_amount);
    lastTimeWithdrawMoney = now;

    if(!isFreezing) {
      isFreezing = true;
    }

    emit WithDrawMoney(_amount, now);
  }

  // @dev Allows to check current status is freezing or not.
  // if more than 3 days not feed your pet, pet's growth time will be freezing
  function checkIsFreezing() public returns (bool) {
    if(now.sub(lastTimeSavingMoney) > (3 days)) {
      isFreezing = true;
    }

    return isFreezing;
  }
}