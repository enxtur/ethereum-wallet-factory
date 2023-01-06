const Web3 = require('web3');
const { createWallets, wallet, walletCount } = require('./interface');

const provider = new Web3.providers.HttpProvider('http://localhost:24012/rpc');
const web3 = new Web3(provider);

async function start() {
  const accounts = await web3.eth.getAccounts();
  const estimateGasFee = true;
  if (true) {
    const count = 100;
    const res = await createWallets(count, accounts[0], estimateGasFee);
    console.log(res);
  }

  if (false) {
    const address = await wallet(0);
    console.log('wallet 0', address);
  }

  if (false) {
    const count = await walletCount();
    console.log('wallet count', count);
  }
}

start();