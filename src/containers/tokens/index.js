/* eslint-disable react-hooks/exhaustive-deps */
import { useWeb3React } from '@web3-react/core';
import { Button, Col, Row, Table } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import React, { useEffect, useState } from 'react';

const columns = [
  {
    title: 'Token',
    dataIndex: 'logoURI',
    key: 'logoURI',
    render: (text) => {
      return <Avatar src={text} />
    }
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Symbol',
    dataIndex: 'symbol',
    key: 'symbol',
  },
  {
    title: 'Chain ID',
    dataIndex: 'chainId',
    key: 'chainId',
  },
  {
    title: 'Decimals',
    dataIndex: 'decimals',
    key: 'decimals',
  },
  {
    title: 'Address',
    key: 'address',
    dataIndex: 'address',
  },
  {
    title: 'Value',
    key: 'value',
    dataIndex: 'value',
  }
];

const TOKEN_LIST_URL = "https://raw.githubusercontent.com/thirmprotocol/Assets/master/data.json";

const Tokens = () => {

  const { chainId, account, library } = useWeb3React();

  const [tokensList, setTokensList] = useState([]);

  useEffect(() => {
    let isCancelled = false;
    const getTokenInformation = async () => {
      if (!chainId) return;

      const jsonRes = await fetch(TOKEN_LIST_URL)
        .then(res => res.json());

      if (!isCancelled) {

        let tokensListTemp = jsonRes.tokens;
        tokensListTemp = tokensListTemp.filter((tkn) => tkn.chainId === chainId).map((tkn) => {
          tkn.key = tkn.name;
          tkn.value = null;
          return tkn;
        });

        tokensListTemp = await Promise.all(tokensListTemp.map(async (tkn) => {
          const res = await library.contract.methods.getTToken(tkn.symbol).call();
          if (res) {
            tkn.value = library.web3.utils.fromWei(res, 'ether').toString();
          }
          return tkn;
        }));

        setTokensList(tokensListTemp);
      }
    }

    getTokenInformation();
    return () => {
      isCancelled = true;
    }
  }, [chainId, account]);

  const setTokenValue = async () => {
    if (account) {
      // chanmge value for testing here...
      await library.contract.methods.setTToken('tBTC', library.web3.utils.toWei('1.001', 'ether')).send({ from: account });
    }
  }

  return (
    <>
      <Row>
        <Col xs={24}>
          <Button type="primary" onClick={setTokenValue}>Set Balance for tBTC</Button>
        </Col>
        <Col xs={24}>
          {tokensList.length > 0 && <Table type="fixed" columns={columns} dataSource={tokensList} pagination={false} />}
        </Col>
      </Row>
    </>
  );
}

export default Tokens;