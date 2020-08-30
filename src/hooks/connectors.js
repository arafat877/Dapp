import { InjectedConnector } from "@web3-react/injected-connector";
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

export { injected };

