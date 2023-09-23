async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    const EstuaryFactory = await hre.ethers.getContractFactory("Estuary");
    const estuary = await EstuaryFactory.deploy();

    await estuary.deployed();
    console.log("Contract address is: ", estuary.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});