/* eslint-disable react-hooks/exhaustive-deps */
import { useWeb3React } from '@web3-react/core';
import { Avatar, Button, Col, Form, Input, notification, Row, Tabs } from 'antd';
import Meta from 'antd/lib/card/Meta';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { useMainContract } from '../../hooks';
import config from '../../utils/config';
import { StyledTabs, TokenCard } from '../withdraw/style';
import LoadingIndicator from './../../components/loadingIndicator/index';
import { collapsedState } from './../../utils/recoilStates';
import { DepositBox, DepositWrapper } from './style';

const Deposit = () => {
  const { account, library, chainId } = useWeb3React();

  const mainContract = useMainContract();

  const [tokensList, setTokensList] = useState([]);

  const [selectedToken, setSelectedToken] = useState(0);

  const collapsed = useRecoilValue(collapsedState);

  const [form] = Form.useForm();

  const history = useHistory();

  useEffect(() => {
    let stale = false;

    const getTokensList = async () => {

      const params = history.location.state;

      if (params && params.token) {
        setSelectedToken(params.token.toString());
      }

      let tokensListTemp = [...config.tokens];

      if (!stale) {
        setTokensList(tokensListTemp);
      }
    };

    getTokensList();

    return () => {
      stale = true;
    };
  }, [account, chainId]);


  const onChangeToken = (value) => {
    setSelectedToken(value);
  };

  const onFinish = async (values) => {

    try {

      const signatureSubmitted = await mainContract.submitSignature(account, tokensList[selectedToken].coin, tokensList[selectedToken].address, values.signature, {
        gasLimit: 500000
      });

      library.once(signatureSubmitted.hash, () => {

        notification["success"]({
          message: 'Signature',
          description:
            `You have successfully submitted signature for ${tokensList[selectedToken].coin}`,
          placement: 'bottomRight'
        });

      });

    } catch (e) {
      console.log(e);
    }

  };



  if (tokensList.length === 0) return <LoadingIndicator />;

  return (

    <StyledTabs defaultActiveKey={selectedToken} tabPosition={collapsed ? 'top' : 'left'} onChange={onChangeToken} type="card">
      {tokensList.map((tkn) => (
        <Tabs.TabPane
          tab={
            <TokenCard>
              <Meta avatar={<Avatar src={tkn.image} size="small" />} title={tkn.name} />
            </TokenCard>
          }
          key={tkn.id}
        >
          <DepositWrapper>
            <Row gutter={24} justify="space-around">
              <Col xs={24} xl={12}>
                <DepositBox>
                  <Form form={form} layout="vertical" onFinish={onFinish} className="deposit-form">

                    <Form.Item name="signature" rules={[{ required: true, message: 'Please enter signature hash' }]} label={`${tokensList[selectedToken].name} signature`} className="deposit-form-item">
                      <Input
                        placeholder={`Enter ${tokensList[selectedToken].name} signature`}
                      />
                    </Form.Item>

                    <Form.Item className="deposit-form-item">
                      <Button className="deposit-button" type="primary" htmlType="submit">
                        Deposit
											</Button>
                    </Form.Item>
                  </Form>
                </DepositBox>
              </Col>
            </Row>
          </DepositWrapper>
        </Tabs.TabPane>
      ))}
    </StyledTabs>

  );
};

export default Deposit;
