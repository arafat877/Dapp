import { useWeb3React } from '@web3-react/core';
import { Layout } from 'antd';
import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Route, Switch
} from "react-router-dom";
import HeaderBar from '../components/headerbar';
import SideBar from '../components/sidebar';
import { injected, walletlink } from '../hooks/connectors';
import RightSideBar from './../components/rightsidebar/index';
import { useEagerConnect, useInactiveListener } from './../hooks/index';
import AddressMap from './adressmap';
import Burn from './burn/index';
import ConnectWallet from './connect-wallet';
import { SideWrapper, StyledContent, StyledDrawer, StyledHeader, StyledSider } from './globalStyle';
import OverView from './overview';
import Tokens from './tokens/index';

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
  const [activatingConnector, setActivatingConnector] = useState();

  React.useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    }

  }, [activatingConnector, connector, setActivatingConnector]);

  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = useEagerConnect();

  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  useInactiveListener(!triedEager || !!activatingConnector);

  // Left Drawer Open and Close
  const [leftDrawerVisible, setLeftDrawerVisible] = useState(false);
  const onLeftDrawerClose = () => {
    setLeftDrawerVisible(false);
  };
  const onLeftDrawerOpen = () => {
    setLeftDrawerVisible(true);
  };

  // Right Drawer Open and Close
  const [rightDrawerVisible, setRightDrawerVisible] = useState(false);
  const onRightDrawerClose = () => {
    setRightDrawerVisible(false);
  };
  const onRightDrawerOpen = () => {
    setRightDrawerVisible(true);
  };

  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = collapsed => {
    setCollapsed(collapsed);
  };

  return (
    <Router>
      <Layout>
        <StyledDrawer
          title={
            <div className="logo-area">
              THIRM WALLET
            </div>
          }
          placement="left"
          onClose={onLeftDrawerClose}
          visible={leftDrawerVisible}
        >
          <SideBar collapsed={collapsed} />
        </StyledDrawer>

        <StyledDrawer
          title={
            null
          }
          placement="right"
          onClose={onRightDrawerClose}
          visible={rightDrawerVisible}
        >
          <RightSideBar collapsed={collapsed} />
        </StyledDrawer>

        {collapsed && <StyledHeader>
          <HeaderBar visible={leftDrawerVisible} onLeftDrawerOpen={onLeftDrawerOpen} onRightDrawerOpen={onRightDrawerOpen} collapsed={collapsed} />
        </StyledHeader>}

        <Layout>
          <StyledSider width={250} breakpoint="md" onCollapse={onCollapse} collapsed={collapsed} collapsedWidth={0} trigger={null}>
            <SideWrapper>
              <SideBar collapsed={collapsed} />
            </SideWrapper>
          </StyledSider>
          <StyledContent>
            <Switch>
              <Route exact path="/" component={() => <ConnectWallet connectorsByName={connectorsByName} activate={activate} setActivatingConnector={setActivatingConnector} />} />
              <Route exact path="/overview" component={() => <OverView />} />
              <Route exact path="/addressmap" component={() => <AddressMap />} />
              <Route exact path="/tokens" component={() => <Tokens />} />
              <Route exact path="/burn" component={() => <Burn />} />
            </Switch>
          </StyledContent>
        </Layout>
      </Layout>
    </Router>
  );
}

export default MainContent;
