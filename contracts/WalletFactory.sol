// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/proxy/Clones.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./ERC20Wallet.sol";

contract WalletFactory is Ownable {

  address payable public libraryAddress;
  address payable[] private _wallets;
  uint16 public constant ONE_TIME_MAX_WALLETS = 10000;

  constructor() {
    libraryAddress = payable(address(new ERC20Wallet()));
  }

  function createWallets(uint16 count) public onlyOwner {
    require(count > 0, "Count must be greater than 0");
    require(count <= ONE_TIME_MAX_WALLETS, "Count must be less than or equal to 50");
    require(libraryAddress != address(0), "Library address not set");
    for (uint16 i = 0; i < count; i++) {
      address payable clone = payable(Clones.clone(libraryAddress));
      ERC20Wallet(clone).initialize(owner());
      _wallets.push(clone);
    }
  }

  function walletCount() public view returns (uint256) {
    return _wallets.length;
  }

  function wallet(uint256 index) public view returns (address) {
    require(index < _wallets.length, "Index out of bounds");
    return _wallets[index];
  }

  function balance(uint256 index, address tokenAddress) public view returns (uint256) {
    require(index < _wallets.length, "Index out of bounds");
    ERC20 token = ERC20(tokenAddress);
    return token.balanceOf(_wallets[index]);
  }

  function sweep(uint256 index, address tokenAddress) public onlyOwner {
    require(index < _wallets.length, "Index out of bounds");
    ERC20Wallet(_wallets[index]).sweep(tokenAddress);
  }
}