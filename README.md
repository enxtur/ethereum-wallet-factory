## wallet factory

#### This factory contract is designed for mega users of centralized exchanges. It allows you to create wallet contracts that can hold ERC20 tokens, ETH, and sweep their balance to the owner. These wallet contracts provide a convenient and secure way to manage and interact with your assets on a centralized exchange.

```sh
npm install -g truffle
npm install
```

```sh
npm test
```


### Deploying

```sh
truffle dashboard
```

```sh
truffle migrate --network dashboard
```

### Interact to the contract
#### with truffle web3

```sh
truffle exec src/with-truffle.js --network dashboard
```
#### without truffle
```sh
node src/without-truffle.js
```
