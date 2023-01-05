// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/presets/ERC20PresetFixedSupply.sol"; // for testing with mock erc20 token

contract ERC20Wallet {

  address private _owner;

  event EthDeposited(address indexed from, uint256 amount);
  event WalletSwept(address indexed token, address indexed to, uint256 amount);

  function initialize(address __owner) public {
    require(_owner == address(0), "ERC20Wallet: already initialized");
    require(__owner != address(0), "ERC20Wallet: owner is the zero address");
    _owner = __owner;
  }

  fallback() external payable {
    // emit EthDeposited(msg.sender, msg.value);
  }

  receive() external payable {
    emit EthDeposited(msg.sender, msg.value);
  }

  function owner() public view returns (address) {
    return _owner;
  }

  modifier onlyOwner() {
    require(msg.sender == _owner, "ERC20Wallet: caller is not the owner");
    _;
  }

  function sweep(address tokenAddress) public onlyOwner {
    ERC20 token = ERC20(tokenAddress);
    uint256 balance = token.balanceOf(address(this));
    token.transfer(owner(), balance);
    emit WalletSwept(tokenAddress, owner(), balance);
  }

  function sweepEth() public onlyOwner {
    uint256 balance = address(this).balance;
    payable(owner()).transfer(balance);
    emit WalletSwept(address(0), owner(), balance);
  }
}