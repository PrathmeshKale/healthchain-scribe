
const Roles = artifacts.require("Roles");
const Contract = artifacts.require("Contract");

module.exports = function(deployer) {
  deployer.deploy(Roles);
  deployer.link(Roles, Contract);
  deployer.deploy(Contract);
};
