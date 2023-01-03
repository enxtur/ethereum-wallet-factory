const ERC20Wallet = artifacts.require('ERC20Wallet');

module.exports = function (deployer, network, accounts) {
  deployer.deploy(ERC20Wallet);
}