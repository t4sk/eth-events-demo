const Web3 = require("web3");
// Dai Stablecoin ABI
const abi = require("./abi.json");
const INFURA_URL =
  "wss://mainnet.infura.io/ws/v3/d01d7251566d45fdb49bdf1d03beefb1";

const web3 = new Web3(new Web3.providers.WebsocketProvider(INFURA_URL));

// Address of Dai Stablecoin
const address = "0x89d24A6b4CcB1B6fAA2625fE562bDD9a23260359";

async function main() {
  const contract = new web3.eth.Contract(abi, address);

  console.log("Subscribe to Transfer event");

  contract.events.Transfer(
    {
      // filter by sender
      filter: { src: "0x526af336D614adE5cc252A407062B8861aF998F5" }
    },
    (error, log) => {
      if (error) {
        console.log("Error", error);
      }

      console.log("Log", log);
    }
  );
}

main();
