// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "../contracts/ERC20Wallet.sol";
import "./Coin.sol";

contract TestERC20Wallet {

  Coin coin;

  constructor() {
    coin = new Coin(10);
  }

  function testInitialize() public {
    ERC20Wallet wallet = new ERC20Wallet();

    try wallet.initialize(address(0)) {
      assert(false);
    } catch (bytes memory) {
      assert(true);
    }

    wallet.initialize(address(this));
    assert(wallet.owner() == address(this));

    try wallet.initialize(address(this)) {
      assert(false);
    } catch (bytes memory) {
      assert(true);
    }
  }

  function testSweep() public {
    assert(coin.balanceOf(address(this)) == 10);

    ERC20Wallet wallet = new ERC20Wallet();
    wallet.initialize(address(this));
    
    coin.transfer(address(wallet), 1);
    assert(coin.balanceOf(address(wallet)) == 1);
    assert(coin.balanceOf(address(this)) == 9);

    wallet.sweep(address(coin));
    assert(coin.balanceOf(address(wallet)) == 0);
    assert(coin.balanceOf(address(this)) == 10);
  }

  // function testSweepEth() public {
  //   ERC20Wallet wallet = new ERC20Wallet();
  //   wallet.initialize(address(this));

  //   payable(address(wallet)).transfer(0);
  //   assert(address(wallet).balance == 0);

  //   wallet.sweepEth();
  //   assert(address(wallet).balance == 0);
  // }

}