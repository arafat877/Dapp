import { Col, Row, Tabs } from 'antd';
import React from 'react';
import { MintWrapper } from './style';

const { TabPane } = Tabs;

const Mint = () => {

  function callback(key) {
    console.log(key);
  }

  return (
    <>
      <Row>
        <Col xs={24}>
          <MintWrapper>
            <Tabs defaultActiveKey="1" onChange={callback}>
              <TabPane tab="ERC20" key="1">
                Content of Tab Pane 1
    </TabPane>
              <TabPane tab="Non ERC20" key="2">
                Content of Tab Pane 2
    </TabPane>
            </Tabs>
          </MintWrapper>
        </Col>
      </Row>
    </>
  );
};

export default Mint;
