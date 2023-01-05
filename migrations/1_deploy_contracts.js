const ERC20Wallet = artifacts.require('ERC20Wallet');
const WalletFactory = artifacts.require('WalletFactory');

module.exports = async function (deployer, network, accounts) {
  // await deployer.deploy(ERC20Wallet);
  // await deployer.link(ERC20Wallet, WalletFactory);
  await deployer.deploy(WalletFactory);
  console.log('WalletFactory.address', WalletFactory.address);
}