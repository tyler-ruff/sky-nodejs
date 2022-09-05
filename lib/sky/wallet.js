const MD5 = require('crypto-js/md5');
const SHA256 = require('crypto-js/sha256');

function time() {
  return (new Date().getTime() / 1000) | 0;
}
module.exports = class Wallet {
  constructor(config) {
    this.id = config.id;
    this.routing = config.routing;
    this.domain = config.domain;

    if (this.address !== false) {
      this.address = config.address;
    } else {
      this.address = this.generate_address();
    }

    this.type = config.type;
    this.public = config.public;
    this.private = config.private;
    this.owner = config.owner;
    this.email = config.email;
    if (config.created > 0) {
      this.created = config.created;
    } else {
      this.created = this.generate_timestamp();
    }
    this.balance = config.balance;
    this.company = config.company;
    this.init();
  }
  init() {
    if (this.public === false || this.private === false) {
      this.generate_keys();
    }
  }
  generate_timestamp() {
    return time();
  }
  generate_address() {
    return MD5(this.id).toString();
  }
  generate_keys() {
    this.public = MD5(`${this.id}@${this.owner}`).toString();
    this.private = SHA256(
      `${this.routing}::${this.address}+${this.id}!${this.owner}`
    ).toString();
  }
};
