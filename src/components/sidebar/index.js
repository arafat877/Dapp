import { EyeOutlined } from '@ant-design/icons';
import { useWeb3React } from '@web3-react/core';
import { Menu } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import { SideBarArea, SideMenu } from './style';

const SideBar = (props) => {
  const context = useWeb3React();
  const {
    active,
  } = context;

  return (
    <SideBarArea>
      <SideMenu
        mode="vertical"
      >
        {
          active && <Menu.Item icon={<EyeOutlined />}
            key="01"
          >
            <Link to="/overview">Overview</Link>
          </Menu.Item>
        }
      </SideMenu>
    </SideBarArea>
  );
}

export default SideBar;
