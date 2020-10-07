import { Web3Provider } from '@ethersproject/providers';
import { Web3ReactProvider } from '@web3-react/core';
import React from 'react';
import { RecoilRoot } from 'recoil';
import Web3 from 'web3';
import MainContent from './containers';
import { abi, thirmAbi } from './utils/config';

const config = require('./utils/config.json');

function getLibrary(provider) {
	const library = new Web3Provider(provider);

	let web3 = new Web3(provider);
	library.web3 = web3;
	library.contract = new web3.eth.Contract(abi, config.CONTRACT_ADDRESS);
	library.thirm = new web3.eth.Contract(thirmAbi, config.THIRM_CONTRACT_ADDRESS);
	library.pollingInterval = 12000;

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
