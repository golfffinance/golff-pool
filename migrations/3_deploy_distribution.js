// ++++++++++++++++ Define Contracts ++++++++++++++++ 

//Deploy Token First
const GOF = artifacts.require("./GOF.sol");

//Deploy Pool
const GOFGXCPool = artifacts.require("./GOFGXCPool.sol");
// const GOFHTPool = artifacts.require("./GOFHTPool.sol");
// const GOFLIKPool = artifacts.require("./GOFLINKPool.sol");
// const GOFUSDTPool = artifacts.require("./GOFUSDTPool.sol");
// const GOFETHPool = artifacts.require("./GOFETHPool.sol");
// const GOFYFIIPool = artifacts.require("./GOFYFIIPool.sol");


// ++++++++++++++++  Main Migration ++++++++++++++++ 

const migration = async (deployer, network, accounts) => {
  await Promise.all([
    deployPool(deployer, network),
  ]);
};

module.exports = migration;

// ++++++++++++++++  Deploy Functions ++++++++++++++++ 
async function deployPool(deployer, network) {

  let gof = await GOF.deployed();
  let reward_account = "0xbD16D1a7DD713407f7096800Db0EAbDF7bC78450";

  console.log("[Golff] 1.Start deploy pool on Network= " + network);

  await deployer.deploy(GOFGXCPool);
  // await deployer.deploy(GOFHTPool);
  // await deployer.deploy(GOFLIKPool);
  // await deployer.deploy(GOFUSDTPool);
  // await deployer.deploy(GOFETHPool);
  // await deployer.deploy(GOFYFIIPool);
  
  console.log("[Golff] 2.Start add minter acl for pool");
  gof.addMinter(GOFGXCPool.address);
  // gof.addMinter(GOFHTPool.address);
  // gof.addMinter(GOFUSDTPool.address);
  // gof.addMinter(GOFUSDTPool.address);
  // gof.addMinter(GOFETHPool.address);
  // gof.addMinter(GOFYFIIPool.address);

  console.log("[Golff] 3.Start set reward distributor");

  let gxc_pool = new web3.eth.Contract(GOFGXCPool.abi, GOFGXCPool.address);
  // let ht_pool = new web3.eth.Contract(GOFHTPool.abi, GOFHTPool.address);
  // let link_pool = new web3.eth.Contract(GOFLIKPool.abi, GOFLIKPool.address);
  // let usdt_pool = new web3.eth.Contract(GOFUSDTPool.abi, GOFUSDTPool.address);
  // let eth_pool = new web3.eth.Contract(GOFETHPool.abi, GOFETHPool.address);
  // let yfii_pool = new web3.eth.Contract(GOFYFIIPool.abi, GOFYFIIPool.address);

  await Promise.all([
    gxc_pool.methods.setRewardDistribution(reward_account).send({ from: reward_account}),
    // ht_pool.methods.setRewardDistribution(reward_account).send({ from: reward_account, gas: 100000 }),
    // link_pool.methods.setRewardDistribution(reward_account).send({ from: reward_account, gas: 100000 }),
    // usdt_pool.methods.setRewardDistribution(reward_account).send({ from: reward_account, gas: 100000 }),
    // eth_pool.methods.setRewardDistribution(reward_account).send({ from: reward_account, gas: 100000 }),
    // yfii_pool.methods.setRewardDistribution(reward_account).send({ from: reward_account, gas: 100000 }),
  ]);

  console.log("[Golff] 4.Start reward Gof to pool");

  let init_quota = web3.utils.toBN(10 ** 18).mul(web3.utils.toBN(833333333)).div(web3.utils.toBN(10 ** 4));

  await Promise.all([
    gxc_pool.methods.notifyRewardAmount(init_quota.toString()).send({ from: reward_account, gasLimit:9900000}),
    // ht_pool.methods.notifyRewardAmount(init_quota.toString()).send({ from: reward_account, gas: 100000 }),
    // link_pool.methods.notifyRewardAmoun(init_quota.toString()).send({ from: reward_account, gas: 100000 }),
    // usdt_pool.methods.notifyRewardAmount(init_quota.toString()).send({ from: reward_account, gas: 100000 }),
    // eth_pool.methods.notifyRewardAmount(init_quota.toString()).send({ from: reward_account, gas: 100000 }),
    // yfii_pool.methods.notifyRewardAmount(init_quota.toString()).send({ from: reward_account, gas: 100000 }),
  ]);
}