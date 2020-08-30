import { Layout } from 'antd';
import React from 'react';
import {
  BrowserRouter as Router,
  Route, Switch
} from "react-router-dom";
import SideBar from '../components/sidebar';
import ConnectWallet from './connect-wallet';
import { ContentWrapper } from './globalStyle';
import OverView from './overview';
import Wallet from './wallet';

function MainContent() {
  return (
    <Router>
      <Layout>
        <SideBar />
        <Layout>
          <ContentWrapper>
            <Switch>
              <Route exact path="/" component={ConnectWallet} />
              <Route exact path="/overview" component={OverView} />
              <Route path="/history" component={Wallet} />
            </Switch>
          </ContentWrapper>
        </Layout>
      </Layout>
    </Router>
  );
}

export default MainContent;
