/* eslint-disable react-hooks/exhaustive-deps */
import { useWeb3React } from '@web3-react/core';
import { Table } from 'antd';
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
  }
];

const Tokens = () => {

  const { chainId } = useWeb3React();

  const [tokensList, setTokensList] = useState([]);

  const getTokenFromURL = async () => {
    if (!chainId) return;
    const url = 'https://raw.githubusercontent.com/thirmprotocol/Assets/master/data.json';
    const jsonRes = await fetch(url)
      .then(res => res.json());

    let tokensListTemp = jsonRes.tokens;


    tokensListTemp = tokensListTemp.filter((tkn) => tkn.chainId === chainId);


    tokensListTemp.map((tkn) => {
      tkn.key = tkn.name;
      return tkn;
    });

    setTokensList(tokensListTemp);
  }

  useEffect(() => {
    getTokenFromURL();
  }, [chainId]);


  return (
    <>{tokensList.length > 0 && <Table type="fixed" columns={columns} dataSource={tokensList} pagination={false} />}</>
  );
}

export default Tokens;