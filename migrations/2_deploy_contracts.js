// var ConvertLib = artifacts.require('./ConvertLib.sol')
// var MetaCoin = artifacts.require('./MetaCoin.sol')

// module.exports = function (deployer) {
//   deployer.deploy(ConvertLib)
//   deployer.link(ConvertLib, MetaCoin)
//   deployer.deploy(MetaCoin)
// }

var Voting = artifacts.require('./../Voting.sol')
module.exports = function (deployer) {
  deployer.deploy(Voting, ['HHK', 'QO', 'HYD', 'QP', 'LH', 'BHK'], { gas: 6700000 })
}
