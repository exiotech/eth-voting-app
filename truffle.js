// Allows us to use ES6 in our migrations and tests.
require('babel-register')

module.exports = {
  compilers: {
    solc: {
      version: '0.5.2'
    }
  },
  networks: {
    rinkeby: {
      host: '127.0.0.1',
      port: 8545,
      from: '0x6436d1ba2c46d3ebd2d80e22e2676a5650662b5a',
      network_id: '4', // Match any network id
      gas: 4700000000
    },

    ropsten: {
      host: '127.0.0.1',
      port: 8545,
      from: '0x6436d1ba2c46d3ebd2d80e22e2676a5650662b5a',
      network_id: '3', // Match any network id
      gas: 4700000
    },

    development: {
      host: '127.0.0.1',
      port: 7545,
      network_id: '*' // match any network
    }
  }
}
