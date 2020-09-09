import { Col, Row } from 'antd';
import React from 'react';
import { AvatarIcon, ConnectorButton, LoginInfo } from './style';

const MetaMaskIcon = require("../../assets/images/metamask.png");
const WalletConnectIcon = require("../../assets/images/qr-code.png");

const ConnectWallet = (props) => {

  const { connectorsByName, activate, setActivatingConnector } = props;

  // Activate the current connector
  const activateWallet = (currentConnector, name) => {
    setActivatingConnector(currentConnector);
    activate(connectorsByName[name]);
    window.localStorage.setItem('wallet', name);
  }

  return (
    <Row>
      <Col xs={24}>
        <LoginInfo>Connect with your wallet</LoginInfo>

      </Col>
      <Col xs={24}>
        <Row gutter={4}>
          {connectorsByName && Object.keys(connectorsByName).map(name => {
            const currentConnector = connectorsByName[name];
            return (
              <Col>
                {
                  name === "Injected" && (<ConnectorButton
                    key={name}
                    onClick={() => {
                      activateWallet(currentConnector, name);
                    }}>
                    <AvatarIcon src={MetaMaskIcon} />
                    <p>Metamask</p>
                  </ConnectorButton>)
                }
                {
                  name === "walletlink" && (<ConnectorButton
                    type="secondary"
                    key={name}
                    onClick={() => {
                      activateWallet(currentConnector, name);
                    }}>
                    <AvatarIcon src={WalletConnectIcon} />
                    <p>Wallet Link</p>
                  </ConnectorButton>)
                }
              </Col>
            );
          })}
        </Row>
      </Col>
    </Row>

  );
}

export default ConnectWallet;