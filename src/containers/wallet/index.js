import { formatEther } from "@ethersproject/units";
import { useWeb3React } from '@web3-react/core';
import { Table } from 'antd';
import React from 'react';
import { Grid, Row } from 'react-flexbox-grid';

// Column of table
const columns = [
  {
    title: 'From',
    dataIndex: 'from',
    key: 'from'
  },
  {
    title: 'To',
    dataIndex: 'to',
    key: 'to'
  },
  {
    title: 'Amount',
    dataIndex: 'balance',
    key: 'balance',
    render: (value) => {
      // Parsing the balance into ether format
      const bal = parseFloat(formatEther(value)).toPrecision(4);
      return `ETH ${bal}`;
    }
  }
]

const Wallet = () => {

  const context = useWeb3React();
  const {
    library,
    chainId,
    account,
  } = context;

  // State to set transactions
  const [transactions, setTransactions] = React.useState([]);

  // Get transactions when component mounts
  // TODO: change promise to async await
  React.useEffect(() => {
    if (library && account) {
      let transactions = [];
      library
        .getBlockNumber().then(blockNumber => {
          for (let i = blockNumber; i > 0; i--) {
            // eslint-disable-next-line no-loop-func
            library.getBlock(i).then(block => {
              if (block.transactions.length > 0) {
                block.transactions.forEach((async (trans) => {
                  let tx = await library.getTransaction(trans);
                  if (account === tx.to || account === tx.from) {
                    transactions = [...transactions, {
                      key: tx.blockHash,
                      from: tx.from,
                      to: tx.to,
                      balance: tx.value
                    }];

                    setTransactions(transactions);
                  }
                }));
              }
            });
          }
        })
      return () => {
        setTransactions(undefined);
      };
    }
  }, [library, account, chainId]);

  return (<Grid fluid>
    <Row>
      <Table columns={columns} dataSource={transactions} />
    </Row>
  </Grid>);
}

export default Wallet;