import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import hre from "hardhat";

describe("EducatethToken", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  const ONE_GWEI = 1_000_000_000;

  async function deployEducatethTokenFixture() {  

    // Contracts are deployed using the first signer/account by default
    const [owner] = await hre.ethers.getSigners();

    const ERC20 = await hre.ethers.getContractFactory("EducatethToken");
    const token = await ERC20.deploy(ONE_GWEI);

    return { token, owner };
  }

  describe("Deployment", function () {
    it(`Should have an initial balance of ${ONE_GWEI}`, async function () {
      const { token, owner } = await loadFixture(deployEducatethTokenFixture);

      expect(await token.balanceOf(owner)).to.equal(ONE_GWEI);
    });

  });

});
