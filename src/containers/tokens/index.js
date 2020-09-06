/* eslint-disable react-hooks/exhaustive-deps */
import { useWeb3React } from '@web3-react/core';
import { Table } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import React, { useEffect, useState } from 'react';
import { TokenTableContainer } from './style';

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
    render: (text, tkn) => {
      return <>{`${text} ${tkn.symbol.split("t")[1]}`}</>
    }
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

  return (
    <TokenTableContainer>
      {tokensList.length > 0 && <Table columns={columns} type="fixed" dataSource={tokensList} pagination={false} scroll={{ x: 250 }} />}
    </TokenTableContainer>
  );
}

export default Tokens;