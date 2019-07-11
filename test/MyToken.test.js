const MyToken = artifacts.require('MyToken');

contract('MyToken', ([_, owner, user1, dog]) => {
  describe('Initial balance', () => {
    var mtk;

    before(async () => {
      console.log(owner);
      mtk = await MyToken.new({ from: owner });
    });

    it('Tokens minted', async () => {
      let supply = await mtk.totalSupply();
      assert.equal(supply, 100000000, 'Tokens should be minted');
    });

    it('Tokens owner', async () => {
      let ownerBalance = await mtk.balanceOf(owner);
      assert.equal(ownerBalance, 100000000, 'Owner should have 100,000,000');
    });
  });
});
