/* eslint-disable react-hooks/exhaustive-deps */
import { MenuOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { useWeb3React } from '@web3-react/core';
import { Button, Col, Row } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import { ActiveButton, ThirmLogo } from './style';

const HeaderBar = (props) => {

  const { onLeftDrawerOpen, collapsed, onRightDrawerOpen } = props;

  const { active } = useWeb3React();

  return (
    <Row justify="space-between" align="middle">
      <Col span={{ xs: 12 }}>
        <ThirmLogo>
          {collapsed && <MenuOutlined onClick={onLeftDrawerOpen} style={{ fontSize: 18 }} />}
          <Link to="/">
            <span className="logo-text">THIRM DAPP</span>
          </Link>
        </ThirmLogo>
      </Col>
      <Col xs={3}>
        {
          active ? <ActiveButton onClick={onRightDrawerOpen}>
            <ThunderboltOutlined />
          </ActiveButton> : <Button type="dashed" onClick={onRightDrawerOpen}>
              <ThunderboltOutlined />
            </Button>
        }

      </Col>
    </Row>
  );
}

export default HeaderBar;