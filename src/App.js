import { Web3Provider } from '@ethersproject/providers';
import { Web3ReactProvider } from '@web3-react/core';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import Web3 from 'web3';
import MainContent from './containers';

function getLibrary(provider) {
	const library = new Web3Provider(provider);
	library.pollingInterval = 12000;
	let web3 = new Web3(provider);
	library.web3 = web3;
	return library;
}

function App() {
	return (
		<RecoilRoot>
			<Web3ReactProvider getLibrary={getLibrary}>
				<Router>
					<MainContent />
				</Router>
			</Web3ReactProvider>
		</RecoilRoot>
	);
}

export default App;
