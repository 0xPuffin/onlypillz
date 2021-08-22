const fs = require("fs");
const chalk = require("chalk");
const { config, ethers } = require("hardhat");
const { utils } = require("ethers");
const R = require("ramda");


const main = async () => {

  console.log("\n\n 📡 Deploying...\n");

  const FacetCutAction = {
    Add: 0,
    Replace: 1,
    Remove: 2
  }

  function getSelectors (contract) {
    console.log(`reducing contract ${contract}`);
    const signatures = Object.keys(contract.interface.functions)
   console.log(signatures.length);
   console.log(signatures);
    const selectors = [];
    for (var i in signatures) {
      console.log(`i is ${i}`);
    console.log(contract.interface.getSighash(signatures[i]));
      selectors.push(contract.interface.getSighash(signatures[i]));
    }

    console.log(selectors);
    return selectors 
  }
  const Pillz = await deploy("Pillz") // <-- dia in constructor args like line 19 vvvv
 
  //const raiseFactoryFacet = await deploy("RaiseFactoryFacet") // <-- dia in constructor args like line 19 vvvv
  //const diamondCutFacet = await deploy("DiamondCutFacet") // <-- add in constructor args like line 19 vvvv
 //const govToken = await deploy("Benies", ["BENIES", "LTG"]) // <-- add in constructor args like line 19 vvvv
 //const oneToOnePricing = await deploy("OneToOnePricing");
// const growingPricing = await deploy("GrowingPricing");
 // initial version of the defi and diamond cut facet after deploying the initial version of these contracts feel free to comment line 37 - 40 and line 34 and make changes to the defi facet contract and deploy alone and upgrade the diamond through ui
 // diamonf cut params include facet address, action and function signatures
 /* async function deployFacets (...facets) {
  const instances = []
  for (let facet of facets) {
    let constructorArgs = []
    if (Array.isArray(facet)) {
      ;[facet, constructorArgs] = facet
    }
    const factory = await ethers.getContractFactory(facet)
    const facetInstance = await factory.deploy(...constructorArgs)
    await facetInstance.deployed()

    const tx = facetInstance.deployTransaction
    const receipt = await tx.wait()
    instances.push(facetInstance)
  }
  return instances
} */


function getSignatures (contract) {
  return Object.keys(contract.interface.functions)
}




const accounts = await ethers.getSigners()
const ownerAddress = await accounts[0].getAddress()

//console.log(`gov token is ${govToken}`);
//console.log(govToken.address);

 
 /* const diamondCutParams = [
    [diamondCutFacet.address, FacetCutAction.Add, [ '0x1f931c1c' ]],
    [bookingFactoryFacet.address, FacetCutAction.Add, []]
  ]
  // eslint-disable-next-line no-unused-vars
  const deployedDiamond = await deploy("Diamond", [diamondCutParams])  */
}

  //const secondContract = await deploy("SecondContract")

  // const exampleToken = await deploy("ExampleToken")
  // const examplePriceOracle = await deploy("ExamplePriceOracle")
  // const smartContractWallet = await deploy("SmartContractWallet",[exampleToken.address,examplePriceOracle.address])



  /*
  //If you want to send value to an address from the deployer
  const deployerWallet = ethers.provider.getSigner()
  await deployerWallet.sendTransaction({
    to: "0x34aA3F359A9D614239015126635CE7732c18fDF3",
    value: ethers.utils.parseEther("0.001")
  })
  */


  /*
  //If you want to send some ETH to a contract on deploy (make your constructor payable!)
  const yourContract = await deploy("YourContract", [], {
  value: ethers.utils.parseEther("0.05")
  });
  */


  /*
  //If you want to link a library into your contract:
  // reference: https://github.com/austintgriffith/scaffold-eth/blob/using-libraries-example/packages/hardhat/scripts/deploy.js#L19
  const yourContract = await deploy("YourContract", [], {}, {
   LibraryName: **LibraryAddress**
  });
  */


  console.log(
    " 💾  Artifacts (address, abi, and args) saved to: ",
    chalk.blue("packages/hardhat/artifacts/"),
    "\n\n"
  );

const deploy = async (contractName, _args = [], overrides = {}, libraries = {}) => {
  console.log(` 🛰  Deploying: ${contractName}`);

  const contractArgs = _args || [];
  const contractArtifacts = await ethers.getContractFactory(contractName,{libraries: libraries});
  const deployed = await contractArtifacts.deploy(...contractArgs, overrides);
  const encoded = abiEncodeArgs(deployed, contractArgs);
  fs.writeFileSync(`artifacts/${contractName}.address`, deployed.address);

  console.log(
    " 📄",
    chalk.cyan(contractName),
    "deployed to:",
    chalk.magenta(deployed.address),
  );

  if (!encoded || encoded.length <= 2) return deployed;
  fs.writeFileSync(`artifacts/${contractName}.args`, encoded.slice(2));

  return deployed;
};


// ------ utils -------

// abi encodes contract arguments
// useful when you want to manually verify the contracts
// for example, on Etherscan
const abiEncodeArgs = (deployed, contractArgs) => {
  // not writing abi encoded args if this does not pass
  if (
    !contractArgs ||
    !deployed ||
    !R.hasPath(["interface", "deploy"], deployed)
  ) {
    return "";
  }
  const encoded = utils.defaultAbiCoder.encode(
    deployed.interface.deploy.inputs,
    contractArgs
  );
  return encoded;
};

// checks if it is a Solidity file
const isSolidity = (fileName) =>
  fileName.indexOf(".sol") >= 0 && fileName.indexOf(".swp") < 0 && fileName.indexOf(".swap") < 0;

const readArgsFile = (contractName) => {
  let args = [];
  try {
    const argsFile = `./contracts/${contractName}.args`;
    if (!fs.existsSync(argsFile)) return args;
    args = JSON.parse(fs.readFileSync(argsFile));
  } catch (e) {
    console.log(e);
  }
  return args;
};

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });