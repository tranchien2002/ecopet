pragma solidity 0.5.0;

contract PetWallet {
  /*
   * Storage
   */

  address payable public petOwner;
  uint public currentFund;
  uint public maxFund;
  uint public initialTime;
  uint public growthTime;
  uint public lastTimeSavingMoney;
  bool public isFreezing;
  uint public lastTimeFreezing;
  uint public nextTimeFreezing;

  /*
   * Events
   */

   event SavingMoney(uint amoutSaving, uint sendTime);
   event WithDrawMoney(uint amount, uint time);
   event IsFreezingTime(bool isFreezing, uint time);
   event IsGrowthTime(bool isFreezing, uint time);

  /*
   * Modifiers
   */

  modifier validTransaction(uint _value) {
    require(_value > 0);
    require(msg.value >= _value);
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
  constructor(address payable _owner) public {
    petOwner = _owner;
    initialTime = now;
    lastTimeSavingMoney = now;
    nextTimeFreezing = now + 3 days;
  }

  /// @dev Allows to owner send money to their wallet.
  /// @param _sendValue: amount of money want to saving.
  function savingMoney(uint _sendValue)
    payable
    public
    onlyOwner()
    validTransaction(_sendValue)
  {
    if (msg.value > _sendValue) {
        msg.sender.transfer(msg.value - _sendValue);
    }
    currentFund += _sendValue;

    if(currentFund < maxFund) {
      isFreezing = true;
    } else {
      isFreezing = false;
      if(now > nextTimeFreezing) {
        growthTime += 3 days;
        nextTimeFreezing = now + 3 days;
      } else {
        growthTime += (now - lastTimeSavingMoney);
        nextTimeFreezing = now + 3 days;
      }
    }

    lastTimeSavingMoney = now;
    nextTimeFreezing = now + 3 days;

    if(currentFund >= maxFund) {
      maxFund = currentFund;
    }

    emit SavingMoney(_sendValue, now);
  }

  /// @dev Allows to owner withdraw money in their wallet.
  /// @param _amount: amount of money want to withdraw.
  function withdrawMoney(uint _amount)
    public
    onlyOwner()
    enoughMoney(_amount)
  {
    petOwner.transfer(_amount);
    currentFund -= _amount;

    if(!isFreezing) {
      isFreezing = true;
      lastTimeFreezing = now;
      emit IsFreezingTime(isFreezing, now);
    }

    emit WithDrawMoney(_amount, now);
  }

  /// @dev Allows to check current status is freezing or not.
  /// if more than 3 days not feed your pet, pet's growth time will be freezing
  function checkIsFreezing() public view returns (bool) {
    // if(!isFreezing && now - lastTimeSavingMoney > (3 days)) {
    //   isFreezing = true;
    //   lastTimeFreezing = now;

    //   emit IsFreezingTime(isFreezing, now);
    // }
    return isFreezing;
  }
}