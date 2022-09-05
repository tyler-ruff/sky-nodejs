/*
  Sky for Node.JS
  @LICENSE MIT
  @AUTHOR Tyler Ruff
  @PUBLISHER Blazed Publishing
*/
require('dotenv').config();

const jsonPackage = require('./package.json');
const genBlock = require('./assets/json/genesis.json');

const Block = require('./lib/sky/block.js');
const Wallet = require('./lib/sky/wallet.js');
const Contract = require('./lib/sky/contract.js');
const Server = require('./bin/server.js');

console.log(`Starting Sky for Node.js (v${jsonPackage.version})`);

// Configure Blocks
const cfg = {
  domain: process.env.DOMAIN,
  hostname: process.env.HOSTNAME,
  name: process.env.NAME,
  genesis: genBlock,
  period: [0, 0],
  listenPort: process.env.PORT,
};
const genesisBlock = new Block(cfg);

// Configure
const blockchain = new Contract(genesisBlock);

const w_cfg = {
  id: 1,
  routing: 'c81e728d9d4c2f636f067f89cc14862c',
  account: 'eccbc87e4b5ce2fe28308fd9f2a7baf3',
  type: 1,
  public: false,
  private: false,
  owner: 'ojae01QBOtRNQv9QALEutqnZcPl2',
  domain: process.env.DOMAIN,
};
const newWallet = new Wallet(w_cfg);

s = new Server(cfg);
