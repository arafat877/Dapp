import { Web3Provider } from "@ethersproject/providers";
import { Web3ReactProvider } from "@web3-react/core";
import { Layout } from 'antd';
import React from 'react';
import {
  BrowserRouter as Router,
  Route, Switch
} from "react-router-dom";
import './App.css';
import SideBar from './components/sidebar';
import ConnectWallet from './containers/connect-wallet';
import OverView from './containers/overview';
import Wallet from './containers/wallet';

const { Content } = Layout;

// Use web3 library inside react-web3
function getLibrary(provider) {
  const library = new Web3Provider(provider);
  library.pollingInterval = 8000;
  return library;
}

function App() {
  return (
    <Router>
      <Web3ReactProvider getLibrary={getLibrary}>
        <Layout>
          <SideBar />
          <Layout className="content-wrapper">
            <Content>
              <Switch>
                <Route exact path="/" component={ConnectWallet} />
                <Route exact path="/overview" component={OverView} />
                <Route path="/history" component={Wallet} />
              </Switch>
            </Content>
          </Layout>
        </Layout>
      </Web3ReactProvider>
    </Router>
  );
}

export default App;
