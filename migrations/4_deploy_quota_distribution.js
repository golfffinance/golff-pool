// ++++++++++++++++ Define Contracts ++++++++++++++++ 

//Deploy Token First
const GOF = artifacts.require("./GOF.sol");

//Deploy QuotaDistribution
const QuotaDistribution = artifacts.require("./QuotaDistribution.sol");

// ++++++++++++++++  Main Migration ++++++++++++++++ 

const migration = async (deployer, network, accounts) => {
  await Promise.all([
    deployQuotaDistribution(deployer, network, accounts),
  ]);
};

module.exports = migration;

// ++++++++++++++++  Deploy Functions ++++++++++++++++ 
async function deployQuotaDistribution(deployer, network, accounts) {
  
  let gof = new web3.eth.Contract(GOF.abi, '0x488e0369f9bc5c40c002ea7c1fe4fd01a198801c');

  // if(network == "mainnet"){
    let disribution_account = accounts[0];
    let gas_price = 125000000000;

    console.log("[Golff] 1.Start deploy QuotaDistribution on Network= " + network);

    await deployer.deploy(QuotaDistribution,1600318800, 174);
   
    console.log("[Golff] 2.Start add minter acl for distribution");

    gof.methods.addMinter(QuotaDistribution.address).send({ from: disribution_account, gasPrice: gas_price, gas: 100000});

    console.log("[Golff] 3.Start set quota distributor");

    let quota_distribution = new web3.eth.Contract(QuotaDistribution.abi, QuotaDistribution.address);
    
    await Promise.all([
      quota_distribution.methods.setQuotaDistribution(disribution_account).send({from: disribution_account, gasPrice: gas_price, gas: 100000}),
    ]);
      
    // console.log("[Golff] 4.Start distribute Gof quota to org");
    
    // await Promise.all([
    //   quota_distribution.methods.distributeQuota().send({from:disribution_account, gasLimit:9900000}),
    // ]);
  // }
}