import { BorderlessTableOutlined, EyeOutlined, FireOutlined, MoneyCollectOutlined } from '@ant-design/icons';
import { useWeb3React } from '@web3-react/core';
import { Menu } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import { SideMenu } from './style';

const SideBar = () => {
  const context = useWeb3React();
  const {
    active,
  } = context;

  const addr = window.location.pathname.split('/')[1]
  return (
    <>
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
