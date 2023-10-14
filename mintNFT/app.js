const { Contract, Wallet } = require("ethers");
const { getZeroDevSigner } = require("@zerodevapp/sdk");

const projectId = "adcc8ac1-2f41-4322-946f-4fe7dbe155c4";
const wallet = new Wallet(
  "0x7ce4923a3ab29fcf5b224a727148471b7fd3e19d338b4b15a9a40d4df97a30c5"
);

const contractAddress = "0x34bE7f35132E97915633BC1fc020364EA5134863";
const contractABI = [
  "function mint(address _to) public",
  "function balanceOf(address owner) external view returns (uint256 balance)",
];

const main = async () => {
  const signer = await getZeroDevSigner({
    projectId,
    owner: wallet,
  });

  const address = await signer.getAddress();
  console.log("My address:", address);

  const nftContract = new Contract(contractAddress, contractABI, signer);

  const receipt = await signer.execBatch([
    {
      to: nftContract.address,
      data: nftContract.interface.encodeFunctionData("mint", [address]),
    },
    {
      to: nftContract.address,
      data: nftContract.interface.encodeFunctionData("mint", [address]),
    },
  ]);
  await receipt.wait();
  console.log(`NFT balance: ${await nftContract.balanceOf(address)}`);
};

main().then(() => process.exit(0));
