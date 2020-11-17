/* eslint-disable react-hooks/exhaustive-deps */
import { CopyOutlined, DownOutlined, LoginOutlined, MenuOutlined, UpOutlined } from '@ant-design/icons';
import { useWeb3React } from '@web3-react/core';
import { Badge, Col, notification, Row, Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { injected, walletConnect, walletlink } from './../../hooks/connectors';
import { collapsedState } from './../../utils/recoilStates';
import { ConnectedAvatar, DisconnectButton, HeaderMeta, LogoMeta, PopverWrapper, StyledPopover, ThirmLogo } from './style';

const LoginKeyIcon = require('../../assets/images/login-key.svg');
const MetaMaskIcon = require('../../assets/images/metamask.png');
const WalletLinkIcon = require('../../assets/images/qr-code.png');
const WalletConnectIcon = require('../../assets/images/wallet-connect.png');

const config = require('../../utils/config.json');

const HeaderBar = (props) => {

  const { onLeftDrawerOpen } = props;

  const collapsed = useRecoilValue(collapsedState);

  const { deactivate, active, account, connector, chainId } = useWeb3React();
  const [popoverVisible, setPopoverVisible] = useState(false);

  const [walletName, setWalletName] = useState('');

  const [walletIcon, setWalletIcon] = useState('');

  useEffect(() => {
    const getWalletNameAndIcon = () => {
      if (!account) return;

      if (connector === injected) {
        setWalletName('Meta Mask');
      } else if (connector === walletlink) {
        setWalletName('Wallet Link');
      } else if (connector === walletConnect) {
        setWalletName('Wallet Connect');
      } else {
        setWalletName('');
      }

      if (connector === injected) {
        setWalletIcon(MetaMaskIcon);
      } else if (connector === walletlink) {
        setWalletIcon(WalletLinkIcon);
      } else if (connector === walletConnect) {
        setWalletIcon(WalletConnectIcon);
      } else {
        setWalletIcon(LoginKeyIcon);
      }
    };

    getWalletNameAndIcon();

  }, [account, chainId]);

  const onPopoverVisible = (val) => {
    setPopoverVisible(val);
  }

  const history = useHistory();

  return (
    <Row justify="space-between" align="middle">
      <Col xs={12}>
        <LogoMeta>
          {collapsed && <MenuOutlined className="menu-icon" onClick={onLeftDrawerOpen} />}
          <ThirmLogo>
            <Link to="/">
              <span className="logo-text">
                THIRM DAPP {active && <Tag className="tag-text" color="volcano">{config[chainId].status}</Tag>}
              </span>
            </Link>
          </ThirmLogo>
        </LogoMeta>
      </Col>

      <Col xs={12}>
        <HeaderMeta>
          {
            active ? <StyledPopover placement="bottomRight" title={null} content={() => <ActivePopoverContent account={account} active={active} deactivate={deactivate} walletName={walletName} networkName={config[chainId].network} history={history} setPopoverVisible={setPopoverVisible} />} trigger="click" onVisibleChange={onPopoverVisible} visible={popoverVisible}>
              <div className="left-content">
                {!collapsed && <Badge count={<div className="active-dot" />} offset={[-8, 40]}><ConnectedAvatar src={walletIcon} /></Badge>}
                <div className="connection-info">
                  <span className="connection-info-up">{walletName}</span>
                  <span className="connection-info-down">{account && account.substr(0, 5)}...{account && account.substr(39)}</span>

                </div>
              </div>

              <div className="right-content">
                <Tag className="network-name" color="success">
                  {config[chainId].network}
                </Tag>
                {
                  popoverVisible ? <UpOutlined className="dropdown-icon" /> : <DownOutlined className="dropdown-icon" />
                }
              </div>

            </StyledPopover> : <StyledPopover placement="bottomRight" title={null} content={null} trigger="click" onVisibleChange={onPopoverVisible} visible={false} onClick={() => history.push('/')}>
                <div className="left-content">
                  {!collapsed &&
                    <Badge count={<div className="inactive-dot" />} offset={[-8, 40]}>
                      <ConnectedAvatar src={LoginKeyIcon} />
                    </Badge>
                  }
                  <div className="connection-info">
                    <span className="connection-info-up">Not Connected</span>
                    <span className="connection-info-down">Connect Wallet</span>
                  </div>
                </div>
                <LoginOutlined className="dropdown-icon" />
              </StyledPopover>
          }
        </HeaderMeta>
      </Col>
    </Row>
  );
}


const ActivePopoverContent = ({ account, active, deactivate, walletName, networkName, history, setPopoverVisible }) => (
  <PopverWrapper>
    <Row justify="center" align="center">
      <ConnectedAvatar src={`https://robohash.org/${account}?set=set5`} size={60} />
      <Tag className="account-address">
        {account}
        <CopyOutlined
          onClick={() => {
            navigator.clipboard.writeText(account)
            notification["success"]({
              message: 'Account Address',
              description:
                'Your account address has been copied to clipboard.',
              placement: 'bottomRight'
            });
          }} />
      </Tag>


      <Col xs={24}>
        <ul className="connection-info">
          <li className="connection-info-list">
            <div>
              Status
            </div>
            <div>
              {active ? "Connected" : ""}
            </div>
          </li>
          <li className="connection-info-list">
            <div>
              Wallet
            </div>
            <div>
              {walletName}
            </div>
          </li>
          <li className="connection-info-list">
            <div>
              Network
            </div>
            <div>
              {networkName}
            </div>
          </li>
        </ul>
      </Col>
      <Col xs={24}>
        <DisconnectButton
          onClick={() => {
            setPopoverVisible(false);
            localStorage.removeItem('wallet');
            deactivate();
            history.push('/');
          }}
        >
          Disconnect
          </DisconnectButton>
      </Col>
    </Row>
  </PopverWrapper>
);

export default HeaderBar;
