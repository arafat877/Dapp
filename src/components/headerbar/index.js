/* eslint-disable react-hooks/exhaustive-deps */
import { DownOutlined, MenuOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { useWeb3React } from '@web3-react/core';
import { Avatar, Col, Popover, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { injected } from '../../hooks/connectors';
import { walletlink } from './../../hooks/connectors';
import { AvatarIcon, ConnectButton, ConnectedAvatar, ConnectorButton, DisconnectButton, PopverWrapper, ThirmLogo } from './style';

const MetaMaskIcon = require("../../assets/images/metamask.png");
const WalletConnectIcon = require("../../assets/images/qr-code.png");

const InActivePopoverContent = ({ connectorsByName, activateWallet }) => (
  <PopverWrapper>
    <Row gutter={4}>
      {connectorsByName && Object.keys(connectorsByName).map(name => {
        const currentConnector = connectorsByName[name];
        return (
          <Col span={12}>
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
  </PopverWrapper>
);

const ActivePopoverContent = ({ account, active, error, deactivate, connector }) => (
  <PopverWrapper>
    <Row justify="space-between" align="middle">
      <Col>
        {connector === injected ? <Avatar src={MetaMaskIcon} /> : connector === walletlink ? <Avatar src={WalletConnectIcon} /> : null}
      </Col>
      <Col>
        {account && account.substr(0, 15)}...
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
  </PopverWrapper>
);

const HeaderBar = (props) => {
  const context = useWeb3React();
  const {
    deactivate,
    active,
    error,
    account,
    connector,
    chainId
  } = context;

  const { onDrawerOpen, collapsed } = props;

  const [networkName, setNetworkName] = useState("");

  useEffect(() => {
    changeNetworkName();
  }, [chainId]);

  const changeNetworkName = () => {
    if (chainId && chainId === 1) {
      setNetworkName("MainNet");
    } else if (chainId && chainId === 3) {
      setNetworkName("Ropsten");
    } else {
      setNetworkName("");
    }
  }

  const { connectorsByName, activate, setActivatingConnector } = props;

  // Activate the current connector
  const activateWallet = (currentConnector, name) => {
    setActivatingConnector(currentConnector);
    activate(connectorsByName[name]);
    window.localStorage.setItem('wallet', name);
  }

  return (
    <Row justify="space-between" align="middle">
      <Col span={{ xs: 12 }}>
        <ThirmLogo>
          {collapsed && <MenuOutlined onClick={onDrawerOpen} style={{ fontSize: 18 }} />}
          <Link to="/">
            <Avatar className="logo" src="https://raw.githubusercontent.com/thirmprotocol/Assets/master/logo.png" />
            <span className="logo-text">THIRM WALLET</span>
          </Link>
        </ThirmLogo>
      </Col>
      <Col span={{ xs: 12 }}>
        <Row>
          <Col span={{ xs: 12 }}>
            {networkName}
          </Col>
          <Col span={{ xs: 12 }}>
            {
              <Popover trigger="click" placement="bottomRight" content={() => account ? <ActivePopoverContent account={account} active={active} error={error} deactivate={deactivate} connector={connector} /> : <InActivePopoverContent connectorsByName={connectorsByName} activateWallet={activateWallet} />}>
                <ConnectButton
                  type="secondary">
                  {
                    active ? <Row justify="space-between" align="middle">
                      <Col>
                        <ConnectedAvatar src={`https://robohash.org/${account}?set=set3`} />
                      </Col>
                      <Col>
                        {!collapsed && account && <span>
                          {`${account.substr(0, 12)}...`}
                          <DownOutlined />
                        </span>}
                      </Col>
                    </Row> : <Row justify="space-around" align="middle">
                        <Col><ThunderboltOutlined /> {!collapsed && `Connect`}</Col></Row>
                  }
                </ConnectButton>
              </Popover>
            }
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default HeaderBar;