const chai = require('chai');
const { expect } = chai;
const { expectRevert } = require('openzeppelin-test-helpers');

var MyERC721 = artifacts.require('MyERC721');

contract('Testing ERC721 contract', function(accounts) {
  beforeEach(async () => {
    this.token = await MyERC721.new({ from: accounts[0] });
  });
  const name = 'My ERC721 Token';
  const symbol = 'MyERC721';

  const account1 = accounts[1];
  const tokenId1 = 1;

  const account2 = accounts[2];
  const tokenId2 = 2;
  const tokenId3 = 3;

  it('Be able to deploy ERC721 Token', async () => {
    expect(await token.symbol()).to.equal(symbol);
    expect(await token.name()).to.equal(name);
  });

  it('Be able to mint token', async () => {
    await token.mintUniqueTokenTo(account1, tokenId1, { from: accounts[0] });

    expect(await token.balanceOf(account1)).to.be.bignumber.equal('1');
  });

  it('Be able to mint some token', async () => {
    await token.mintUniqueTokenTo(account2, tokenId2, { from: accounts[0] });
    await token.mintUniqueTokenTo(account2, tokenId3, { from: accounts[0] });

    expect(await token.balanceOf(account2)).to.be.bignumber.equal('2');
  });

  it('Reverts when minting a token id that already exists', async () => {
    await token.mintUniqueTokenTo(account1, tokenId1, { from: accounts[0] });

    await expectRevert(
      this.token.mintUniqueTokenTo(account2, tokenId1, { from: accounts[0] }),
      'ERC721: token already minted'
    );
  });

  it('Should allow safe transfers', async () => {
    await token.mintUniqueTokenTo(account1, tokenId1, { from: accounts[0] });
    await token.safeTransferFrom(account1, account2, tokenId1, { from: accounts[1] });

    expect(await token.ownerOf(tokenId1)).to.equal(account2);
  });

  // it('Should revert wrong transfers', async () => {
  //   await token.mintUniqueTokenTo(account1, tokenId1, { from: accounts[0] });

  //   await expectRevert(
  //     token.safeTransferFrom(account1, account2, tokenId2, { from: accounts[1] }),
  //     'ERC721: wrong owner'
  //   );
  // });
});
