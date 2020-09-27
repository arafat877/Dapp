import { useWeb3React } from '@web3-react/core';
import {
  URI_AVAILABLE
} from "@web3-react/walletconnect-connector";
import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useEagerConnect, useInactiveListener } from '../../hooks/index';
import ConnectWallet from './../../containers/connect-wallet/index';
import { injected, walletConnect, walletlink } from './../../hooks/connectors';
import LoadingIndicator from './../loadingIndicator/index';

function Web3Wrapper({ children }) {

  const { connector, activate, active, chainId } = useWeb3React();

  // state for connectot activation
  const [activatingConnector, setActivatingConnector] = useState(true);

  useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(false);
    } else {
      setTimeout(() => {
        if (!active) {
          setActivatingConnector(false);
        }
      }, 600);
    }


  }, [activatingConnector, active, connector, setActivatingConnector]);

  // log the walletconnect URI
  useEffect(() => {
    const logURI = uri => {
      console.log("WalletConnect URI", uri);
    };
    walletConnect.on(URI_AVAILABLE, logURI);

    return () => {
      walletConnect.off(URI_AVAILABLE, logURI);
    };
  }, []);

  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = useEagerConnect();

  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  useInactiveListener(!triedEager || !!activatingConnector);

  if (triedEager && active && chainId !== undefined) {
    return children;
  }

  if (activatingConnector) {
    return <LoadingIndicator />;
  }

  return (
    <Switch>
      <Route exact path="/" component={() => <ConnectWallet connectorsByName={{
        Injected: injected,
        walletlink: walletlink,
        walletConnect: walletConnect,
      }} activate={activate} setActivatingConnector={setActivatingConnector} />} />
    </Switch>
  );
}

export default Web3Wrapper;
