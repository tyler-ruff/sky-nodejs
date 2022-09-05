const Block = require('./block.js');
const Wallet = require('./wallet.js');

function time() {
  return (new Date().getTime() / 1000) | 0;
}

module.exports = class Contract {
  constructor(genesisBlock) {
    this.chain = [];
    // seed chain with genesis block
    if (genesisBlock instanceof Block) {
      this.chain.push(genesisBlock);
    }
  }
  addBlock(newBlock) {
    if (newBlock instanceof Block) {
      this.chain.push(newBlock);
    }
  }
};
