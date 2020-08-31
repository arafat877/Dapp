import { Col, Row } from 'antd';
import React from 'react';
import { AvatarIcon, ConnectorButton, ConnectWalletBox, ConnectWalletWrapper, LoginInfo } from './style';


const ConnectWallet = (props) => {

  const { connectorsByName, activate, setActivatingConnector } = props;

  const MetaMaskIcon = require("../../assets/images/metamask.png");

  // Activate the current connector
  const activateWallet = (currentConnector, name) => {
    setActivatingConnector(currentConnector);
    activate(connectorsByName[name]);
  }

  return (
    <ConnectWalletWrapper>
      <ConnectWalletBox>
        <LoginInfo>Log In to Thirm</LoginInfo>
        <Row>
          {Object.keys(connectorsByName).map(name => {
            const currentConnector = connectorsByName[name];
            return (
              <Col span={24}>
                {
                  name === "Injected" && (<ConnectorButton
                    type="primary"
                    key={name}
                    onClick={() => {
                      activateWallet(currentConnector, name);
                    }}>
                    <AvatarIcon src={MetaMaskIcon} />
                    Connect with Metamask
                  </ConnectorButton>)
                }
                {
                  name === "walletlink" && (<ConnectorButton
                    type="secondary"
                    key={name}
                    onClick={() => {
                      activateWallet(currentConnector, name);
                    }}>
                    Connect with Wallet Link
                  </ConnectorButton>)

                }

              </Col>
            );
          })}
        </Row>
      </ConnectWalletBox>
    </ConnectWalletWrapper>

  );
}

export default ConnectWallet;