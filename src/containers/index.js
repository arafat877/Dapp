import { useWeb3React } from '@web3-react/core';
import { Layout } from 'antd';
import React from 'react';
import {
  BrowserRouter as Router,
  Route, Switch
} from "react-router-dom";
import HeaderBar from '../components/headerbar';
import SideBar from '../components/sidebar';
import { injected, walletlink } from '../hooks/connectors';
import { useEagerConnect, useInactiveListener } from './../hooks/index';
import ConnectWallet from './connect-wallet';
import { ContentWrapper } from './globalStyle';
import OverView from './overview';


const connectorsByName = {
  Injected: injected,
  walletlink: walletlink
};

function MainContent() {
  const context = useWeb3React();
  const {
    connector,
    activate,
  } = context;

  // state for connectot activation
  const [activatingConnector, setActivatingConnector] = React.useState();
  React.useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    }
  }, [activatingConnector, connector]);

  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = useEagerConnect();

  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  useInactiveListener(!triedEager || !!activatingConnector);

  return (
    <Router>
      <Layout>
        <SideBar />
        <Layout>
          <HeaderBar />
          <ContentWrapper>
            <Switch>
              <Route exact path="/" component={() => <ConnectWallet setActivatingConnector={setActivatingConnector} activate={activate} connectorsByName={connectorsByName} triedEager={triedEager} activatingConnector={activatingConnector} />} />
              <Route exact path="/overview" component={OverView} />
            </Switch>
          </ContentWrapper>
        </Layout>
      </Layout>
    </Router>
  );
}

export default MainContent;
