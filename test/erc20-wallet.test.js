const ERC20Wallet = artifacts.require("ERC20Wallet");
const ERC20PresetFixedSupply = artifacts.require("ERC20PresetFixedSupply");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */

contract("ERC20Wallet", function (accounts) {

  it("should initialize", async function () {
    const instance = await ERC20Wallet.deployed();
    await instance.initialize(accounts[0]);
    const owner = await instance.owner();
    assert.equal(owner, accounts[0], "Owner should be accounts[0]");
  });

  it("should sweep", async function () {
    const instance = await ERC20Wallet.deployed();
    const ERC20Instance = await ERC20PresetFixedSupply.new(
      "Test",
      "COIN",
      10,
      accounts[0]
    );
    const accountBalance = (await ERC20Instance.balanceOf(accounts[0])).toNumber();
    assert.equal(accountBalance, 10, "accounts[0] balance should be 10");

    await ERC20Instance.transfer(instance.address, 1);
    const walletBalance = (await ERC20Instance.balanceOf(instance.address)).toNumber();
    assert.equal(walletBalance, 1, "Wallet balance should be 1");
    
    await instance.sweep(ERC20Instance.address);
    const newWalletBalance = (await ERC20Instance.balanceOf(instance.address)).toNumber();
    assert.equal(newWalletBalance, 0, "Wallet balance should be 0");

    const newAccountBalance = (await ERC20Instance.balanceOf(accounts[0])).toNumber();
    assert.equal(newAccountBalance, 10, "accounts[0] balance should be 10");
  });
  it("should sweep eth", async function () {
    const instance = await ERC20Wallet.deployed();
    const result = await web3.eth.sendTransaction({ from: accounts[0], to: instance.address, value: 1 });

    let walletBalance = await web3.eth.getBalance(instance.address);
    assert.equal(walletBalance, 1, "Wallet balance should be 1");

    const sweepResult = await instance.sweepEth();
    // console.log('sweepResult', JSON.stringify(sweepResult, null, 2));
    // console.log('accounts[0]', accounts[0]);
    assert.equal(sweepResult.receipt.status, true, "Sweep should be successful");

    // asserting event
    assert.equal(sweepResult.logs[0].event, "WalletSwept", "SweepEth event should be emitted");
    assert.equal(sweepResult.logs[0].args.amount.toNumber(), 1, "SweepEth event amount should be 1");
    assert.equal(sweepResult.logs[0].args.to, accounts[0], "Sweep to accounts[0]");

    walletBalance = await web3.eth.getBalance(instance.address);
    assert.equal(walletBalance, 0, "Wallet balance should be 0");
  });
});
