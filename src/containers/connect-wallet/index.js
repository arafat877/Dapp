import { Col, Row } from 'antd';
import React from 'react';
import { LoginInfo } from './style';

const ConnectWallet = (props) => {

  return (
    <Row>
      <Col xs={24}>
        <LoginInfo>Thirm Wallet</LoginInfo>
        <p>Welcome</p>
      </Col>
    </Row>

  );
}

export default ConnectWallet;