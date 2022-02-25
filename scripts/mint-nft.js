require("dotenv").config();
const Web3 = require("web3");
const web3 = new Web3(process.env.INFURA_RINKEBY_API);

const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json");

const contractAddress = "0xF75a4E6409A952D1544Bccb4b4a4D2E07703d5DD";

const nftContract = new web3.eth.Contract(contract.abi, contractAddress);

// const getAccount = async () => {
//   const accounts = await web3.eth.getAccounts();
//   console.log("accounts", accounts, process.env.INFURA_RINKEBY_API);
// };

// getAccount();

//create transaction

const mintNFT = async (tokenURI) => {
  const nonce = await web3.eth.getTransactionCount(
    process.env.PUBLIC_KEY,
    "latest"
  );

  const tx = {
    from: process.env.PUBLIC_KEY,
    to: contractAddress,
    nonce: nonce,
    gas: 500000,
    data: nftContract.methods
      .mintNFT(process.env.PUBLIC_KEY, tokenURI)
      .encodeABI(),
  };

  const sign = web3.eth.accounts.signTransaction(
    tx,
    process.env.ACCOUNT_PRIVATE_KEY
  );

  sign
    .then((signedTx) => {
      web3.eth.sendSignedTransaction(signedTx.rawTransaction, (err, hash) => {
        if (!err) {
          console.log("The hash of your transaction is: ", hash);
        } else {
          console.log(
            "Something went wrong while submitting your transaction: ",
            err
          );
        }
      });
    })
    .catch((err) => {
      console.log("Promise failed: ", err);
    });
};

mintNFT(
  "https://gateway.pinata.cloud/ipfs/QmPRm62XvFbuCQjQisobcoy3vnV1iXsua5cPmQN2tZAEe2"
);
