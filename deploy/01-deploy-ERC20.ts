import { ethers, run } from 'hardhat'
import { DeployFunction, DeployResult } from 'hardhat-deploy/dist/types';
import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { developmentChains, networkConfig } from "../helper-hardhat-config.ts";
import verify from "../helper-functions.ts";

const deployLock: DeployFunction = async function (
    hre: HardhatRuntimeEnvironment
) {
    const { getNamedAccounts, deployments, network} = hre;
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();

    const initialSupply: bigint = ethers.parseEther("1000");

    const args: any[] = [
        initialSupply,
    ];
    
    log("-----------------------------------");
    log("Deploying EducatethToken...");

    const token: DeployResult = await deploy("EducatethToken", {
        from: deployer,
        args: args,
        log: true,
        waitConfirmations: networkConfig[network.name].blockConfirmations || 1,
    });
    
    log("-----------------------------------");
    log("Verifying EducatethToken...");

    if (!developmentChains.includes(network.name)) {
        await verify(token.address, args);
    }
}

export default deployLock;