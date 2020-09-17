import { Web3Provider } from '@ethersproject/providers';
import { Web3ReactProvider } from '@web3-react/core';
import React from 'react';
import { RecoilRoot } from 'recoil';
import Web3 from 'web3';
import MainContent from './containers';
import { abi, CONTRACT_ADDRESS_MAINNET, CONTRACT_ADDRESS_ROPSTEN, ROPSTEN_URL, thirmAbi, THIRM_CONTRACT_ADDRESS } from './utils/config';

function getLibrary(provider) {
	const library = new Web3Provider(provider);

	const web3 = provider ? new Web3(provider) : new Web3(new Web3.providers.HttpProvider(ROPSTEN_URL));
	library.web3 = web3;
	const chainId = provider.chainId;
	if (chainId === '0x1') {
		library.contract = new web3.eth.Contract(abi, CONTRACT_ADDRESS_MAINNET);
	} else if (chainId === '0x3') {
		library.contract = new web3.eth.Contract(abi, CONTRACT_ADDRESS_ROPSTEN);
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
