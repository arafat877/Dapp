import { Web3Provider } from '@ethersproject/providers';
import { Web3ReactProvider } from '@web3-react/core';
import React from 'react';
import { RecoilRoot } from 'recoil';
import Web3 from 'web3';
import MainContent from './containers';
import { CONTRACT_ADDRESS, ROPSTEN_URL, abi } from './utils/config';

function getLibrary(provider) {
	const library = new Web3Provider(provider);
	const web3 = provider ? new Web3(provider) : new Web3(new Web3.providers.HttpProvider(ROPSTEN_URL));
	library.web3 = web3;
	library.contract = new web3.eth.Contract(abi, CONTRACT_ADDRESS);
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
