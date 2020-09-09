/* eslint-disable react-hooks/exhaustive-deps */
import { useWeb3React } from '@web3-react/core';
import { Avatar, Button, Card, Form, Input, List, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import { TokenCard } from './style';
import { tTokensList } from './tTokensList';

const { Meta } = Card;

const AddressMap = () => {

  const context = useWeb3React();
  const [tokensList, setTokensList] = useState(tTokensList);

  const {
    account,
    library
  } = context;
  const [form] = Form.useForm();

  const setTokenAddress = async (address) => {
    if (account) {

      const res = await library.contract.methods.setAddress(selectedToken.name, address).send({ from: account });

      if (res) {
        const tempTokenList = [...tokensList];
        tempTokenList.map((token) => {
          if (Object.keys(res).length > 0 && token.name === selectedToken.name) {
            token.address = address;
          }
          return token;
        });
        setTokensList(tempTokenList);
      }

    }
  }

  useEffect(() => {
    let isCancelled = false;
    const getTokenAddress = () => {
      if (account && !isCancelled) {
        const tempTokenList = [...tokensList];
        tempTokenList.map(async (token) => {
          const res = await library.contract.methods.getAddress(account, token.name).call();
          token.address = res;
          return token;
        });
        setTokensList(tempTokenList);
      }
    }


    getTokenAddress();

    return () => {
      isCancelled = true;
    }
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
        grid={{ gutter: 8, xs: 2 }}
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