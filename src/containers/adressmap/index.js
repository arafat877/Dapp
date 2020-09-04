/* eslint-disable react-hooks/exhaustive-deps */
import { useWeb3React } from '@web3-react/core';
import { Avatar, Button, Card, Form, Input, List, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import { CONTRACT_ADDRESS, ROPSTEN_URL } from '../../utils/config';
import { TokenCard } from './style';
import { tTokensList } from './tTokensList';

const { Meta } = Card;


const { abi } = require('../../assets/abi/thirmprotocoladdressmap.json');

const AddressMap = () => {

  const context = useWeb3React();

  const [tokensList, setTokensList] = useState(tTokensList);

  const {
    account
  } = context;

  const [form] = Form.useForm();


  const web3Provider = window.web3 ? window.web3.currentProvider : null;

  const web3 = web3Provider
    ? new Web3(web3Provider)
    : new Web3(new Web3.providers.HttpProvider(ROPSTEN_URL));

  let smartContract = null;

  if (account) {
    smartContract = new web3.eth.Contract(abi, CONTRACT_ADDRESS, {
      from: account
    });
  }

  const setTokenAddress = async (address) => {
    if (smartContract) {

      const res = await smartContract.methods.setaddress(selectedToken.name, address).send();

      if (res) {
        const tempTokenList = [...tokensList];
        tempTokenList.map((token) => {
          if (Object.keys(res).length > 0 && token.name === selectedToken.name) {
            token.address = res;
          }
          return token;
        });
        setTokensList(tempTokenList);
      }

    }
  }

  useEffect(() => {
    const getTokenAddress = () => {
      if (account) {
        const tempTokenList = [...tokensList];
        tempTokenList.map(async (token) => {
          const res = await smartContract.methods.getaddress(account, token.name).call();
          token.address = res;
          return token;
        });
        setTokensList(tempTokenList);
      }
    }
    getTokenAddress();
  }, [account]);

  const [visible, setVisible] = useState(false);
  const [selectedToken, setSelectedToken] = useState({});

  const showModal = (id) => {
    setVisible(true);
    setSelectedToken(tokensList[id]);
  };

  const handleOk = e => {
    setVisible(false);
  };

  const handleCancel = e => {
    setVisible(false);
  };

  const onAddressSubmitted = (values) => {
    setTokenAddress(values.address);
    setVisible(false);
  }

  return (
    <>
      <List
        grid={{ gutter: 8 }}
        dataSource={tokensList}
        renderItem={(item, id) => (
          <List.Item>
            <TokenCard
              onClick={() => {
                if (item.address === "") {
                  showModal(id);
                }
              }}>
              <Meta
                avatar={<Avatar src={item.image} />}
                title={item.name}
                description={<p>{item.address !== "" ? item.address : `Address not set`}</p>}
              />
            </TokenCard>
          </List.Item>
        )}
      />
      <Modal
        title={`Set address for ${selectedToken.name}`}
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        {
          <Form
            form={form}
            layout="vertical"
            onFinish={onAddressSubmitted}
          >
            <Form.Item name="address" label="Enter the address" required rules={[
              {
                required: true,
                message: 'Address is required',
              },
            ]}>
              <Input placeholder="Address" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">Set Address</Button>
            </Form.Item>
          </Form>
        }

      </Modal>
    </>
  );
}

export default AddressMap;