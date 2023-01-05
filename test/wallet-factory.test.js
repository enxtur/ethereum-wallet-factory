const WalletFactory = artifacts.require("WalletFactory");
const ERC20PresetFixedSupply = artifacts.require("ERC20PresetFixedSupply");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */

contract("WalletFactory", function (accounts) {

  it("should deployed", async function () {
    const instance = await WalletFactory.deployed();
    const owner = await instance.owner();
    assert.equal(owner, accounts[0], "Owner should be accounts[0]");
  });
  it("should revert with Index out of bounds", async function () {
    const instance = await WalletFactory.deployed();
    await instance.createWallets(1);
    const wallet0 = await instance.wallet(0);
    assert.isTrue(web3.utils.isAddress(wallet0), "wallet0 should be an address");
    try {
      await instance.wallet(1);
    } catch (error) {
      assert.include(error.message, "Index out of bounds", "Index out of bounds");
    }
  });
  it("should create wallets", async function () {
    const instance = await WalletFactory.deployed();
    await instance.createWallets(10);
    const wallet0 = await instance.wallet(0);
    assert.isTrue(web3.utils.isAddress(wallet0), "wallet0 should be an address");
    const wallet9 = await instance.wallet(9);
    assert.isTrue(web3.utils.isAddress(wallet9), "wallet9 should be an address");
  });
  it("should create wallets with max count", async function () {
    const instance = await WalletFactory.deployed();
    await instance.createWallets(50);
    const wallet0 = await instance.wallet(0);
    assert.isTrue(web3.utils.isAddress(wallet0), "wallet0 should be an address");
    const wallet9 = await instance.wallet(59);
    assert.isTrue(web3.utils.isAddress(wallet9), "wallet9 should be an address");
  });
  it("should get balance of wallet", async function () {
    const instance = await WalletFactory.deployed();
    await instance.createWallets(1);
    const wallet0 = await instance.wallet(0);

    const ERC20Instance = await ERC20PresetFixedSupply.new(
      "Test",
      "COIN",
      10,
      accounts[0]
    );
    const accountBalance = (await ERC20Instance.balanceOf(accounts[0])).toNumber();
    assert.equal(accountBalance, 10, "accounts[0] balance should be 10");

    await ERC20Instance.transfer(wallet0, 1);
    const wallet0Balance = (await instance.balance(0, ERC20Instance.address)).toNumber();
    assert.equal(wallet0Balance, 1, "wallet0 balance should be 1");
  });
});
