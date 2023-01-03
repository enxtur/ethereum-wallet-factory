const ERC20Wallet = artifacts.require('ERC20Wallet');
const WalletFactory = artifacts.require('WalletFactory');

module.exports = function (deployer, network, accounts) {
  deployer.deploy(ERC20Wallet);
  deployer.link(ERC20Wallet, WalletFactory);
  deployer.deploy(WalletFactory);
}