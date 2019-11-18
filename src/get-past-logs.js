const Web3 = require("web3");
// Dai Stablecoin ABI
const abi = require("./abi.json");
const INFURA_URL =
  "https://mainnet.infura.io/v3/d01d7251566d45fdb49bdf1d03beefb1";

const web3 = new Web3(INFURA_URL);

// Address of Dai Stablecoin
const address = "0x89d24A6b4CcB1B6fAA2625fE562bDD9a23260359";

async function main() {
  const latest = await web3.eth.getBlockNumber();

  console.log("Latest block:", latest);

  const contract = new web3.eth.Contract(abi, address);

  const logs = await contract.getPastEvents("Transfer", {
    fromBlock: latest - 100,
    toBlock: latest
    // filter by sender
    // filter: { src: "0x526af336D614adE5cc252A407062B8861aF998F5" },

    // filter by receiver
    // filter: { dst: "0x39755357759ce0d7f32dc8dc45414cca409ae24e" }
  });

  // console.log("Logs", logs, `${logs.length} logs`);

  // Print senders
  // console.log(
  //   "Senders",
  //   logs.map(log => log.returnValues.src),
  //   `${logs.length} logs`
  // );

  // Print receiver
  console.log(
    "Senders",
    logs.map(log => log.returnValues.dst),
    `${logs.length} logs`
  );
}

main();
