const { createWallets, wallet, walletCount } = require('./interface');

module.exports = async (callback) => {
  const accounts = await web3.eth.getAccounts();
  const estimateGasFee = false

  if (false) {
    const count = 100;
    const res = await createWallets(count, accounts[0], estimateGasFee);
    console.log(res);
  }

  if (true) {
    const address = await wallet(0);
    console.log('wallet 0', address);
  }

  if (true) {
    const count = await walletCount();
    console.log('wallet count', count);
  }

  callback();
}