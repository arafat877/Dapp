/* eslint-disable react-hooks/exhaustive-deps */
import { useWeb3React } from '@web3-react/core';
import { Col, Row } from 'antd';
import React from 'react';
import { getErrorMessage } from './../../hooks/index';
import { AvatarIcon, ConnectorButton, ErrorAlert, LoginInfo } from './style';

const MetaMaskIcon = require('../../assets/images/metamask.png');
const WalletLinkIcon = require('../../assets/images/qr-code.png');
const WalletConnectIcon = require('../../assets/images/wallet-connect.png');

const ConnectWallet = (props) => {

  const { error } = useWeb3React();

  const { connectorsByName, activate, setActivatingConnector } = props;

  const activateWallet = async (currentConnector, name) => {
    setActivatingConnector(currentConnector);
    await activate(connectorsByName[name]);
    window.localStorage.setItem('wallet', name);
  };
  return (
    <Row>
      <Col xs={24}>
        <LoginInfo>Connect with your wallet</LoginInfo>
      </Col>
      <Col xs={24}>
        <Row gutter={4}>
          {connectorsByName &&
            Object.keys(connectorsByName).map((name) => {
              const currentConnector = connectorsByName[name];
              return (
                <Col>
                  {name === 'Injected' && (
                    <ConnectorButton
                      key={name}
                      onClick={() => {
                        activateWallet(currentConnector, name);
                      }}
                    >
                      <AvatarIcon src={MetaMaskIcon} />
                      <p>Metamask</p>
                    </ConnectorButton>
                  )}
                  {name === 'walletlink' && (
                    <ConnectorButton
                      type="secondary"
                      key={name}
                      onClick={() => {
                        activateWallet(currentConnector, name);
                      }}
                    >
                      <AvatarIcon src={WalletLinkIcon} />
                      <p>Wallet Link</p>
                    </ConnectorButton>
                  )}

                  {name === 'walletConnect' && (
                    <ConnectorButton
                      type="secondary"
                      key={name}
                      onClick={() => {
                        activateWallet(currentConnector, name);
                      }}
                    >
                      <AvatarIcon src={WalletConnectIcon} />
                      <p>Wallet Connect</p>
                    </ConnectorButton>
                  )}
                </Col>
              );
            })}
        </Row>
      </Col>
      <Col xs={12}>{!!error && <ErrorAlert message="Error" description={getErrorMessage(error)} type="error" showIcon />}</Col>
    </Row>
  );
};

export default ConnectWallet;