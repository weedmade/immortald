async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  // Get the contract factory and create the deployment transaction for DomainNFT
  const DomainNFT = await ethers.getContractFactory("DomainNFT");
  // Prepare deployment transaction but don't wait for it to be mined yet
  const deployTx = DomainNFT.getDeployTransaction("ImmortalDomain", "IMD");
  
  // Estimate gas cost for deployment
  const estimatedGas = await deployTx.estimateGas(); // or deployTx.estimateGas(deployer) if needed
  const gasPrice = await ethers.provider.getGasPrice();
  console.log("Estimated cost in ETH:", ethers.utils.formatEther(estimatedGas.mul(gasPrice)));
  
  // Now deploy the contract normally
  const domainNFT = await DomainNFT.deploy();
  await domainNFT.deployed();
  console.log("DomainNFT deployed to:", domainNFT.address);

  // Similarly, you can deploy the Rebalancer contract if needed...
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
