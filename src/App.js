import { Web3Provider } from '@ethersproject/providers';
import { Web3ReactProvider } from '@web3-react/core';
import React from 'react';
import { RecoilRoot } from 'recoil';
import MainContent from './containers';

function getLibrary(provider) {
	const library = new Web3Provider(provider);
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
