import { EyeOutlined } from '@ant-design/icons';
import { useWeb3React } from '@web3-react/core';
import { Layout, Menu } from 'antd';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Intro, SideBarArea, SideMenu } from './style';

const { Sider } = Layout;

const SideBar = () => {
  const context = useWeb3React();
  const {
    active,
  } = context;

  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = collapsed => {
    setCollapsed(collapsed);
  };

  return (
    <Sider width={260} collapsible={true} breakpoint="sm" collapsedWidth={80} onCollapse={onCollapse} collapsed={collapsed}>
      <SideBarArea>
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
