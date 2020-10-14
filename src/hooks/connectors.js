/*
 ****************************************************************
 * Connector for web3 To add other connectors
 * check https://codesandbox.io/s/8rg3h?file=/src/connectors.js
 ****************************************************************
 */

import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { WalletLinkConnector } from '@web3-react/walletlink-connector';

const config = require('../utils/config.json');

export const injected = new InjectedConnector({
	supportedChainIds: [1, 3],
});

export const walletlink = new WalletLinkConnector({
	url: config["1"].RPC_URL,
	appName: 'THIRM DAPP',
});

export const walletConnect = new WalletConnectConnector({
	rpc: { 1: config["1"].RPC_URL },
	bridge: 'https://bridge.walletconnect.org',
	qrcode: true,
	pollingInterval: 12000,
});
