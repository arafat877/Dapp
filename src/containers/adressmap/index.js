/* eslint-disable react-hooks/exhaustive-deps */
import { useWeb3React } from '@web3-react/core';
import { Avatar, Button, Card, Form, Input, List, Modal, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import { TokenCard } from './style';

const { Meta } = Card;

const initialTokensList = [
  {
    name: 'tADA',
    image: 'https://raw.githubusercontent.com/thirmprotocol/Assets/master/icons/tADA.png',
    address: ''
  },
  {
    name: 'tBAT',
    image: 'https://raw.githubusercontent.com/thirmprotocol/Assets/master/icons/tBAT.png',
    address: ''
  },
  {
    name: 'tBNB',
    image: 'https://raw.githubusercontent.com/thirmprotocol/Assets/master/icons/tBNB.png',
    address: ''
  },
  {
    name: 'tBNT',
    image: 'https://raw.githubusercontent.com/thirmprotocol/Assets/master/icons/tBNT.png',
    address: ''
  },
  {
    name: 'tBTC',
    image: 'https://raw.githubusercontent.com/thirmprotocol/Assets/master/icons/tBTC.png',
    address: ''
  },
  {
    name: 'tCEL',
    image: 'https://raw.githubusercontent.com/thirmprotocol/Assets/master/icons/tCEL.png',
    address: ''
  }
];

const { abi } = require('../../assets/abi/thirmprotocoladdressmap.json');

const AddressMap = () => {

  const context = useWeb3React();

  const [tokensList, setTokensList] = useState(initialTokensList);

  const {
    account
  } = context;

  const [form] = Form.useForm();

  const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));

  const contractAddress = "0x5Ec92BCa7B80Aa76B42d3A47AF1a5D3538ba113B";

  let smartContract = null;

  if (account) {
    smartContract = new web3.eth.Contract(abi, contractAddress, {
      from: account,
      gasPrice: '20000000000'
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

  console.log(tokensList);

  return (
    <Row>
      <List
        grid={{ gutter: 8, xs: 1, md: 2, lg: 3, column: 3 }}
        dataSource={tokensList}
        renderItem={(item, id) => (
          <List.Item>
            <TokenCard
              onClick={() => showModal(id)}>
              <Meta
                avatar={<Avatar src={item.image} />}
                title={item.name}
                description={<p>{item.address !== "" ? `Address set` : `Address not set`}</p>}
              />
            </TokenCard>
          </List.Item>
        )}
      />
      <Modal
        title={selectedToken.address === "" ? `Set address for ${selectedToken.name}` : `${selectedToken.name}`}
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        {
          selectedToken.address !== "" ? <p>{selectedToken.address}</p> : <Form
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
    </Row>
  );
}

export default AddressMap;