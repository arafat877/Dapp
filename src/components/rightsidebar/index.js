import { ThunderboltOutlined } from '@ant-design/icons';
import { useWeb3React } from '@web3-react/core';
import { Col, Row, Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { injected } from '../../hooks/connectors';
import { walletlink } from './../../hooks/connectors';
import { ConnectButton, ConnectedAvatar, ConnectorAvatar, DisconnectButton } from './style';

const MetaMaskIcon = require("../../assets/images/metamask.png");
const WalletConnectIcon = require("../../assets/images/qr-code.png");

const RightSideBar = () => {
  const context = useWeb3React();
  const {
    deactivate,
    active,
    error,
    account,
    connector,
    chainId
  } = context;

  const [networkName, setNetworkName] = useState("");
  useEffect(() => {
    const changeNetworkName = () => {
      if (chainId && chainId === 1) {
        setNetworkName("MainNet");
      } else if (chainId && chainId === 3) {
        setNetworkName("Ropsten");
      } else {
        setNetworkName("");
      }
    }
    changeNetworkName();
  }, [chainId]);
  console.log(connector);
  return (
    <>
      <Row>
        <Col span={{ xs: 24 }}>
          {
            <ConnectButton
              type="secondary">
              {
                active ?
                  <Row justify="space-between" align="middle">
                    <Col>
                      <ConnectedAvatar src={`https://robohash.org/${account}?set=set3`} />
                      {account && <span>
                        {`${account.substr(0, 10)}...${account.substr(37)}`}
                      </span>}
                    </Col>
                    <Col>
                      {networkName && <Tag className="network-name" color="success">{networkName}</Tag>}
                    </Col>
                  </Row> : <Row justify="space-around" align="middle">
                    <Col><Link to="/"><ThunderboltOutlined /> {`Connect`}</Link></Col></Row>
              }
            </ConnectButton>
          }
        </Col>
        <Col span={{ xs: 24 }}>
          <Row justify="space-between" align="middle">
            <Col>
              {connector === injected ? <><ConnectorAvatar src={MetaMaskIcon} />Meta Mask</> : connector === walletlink ? <><ConnectorAvatar src={WalletConnectIcon} />Wallet Link</> : null}
            </Col>
            <Col xs={24}>
              {(active || error) && (
                <DisconnectButton
                  onClick={() => {
                    localStorage.removeItem('wallet');
                    deactivate();
                  }}
                >
                  Disconnect
                </DisconnectButton>
              )}
              {!!error && (
                <p>
                  {error}
                </p>
              )}
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
}

export default RightSideBar;
