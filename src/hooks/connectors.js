import { InjectedConnector } from "@web3-react/injected-connector";

const injected = new InjectedConnector({
  supportedChainIds: [1598738245329, 1337, 5777, 1, 3, 4, 5, 10, 42, 77, 99, 100]
});

export { injected };

