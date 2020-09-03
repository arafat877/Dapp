import { Web3Provider } from "@ethersproject/providers";
import { Web3ReactProvider } from "@web3-react/core";
import React from 'react';
import { RecoilRoot } from 'recoil';
import MainContent from './containers';

// Use web3 library inside react-web3
function getLibrary(provider) {
  const library = new Web3Provider(provider);
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
