// ++++++++++++++++ Define Contracts ++++++++++++++++ 

//Deploy Token First
const GOF = artifacts.require("./GOF.sol");

//Deploy Pool
const GOFGXCPool = artifacts.require("./GOFBPTPool.sol");
const GOFHTPool = artifacts.require("./GOFUNIV2Pool.sol");
// const GOFLIKPool = artifacts.require("./GOFLINKPool.sol");
// const GOFUSDTPool = artifacts.require("./GOFUSDTPool.sol");
// const GOFETHPool = artifacts.require("./GOFETHPool.sol");
// const GOFYFIIPool = artifacts.require("./GOFYFIIPool.sol");


// ++++++++++++++++  Main Migration ++++++++++++++++ 

const migration = async (deployer, network, accounts) => {
  await Promise.all([
    deployPool(deployer, network, accounts),
  ]);
};

module.exports = migration;

// ++++++++++++++++  Deploy Functions ++++++++++++++++ 
async function deployPool(deployer, network, accounts) {

  let gof = new web3.eth.Contract(GOF.abi, '0x488e0369f9bc5c40c002ea7c1fe4fd01a198801c');
  let reward_account = accounts[0];
  let gas_price = 165000000000;

  console.log("[Golff] 1.Start deploy pool on Network= " + network);

  await deployer.deploy(GOFGXCPool);
  await deployer.deploy(GOFHTPool);
  // await deployer.deploy(GOFLIKPool);
  // await deployer.deploy(GOFUSDTPool);
  // await deployer.deploy(GOFETHPool);
  // await deployer.deploy(GOFYFIIPool);
  
  console.log("[Golff] 2.Start add minter acl for pool");
  gof.methods.addMinter(GOFGXCPool.address).send({ from: reward_account, gasPrice: gas_price, gas: 100000});
  gof.methods.addMinter(GOFHTPool.address).send({ from: reward_account, gasPrice: gas_price, gas: 100000});
  // gof.methods.addMinter(GOFUSDTPool.address).send({ from: reward_account, gasPrice: gas_price, gas: 100000});
  // gof.methods.addMinter(GOFUSDTPool.address).send({ from: reward_account, gasPrice: gas_price, gas: 100000});
  // gof.methods.addMinter(GOFETHPool.address).send({ from: reward_account, gasPrice: gas_price, gas: 100000});
  // gof.methods.addMinter(GOFYFIIPool.address).send({ from: reward_account, gasPrice: gas_price, gas: 100000});

  console.log("[Golff] 3.Start set reward distributor");

  let gxc_pool = new web3.eth.Contract(GOFGXCPool.abi, GOFGXCPool.address);
  let ht_pool = new web3.eth.Contract(GOFHTPool.abi, GOFHTPool.address);
  // let link_pool = new web3.eth.Contract(GOFLIKPool.abi, GOFLIKPool.address);
  // let usdt_pool = new web3.eth.Contract(GOFUSDTPool.abi, GOFUSDTPool.address);
  // let eth_pool = new web3.eth.Contract(GOFETHPool.abi, GOFETHPool.address);
  // let yfii_pool = new web3.eth.Contract(GOFYFIIPool.abi, GOFYFIIPool.address);

  await Promise.all([
    gxc_pool.methods.setRewardDistribution(reward_account).send({ from: reward_account, gasPrice: gas_price, gas: 100000}),
    ht_pool.methods.setRewardDistribution(reward_account).send({ from: reward_account, gasPrice: gas_price, gas: 100000 }),
    // link_pool.methods.setRewardDistribution(reward_account).send({ from: reward_account, gasPrice: gas_price, gas: 100000 }),
    // usdt_pool.methods.setRewardDistribution(reward_account).send({ from: reward_account, gasPrice: gas_price, gas: 100000 }),
    // eth_pool.methods.setRewardDistribution(reward_account).send({ from: reward_account, gasPrice: gas_price, gas: 100000 }),
    // yfii_pool.methods.setRewardDistribution(reward_account).send({ from: reward_account, gasPrice: gas_price, gas: 100000 }),
  ]);

  console.log("[Golff] 4.Start reward Gof to pool");

  let init_quota = web3.utils.toBN(10 ** 18).mul(web3.utils.toBN(40000));

  // await Promise.all([
  //   gxc_pool.methods.notifyRewardAmount(init_quota.toString()).send({ from: reward_account, gasPrice: gas_price, gas:150000}),
  //   ht_pool.methods.notifyRewardAmount(init_quota.toString()).send({ from: reward_account, gasPrice: gas_price, gas: 150000 }),
  // //   link_pool.methods.notifyRewardAmount(init_quota.toString()).send({ from: reward_account, gasPrice: gas_price, gas: 150000 }),
  // //   usdt_pool.methods.notifyRewardAmount(init_quota.toString()).send({ from: reward_account, gasPrice: gas_price, gas: 150000 }),
  // //   eth_pool.methods.notifyRewardAmount(init_quota.toString()).send({ from: reward_account, gasPrice: gas_price, gas: 150000 }),
  // //   yfii_pool.methods.notifyRewardAmount(init_quota.toString()).send({ from: reward_account, gasPrice: gas_price, gas: 150000 }),
  // ]);
}