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


function App() {
  return (
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
  );
}

export default App;
