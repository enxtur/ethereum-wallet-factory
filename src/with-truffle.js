const { createWallets, wallet, walletCount } = require('./interface');

module.exports = async (callback) => {
  const accounts = await web3.eth.getAccounts();

  if (false) {
    const count = 100;
    const res = await createWallets(count, accounts[0]);
    console.log(res);
  }

  if (false) {
    const address = await wallet(0);
    console.log('wallet 0', address);
  }

  if (true) {
    const count = await walletCount();
    console.log('wallet count', count);
  }

  callback();
}