const { ethers } = require("hardhat");
const fs = require("fs");

async function main() {
  const ownerAddress = "0x7908D08D8014a58B8a517b21F61106F5c5Db9E2E";
  console.log("Deploying contracts with the owner address:", ownerAddress);

  // Load the compiled contract artifact
  const Geologix = await ethers.getContractFactory("Geologix");

  // Deploy the contract
  const geologix = await Geologix.deploy(
    // Pass constructor parameters here
    12, // Latitude
    12, // Longitude
    4, // Radius
    1, // Start Time (Unix timestamp)
    6, // End Time (Unix timestamp)
    2 // Reward Amount (in wei)
  );

  console.log("Geologix deployed to:", geologix.runner.address);

  // Write contract ABI and address to JSON file
  const data = {
    address: geologix.address,
    abi: geologix.interface.format("json")
  };

  fs.writeFileSync("./../frontend/src/components/Geologix.json", JSON.stringify(data));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
