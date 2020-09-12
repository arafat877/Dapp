import { Col, Row } from 'antd';
import React from 'react';
import QRCode from "react-qr-code";
import { BurnInfo } from './style';

const Burn = () => {

  return (
    <Row>
      <Col xs={24}>
        <QRCode value="0x0000000000000000000000000000000000000000" size={200} />
        <BurnInfo>
          <p>Burn your T-Tokens By Sending Them To This Address & Receive Back Locked Crypto: </p>
          <p>0x0000000000000000000000000000000000000000</p>
        </BurnInfo>
      </Col>
    </Row>
  );
}

export default Burn;
