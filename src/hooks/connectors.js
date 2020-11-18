/*
 ****************************************************************
 * Connector for web3 To add other connectors
 * check https://codesandbox.io/s/8rg3h?file=/src/connectors.js
 ****************************************************************
 */

import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { WalletLinkConnector } from '@web3-react/walletlink-connector';
import config from '../utils/config';


export const injected = new InjectedConnector({
	supportedChainIds: [config.chainID],
});

export const walletlink = new WalletLinkConnector({
	url: config.RPC_URL,
	appName: 'THIRM DAPP',
});

export const walletConnect = new WalletConnectConnector({
	rpc: { [config.chainID]: config.RPC_URL },
	bridge: 'https://bridge.walletconnect.org',
	qrcode: true,
	pollingInterval: 12000,
});
