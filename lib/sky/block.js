const SHA256 = require('crypto-js/sha256');
const MD5 = require('crypto-js/md5');
const SHA1 = require('crypto-js/sha1');
const { v4: uuidv4 } = require('uuid');

module.exports = class Block {
  constructor(config) {
    this.genesis = config.genesis;
    this.id = uuidv4();
    this.chainSymbol = this.genesis.CX;
    this.name = config.name;
    this.uri = `https://${config.hostname}.${config.domain}/`;
    this.hash = this.generateHash({
      type: 'block',
      id: this.genesis.id,
      prevHash: this.genesis.PX,
    });
    this.timestamp = this.time();
    this.limit = this.genesis.LX;
    this.total = parseInt(this.genesis.TX);
    this.period = config.period;
    this.transactions = [
      {
        id: 1,
        to: `c81e728d9d4c2f636f067f89cc14862c::c4ca4238a0b923820dcc509a6f75849b`,
        from: `c81e728d9d4c2f636f067f89cc14862c::eccbc87e4b5ce2fe28308fd9f2a7baf3`,
        amount: 17.23,
        nonce: 975,
        timestamp: 1662282475,
        hash: `eeb6dd511cd17f51500916a0e619aaef4999c3408fcbd9bed587f6b62cbde162`,
        validators: [
          `8d71358cb9ada855e951cc94aad60c8d@blz.one`,
          `41f6859a2cf0ca9d4927243a60bb1b18@blz.one`,
        ],
      },
    ];
    return this.hash;
  }
  time() {
    return (new Date().getTime() / 1000) | 0;
  }
  getSymbol() {
    return this.chainSymbol;
  }
  getStart() {
    return this.period[0];
  }
  getEnd() {
    return this.period[1];
  }
  getLength() {
    return this.period[1] - this.period[0];
  }
  transfer(_to, _from, _amount) {
    const c = {
      to: _to,
      from: _from,
      amount: _amount,
    };
    return createTransaction(c);
  }
  generateHash(config) {
    switch (config.type) {
      case 'transaction':
      case 'trans':
        let e = `${config.amount}@${config.timestamp}?${config.nonce}!${config.id}`;
        return SHA256(e).toString();
      case 'block':
      case 'blk':
        let w = `${config.id}***${config.prevHash}`;
        return SHA256(w).toString();
    }
  }
  createTransaction(config) {
    const time = this.time();
    const randNonce = Math.random(3096);
    const newId = this.transactions.length + 1;
    let newTransaction = {
      id: newId,
      to: config.to,
      from: config.from,
      amount: config.amount,
      nonce: randNonce,
      timestamp: time,
      hash: this.generateHash({
        type: 'trans',
        timestamp: time,
        nonce: randNonce,
        id: newId,
      }),
    };
  }
};
