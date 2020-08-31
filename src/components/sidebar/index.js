import { DownOutlined, EyeOutlined } from '@ant-design/icons';
import { useWeb3React } from '@web3-react/core';
import { Layout, Menu } from 'antd';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AccountAvatar, AccountDropDown, AccountSwitch, Intro, SideBarArea, SideMenu } from './style';

const { Sider } = Layout;

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

  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = collapsed => {
    setCollapsed(collapsed);
  };

  return (
    <Sider width={260} collapsible={true} breakpoint="sm" collapsedWidth={80} onCollapse={onCollapse} collapsed={collapsed}>
      <SideBarArea>
        {
          account && <AccountSwitch>
            <AccountDropDown overlay={menu({ active, error, deactivate })} trigger={['click']}>
              <Link>
                <AccountAvatar src={`https://robohash.org/${account}?set=set5`} />
                {!collapsed && <>
                  <span>
                    {`${account.substr(0, 20)}...`}
                  </span>
                  <DownOutlined />
                </>}
              </Link>
            </AccountDropDown>
          </AccountSwitch>
        }
        {!collapsed && !active && <Intro>
          <h3>Welcome to Thirm</h3>
          <p>Connect an Ethereum wallet to manage your DeFi portfolio</p>
        </Intro>}
        <SideMenu
          mode="vertical"
          inlineCollapsed={collapsed}
        >
          <Menu.Item icon={<EyeOutlined />}
            key="01"
          >
            <Link to="/overview">Overview</Link>
          </Menu.Item>
        </SideMenu>
      </SideBarArea>
    </Sider>
  );
}

export default SideBar;