const Web3 = require('web3');
const contract = require('@truffle/contract');
const WalletFactoryArtifact = require('../build/contracts/WalletFactory.json');
const truffleDashboardProvider = new Web3.providers.HttpProvider('http://localhost:24012/rpc');

function makeContract(artifact) {
  const Contract = contract(artifact);
  if (global.web3 && global.web3.currentProvider) {
    Contract.setProvider(web3.currentProvider);
  } else {
    Contract.setProvider(truffleDashboardProvider);
  }
  return Contract;
}

exports.wallet = async (walletIndex) => {
  const WalletFactoryContract = makeContract(WalletFactoryArtifact);
  const instance = await WalletFactoryContract.deployed();
  const address = await instance.wallet(0);
  return address
}

exports.walletCount = async () => {
  const WalletFactoryContract = makeContract(WalletFactoryArtifact);
  const instance = await WalletFactoryContract.deployed();
  const count = await instance.walletCount();
  return count.toNumber();
}

exports.createWallets = async (count, account, estimateGasFee) => {
  const WalletFactoryContract = makeContract(WalletFactoryArtifact);
  const instance = await WalletFactoryContract.deployed();
  if (estimateGasFee){
    const res = await instance.createWallets.estimateGas(count, {
      from: account,
    });
    return res;
  } else {
    const res = await instance.createWallets(count, {
      from: account,
    });
    return res;
  }
}