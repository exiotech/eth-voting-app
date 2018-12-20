// var ConvertLib = artifacts.require('./ConvertLib.sol')
// var MetaCoin = artifacts.require('./MetaCoin.sol')

// module.exports = function (deployer) {
//   deployer.deploy(ConvertLib)
//   deployer.link(ConvertLib, MetaCoin)
//   deployer.deploy(MetaCoin)
// }

var Election = artifacts.require('./../Election.sol')
module.exports = function (deployer) {
  deployer.deploy(Election, 1545324900, 20, { gas: 6700000 })
}
