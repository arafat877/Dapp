import { DownOutlined, MenuOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { useWeb3React } from '@web3-react/core';
import { Avatar, Col, Popover, Row } from 'antd';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { injected } from '../../hooks/connectors';
import { walletlink } from './../../hooks/connectors';
import { AvatarIcon, ConnectButton, ConnectorButton, DisconnectButton, HeaderBarArea, PopverWrapper } from './style';

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

const ActivePopoverContent = ({ account, active, error, deactivate, history, connector }) => (
  <PopverWrapper>
    <Row justify="space-between" align="middle">
      <Col >
        {connector === injected ? <Avatar src={MetaMaskIcon} /> : connector === walletlink ? <Avatar src={WalletConnectIcon} /> : null}
      </Col>
      <Col>
        <Avatar src={`https://robohash.org/${account}?set=set3`} />
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
    connector
  } = context;

  const { onDrawerOpen, collapsed } = props;

  const history = useHistory();

  const { connectorsByName, activate, setActivatingConnector } = props;

  // Activate the current connector
  const activateWallet = (currentConnector, name) => {
    setActivatingConnector(currentConnector);
    activate(connectorsByName[name]);
    window.localStorage.setItem('wallet', name);
  }

  return (
    <HeaderBarArea>
      <Row justify="space-between">
        <Col span={{ xs: 6 }}>
          {collapsed && <MenuOutlined onClick={onDrawerOpen} icon="menu" size="large" />}
        </Col>
        <Col span={{ xs: 6 }}>
          {
            <Popover trigger="click" placement="bottomRight" content={() => account ? <ActivePopoverContent account={account} active={active} error={error} deactivate={deactivate} history={history} connector={connector} /> : <InActivePopoverContent connectorsByName={connectorsByName} activateWallet={activateWallet} />}>
              <ConnectButton
                type="secondary">
                {
                  active ? <Row justify="space-between" align="middle">
                    <Col>
                      <Avatar src={`https://robohash.org/${account}?set=set3`} />
                    </Col>
                    <Col>
                      <span>
                        {`${account && account.substr(0, 10)}...`}
                        <DownOutlined />
                      </span>
                    </Col>
                  </Row> : <Row justify="space-around" align="middle">
                      <Col><ThunderboltOutlined /> Connect</Col></Row>
                }
              </ConnectButton>
            </Popover>
          }
        </Col>
      </Row>

    </HeaderBarArea >
  );
}

export default HeaderBar;