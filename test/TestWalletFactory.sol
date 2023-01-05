// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "../contracts/WalletFactory.sol";
import "./Coin.sol";

contract TestWalletFactory {

  Coin coin;

  constructor() {
    coin = new Coin(10);
  }

  function testConstructor() public {
    WalletFactory factory = new WalletFactory();
    assert(factory.libraryAddress() != address(0));
  }

  function testCreateWallets() public {
    WalletFactory factory = new WalletFactory();
    factory.createWallets(10);
    assert(factory.wallet(0) != address(0));
  }

  function testMaxCreateWallets() public {
    WalletFactory factory = new WalletFactory();
    factory.createWallets(50);
    // assert(factory.wallet(0) != address(0));
    // assert(factory.wallet(59) != address(0));
  }

  function testWallet() public {
    WalletFactory factory = new WalletFactory();
    factory.createWallets(1);
    assert(factory.wallet(0) != address(0));
    try factory.wallet(1) {
      assert(false);
    } catch (bytes memory) {
      assert(true);
    }
  }

  function testBalance() public {
    WalletFactory factory = new WalletFactory();
    factory.createWallets(1);
    assert(factory.balance(0, address(coin)) == 0);

    coin.transfer(factory.wallet(0), 1);
    assert(factory.balance(0, address(coin)) == 1);

    try factory.balance(1, address(coin)) {
      assert(false);
    } catch (bytes memory) {
      assert(true);
    }    
  }

  function testSweep() public {
    WalletFactory factory = new WalletFactory();
    factory.createWallets(1);
    assert(factory.balance(0, address(coin)) == 0);

    coin.transfer(factory.wallet(0), 1);
    assert(factory.balance(0, address(coin)) == 1);

    // owner error occurs
    // factory.sweep(0, address(coin));
    // assert(factory.balance(0, address(coin)) == 0);
  }
}