import { useWeb3React } from "@web3-react/core";
import { Col, Row } from 'antd';
import React from 'react';
import { useHistory } from "react-router-dom";
import { useEagerConnect, useInactiveListener } from "../../hooks";
import { injected } from "../../hooks/connectors";
import { AvatarIcon, ConnectorButton, ConnectWalletBox, ConnectWalletWrapper, LoginInfo } from './style';
const connectorsByName = {
  Injected: injected,
};


const ConnectWallet = () => {
  const context = useWeb3React();
  const {
    connector,
    activate,
    error,
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

  const history = useHistory();

  // Activate the current connector
  const activateWallet = (currentConnector, name) => {
    setActivatingConnector(currentConnector);
    activate(connectorsByName[name]);
    history.push("/overview");
  }

  const MetaMaskIcon = require("../../assets/images/metamask.png");

  return (
    <ConnectWalletWrapper>
      <ConnectWalletBox>
        <LoginInfo>Log In to Thirm</LoginInfo>
        <Row>
          {Object.keys(connectorsByName).map(name => {
            const currentConnector = connectorsByName[name];
            const connected = currentConnector === connector;
            const disabled =
              !triedEager || !!activatingConnector || connected || !!error;
            if (name === "Injected") {
              return (
                <Col span={24}>
                  <ConnectorButton
                    type="primary"
                    key={name}
                    onClick={() => {
                      activateWallet(currentConnector, name);
                    }}>
                    <AvatarIcon src={MetaMaskIcon} />
                    Connect with Metamask
                      </ConnectorButton>
                </Col>
              );
            }
            return (
              <Col span={{ xs: 24, sm: 12 }}>
                <ConnectorButton
                  type="primary"
                  disabled={disabled}
                  key={name}
                  onClick={() => {
                    activateWallet(currentConnector, name);
                  }}>
                  Connect with Metamask
                  </ConnectorButton>
              </Col>
            );
          })}
        </Row>
      </ConnectWalletBox>
    </ConnectWalletWrapper>

  );
}

export default ConnectWallet;