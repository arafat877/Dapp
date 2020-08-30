import { DownOutlined } from '@ant-design/icons';
import { useWeb3React } from '@web3-react/core';
import { Avatar, Dropdown, Menu } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';

const menu = ({ active, error, deactivate }) => (
  <Menu>
    <Menu.Item key="0">
      <Link>Account 2</Link>
    </Menu.Item>
    <Menu.Item key="1">
      <Link>Account 3</Link>
    </Menu.Item>
    {(active || error) && (<Menu.Divider />)}
    <Menu.Item key="3">
      <div>
        {(active || error) && (
          <Link
            onClick={() => {
              deactivate();
            }}
          >
            Disconnect
          </Link>
        )}
        {!!error && (
          <p>
            {error}
          </p>
        )}
      </div>
    </Menu.Item>
  </Menu>
);

const SideBar = () => {
  const context = useWeb3React();
  const {
    deactivate,
    active,
    error,
    account
  } = context;

  return (<div className="sidebar">
    <div className="accounts-switch">
      <Dropdown overlay={menu({ active, error, deactivate })} trigger={['click']}>
        <Link>
          <Avatar style={{ marginRight: 8 }}>U</Avatar>
          {`${account && account.substr(0, 20)}...`}
          <DownOutlined />
        </Link>
      </Dropdown>
    </div>
    <div className="intro">
      <h3>Welcome to Thirm</h3>
      <p>Connect an Ethereum wallet to manage your DeFi portfolio</p>
    </div>
    <Menu
      style={{ width: 233, backgroundColor: '#f9f9f9' }}
      mode="vertical"
    >
      <Menu.Item
        key="01"
      >
        <Link to="/overview">Overview</Link>
      </Menu.Item>
      <Menu.Item
        key="02"
      >
        <Link to="/history">History</Link>
      </Menu.Item>
    </Menu>
  </div>);
}

export default SideBar;