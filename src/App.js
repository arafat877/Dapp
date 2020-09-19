import { Web3Provider } from '@ethersproject/providers';
import { Web3ReactProvider } from '@web3-react/core';
import React from 'react';
import { RecoilRoot } from 'recoil';
import Web3 from 'web3';
import MainContent from './containers';
import { abi, CONTRACT_ADDRESS_MAINNET, CONTRACT_ADDRESS_ROPSTEN, thirmAbi, THIRM_CONTRACT_ADDRESS } from './utils/config';
import { RPC_URLS } from './hooks/connectors';

function getLibrary(provider) {
	const library = new Web3Provider(provider);

	const web3 = provider ? new Web3(provider) : new Web3(new Web3.providers.HttpProvider(RPC_URLS[3]));
	library.web3 = web3;
	const chainId = provider.chainId;
	if (chainId === '0x3') {
		library.contract = new web3.eth.Contract(abi, CONTRACT_ADDRESS_ROPSTEN);
	} else {
		library.contract = new web3.eth.Contract(abi, CONTRACT_ADDRESS_MAINNET);
	}

	library.thirm = new web3.eth.Contract(thirmAbi, THIRM_CONTRACT_ADDRESS);

	library.pollingInterval = 8000;
	return library;
}

function App() {
	return (
		<RecoilRoot>
			<Web3ReactProvider getLibrary={getLibrary}>
				<MainContent />
			</Web3ReactProvider>
		</RecoilRoot>
	);
}

export default App;
