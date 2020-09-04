import { BorderlessTableOutlined, EyeOutlined } from '@ant-design/icons';
import { useWeb3React } from '@web3-react/core';
import { Menu } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import { SideBarArea, SideMenu } from './style';

const SideBar = () => {
  const context = useWeb3React();
  const {
    active,
  } = context;

  const addr = window.location.pathname.split('/')[1]
  return (
    <SideBarArea>
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
      </SideMenu>
    </SideBarArea>
  );
}

export default SideBar;
