import { BorderlessTableOutlined, DownOutlined, EyeOutlined, FireOutlined, MoneyCollectOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { useWeb3React } from '@web3-react/core';
import { Avatar, Col, Menu, Popover, Row, Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { injected } from '../../hooks/connectors';
import { walletlink } from './../../hooks/connectors';
import { ConnectButton, ConnectedAvatar, DisconnectButton, PopverWrapper, SideMenu, ThirmLogo } from './style';

const MetaMaskIcon = require("../../assets/images/metamask.png");
const WalletConnectIcon = require("../../assets/images/qr-code.png");

const ActivePopoverContent = ({ account, active, error, deactivate, connector }) => (
  <PopverWrapper>
    <Row justify="space-between" align="middle">
      <Col>
        {connector === injected ? <Avatar src={MetaMaskIcon} /> : connector === walletlink ? <Avatar src={WalletConnectIcon} /> : null}
      </Col>
      <Col>
        {`${account.substr(0, 16)}...${account.substr(37)}`}
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

const SideBar = (props) => {
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

  const { collapsed } = props;

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

  const addr = window.location.pathname.split('/')[1];

  return (
    <>
      {!collapsed && <Row>
        <Col xs={24}>
          <ThirmLogo>
            <Link to="/">
              <span className="logo-text">THIRM DAPP</span>
            </Link>
          </ThirmLogo>
        </Col>
        <Col span={{ xs: 24 }}>
          {
            <ConnectButton
              type="secondary">
              {
                active ?
                  <Popover trigger="click" placement="right" content={() => <ActivePopoverContent account={account} active={active} error={error} deactivate={deactivate} connector={connector} />}>
                    <Row justify="space-between" align="middle">
                      <Col>
                        <ConnectedAvatar src={`https://robohash.org/${account}?set=set3`} />
                        {account && <span>
                          {`${account.substr(0, 16)}...${account.substr(37)}`}
                          <DownOutlined className="drop-down" />
                        </span>}
                      </Col>
                      <Col>
                        {networkName && <Tag className="network-name" color="success">{networkName}</Tag>}
                      </Col>
                    </Row> </Popover> : <Row justify="space-around" align="middle">
                    <Col><Link to="/"><ThunderboltOutlined /> {`Connect`}</Link></Col></Row>
              }
            </ConnectButton>
          }
        </Col>
      </Row>
      }
      <SideMenu
        mode="vertical"
        defaultSelectedKeys={[addr]}
      >
        {
          active &&
          <Menu.Item icon={<EyeOutlined />}
            key="overview"
          >
            <Link to="/overview">Overview</Link>
          </Menu.Item>
        }
        {
          active && <Menu.Item icon={<BorderlessTableOutlined />}
            key="addressmap"
          >
            <Link to="/addressmap">Address Map</Link>
          </Menu.Item>
        }
        {
          active && <Menu.Item icon={<MoneyCollectOutlined />}
            key="tokens"
          >
            <Link to="/tokens">Tokens</Link>
          </Menu.Item>
        }
        {
          active && <Menu.Item icon={<FireOutlined />}
            key="burn"
          >
            <Link to="/burn">Burn</Link>
          </Menu.Item>
        }
      </SideMenu>
    </>
  );
}

export default SideBar;
