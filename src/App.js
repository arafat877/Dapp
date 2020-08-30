import { Web3Provider } from "@ethersproject/providers";
import { Web3ReactProvider } from "@web3-react/core";
import React from 'react';
import { Col, Grid, Row } from 'react-flexbox-grid';
import {
  BrowserRouter as Router,
  Route, Switch
} from "react-router-dom";
import './App.css';
import SideBar from './components/sidebar';
import ConnectWallet from './containers/connect-wallet';
import Wallet from './containers/wallet';
import { useEagerConnect, useInactiveListener } from './hooks';

function getLibrary(provider) {
  const library = new Web3Provider(provider);
  library.pollingInterval = 8000;
  return library;
}

function App() {
  return (
    <Web3ReactProvider getLibrary={getLibrary}
    >
      <Web3Init>
        <Router>
          <SideBar />
          <div className="content-wrapper">
            <Grid fluid>
              <Row>
                <Col xs={10} md={9}>
                  <Switch>
                    <Route exact path="/" component={ConnectWallet} />
                    <Route path="/wallet" component={Wallet} />
                  </Switch>
                </Col>
              </Row>
            </Grid>
          </div>
        </Router>
      </Web3Init>
    </Web3ReactProvider>
  );
}

function Web3Init(props) {



  const triedEager = useEagerConnect();
  useInactiveListener(!triedEager);

  return (props.children);
}

export default App;
