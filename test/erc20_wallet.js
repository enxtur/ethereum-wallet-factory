const ERC20Wallet = artifacts.require("ERC20Wallet");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("ERC20Wallet", function (/* accounts */) {
  it("should assert true", async function () {
    await ERC20Wallet.deployed();
    return assert.isTrue(true);
  });
});
