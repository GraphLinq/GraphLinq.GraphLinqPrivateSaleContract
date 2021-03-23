const GraphLinqPrivateSale = artifacts.require("GraphLinqPrivateSale");

module.exports = function(deployer) {
  deployer.deploy(GraphLinqPrivateSale, "0x9f9c8ec3534c3ce16f928381372bfbfbfb9f4d24", "715000000000000000000000", "1000000000000000000");
};
