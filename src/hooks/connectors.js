import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletLinkConnector } from "@web3-react/walletlink-connector";

/*
  ****************************************************************
  * Connector for web3
  * To add other connectors
  * check https://codesandbox.io/s/8rg3h?file=/src/connectors.js
  ****************************************************************
*/

const injected = new InjectedConnector({
  // Chain IDs for metamask network
  supportedChainIds: [1598738245329, 1337, 5777, 1, 3, 4, 5, 10, 42, 77, 99, 100]
});

const RPC_URLS = {
  1: "https://mainnet.infura.io/v3/84842078b09946638c03157f83405213",
  4: "https://rinkeby.infura.io/v3/84842078b09946638c03157f83405213"
};


export const walletlink = new WalletLinkConnector({
  url: RPC_URLS[1],
  appName: "web3-react example"
});



export { injected };

