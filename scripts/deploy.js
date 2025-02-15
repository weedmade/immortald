async function main() {
  const [deployer] = await ethers.getSigners();
  const balance = await ethers.provider.getBalance(deployer.address);
  console.log("Deployer balance in ETH:", ethers.utils.formatEther(balance));

  // Set a custom gas price of 2 gwei
  const customGasPrice = ethers.utils.parseUnits("2", "gwei");
  console.log("Using custom gas price (in gwei):", ethers.utils.formatUnits(customGasPrice, "gwei"));

  // Deploy the DomainNFT contract with the custom gas price
  const DomainNFT = await ethers.getContractFactory("DomainNFT");
  const domainNFT = await DomainNFT.deploy({ gasPrice: customGasPrice });
  await domainNFT.deployed();
  console.log("DomainNFT deployed to:", domainNFT.address);

  // Deploy the Rebalancer contract with the same custom gas price
  const Rebalancer = await ethers.getContractFactory("Rebalancer");
  const rebalancer = await Rebalancer.deploy({ gasPrice: customGasPrice });
  await rebalancer.deployed();
  console.log("Rebalancer deployed to:", rebalancer.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
