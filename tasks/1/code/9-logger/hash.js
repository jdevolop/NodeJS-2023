'use strict';

const crypto = require('node:crypto');

const config = require("./config.js");

const hash = (password) => new Promise((resolve, reject) => {
  const salt = crypto.randomBytes(config.hash.randomByteSize).toString(config.hash.decodeTo);
  crypto.scrypt(password, salt, config.hash.keyLength, (err, result) => {
    if (err) reject(err);
    resolve(salt + ':' + result.toString(config.hash.decodeTo));
  });
});

module.exports = hash;
