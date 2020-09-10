import { BorderlessTableOutlined, EyeOutlined, FireOutlined, MoneyCollectOutlined, RightOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { useWeb3React } from '@web3-react/core';
import { Col, Menu, Row, Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { injected } from '../../hooks/connectors';
import { walletlink } from './../../hooks/connectors';
import { ConnectButton, ConnectedAvatar, ConnectorAvatar, DisconnectButton, PopverWrapper, SideMenu, SideSocial, SideWrapper, SocialAvatar, StyledPopover, ThirmLogo } from './style';

const MetaMaskIcon = require("../../assets/images/metamask.png");
const WalletConnectIcon = require("../../assets/images/qr-code.png");
const TwitterIcon = require("../../assets/images/twitter.png");
const DiscordIcon = require("../../assets/images/discord.png");
const GithubIcon = require("../../assets/images/github.png");

const ActivePopoverContent = ({ account, active, error, deactivate, connector, history }) => (
  <PopverWrapper>
    <Row justify="space-between" align="middle">
      <Col>
        {connector === injected ? <ConnectorAvatar src={MetaMaskIcon} /> : connector === walletlink ? <ConnectorAvatar src={WalletConnectIcon} /> : null}
      </Col>
      <Col>
        {account}
      </Col>
      <Col xs={24}>
        {(active || error) && (
          <DisconnectButton
            onClick={() => {
              localStorage.removeItem('wallet');
              deactivate();
              history.push("/");
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

  const history = useHistory();

  let addr = window.location.pathname.split('/')[1];
  if (!addr) addr = 'overview';

  return (
    <SideWrapper>
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
                  <StyledPopover placement="right" content={() => <ActivePopoverContent account={account} active={active} error={error} deactivate={deactivate} connector={connector} history={history} />}>
                    <ConnectedAvatar src={`https://robohash.org/${account}?set=set3`} />
                    {networkName && <Tag className="network-name" color="success">{networkName}</Tag>}
                    <span>
                      <RightOutlined className="drop-down" />
                    </span>
                  </StyledPopover> : <Link to="/"><ThunderboltOutlined /> {`Connect`}</Link>
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
          active && <Menu.Item icon={<EyeOutlined />}
            key="overview"
          >
            <Link to="/">Overview</Link>
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
      <SideSocial>
        <ul>  <li>
            <a href="https://github.com/thirmprotocol/app"><SocialAvatar src={GithubIcon} /></a>
          </li>
          <li>
            <a href="https://twitter.com/thirmprotocol"><SocialAvatar src={TwitterIcon} /></a>
          </li>
          <li>
            <a href="https://discord.com/invite/Fa4vDXj"><SocialAvatar src={DiscordIcon} /></a>
          </li>
        </ul>
      </SideSocial>
    </SideWrapper>
  );
}

export default SideBar;
