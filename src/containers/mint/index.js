import { Col, Row, Select, Tabs } from 'antd';
import React, { useState } from 'react';
import QRCode from 'react-qr-code';
import { tTokensList } from './../../utils/tTokensList';
import { MintWrapper } from './style';

const { TabPane } = Tabs;
const { Option } = Select;



const Mint = () => {

  const [tokensList] = useState(tTokensList);
  const [selectedToken, setSelectedToken] = useState("");
  function onChangeToken(value) {
    setSelectedToken(value);
  }

  return (
    <>
      <Row>
        <Col xs={24}>
          <MintWrapper>
            <Tabs defaultActiveKey="1">
              <TabPane tab="ERC20" key="1">
                <QRCode value="0x0000000000000000000000000000000000000000" size={200} />
                <p>Deposite Address: 0x0000000000000000000000000000000000000000</p>
              </TabPane>
              <TabPane tab="Non ERC20" key="2">
                <p>
                  Select Token
                <Select defaultValue="" style={{ width: 120 }} allowClear onChange={onChangeToken}>
                    {
                      tokensList.map((tkn) => <Option value={tkn.depositaddress}>{tkn.name}</Option>)
                    }
                  </Select>
                </p>
                {selectedToken && <>
                  <QRCode value={selectedToken} size={200} />
                  <p>Deposite Address: {selectedToken}</p>

                </>}
              </TabPane>
            </Tabs>
          </MintWrapper>
        </Col>
      </Row>
    </>
  );
};

export default Mint;
