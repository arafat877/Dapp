import { formatEther } from "@ethersproject/units";
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

  // State to set transactions
  const [transactions] = React.useState([{ to: "...", from: "...", key: "001", balance: 0 }]);


  return (<Grid fluid>
    <Row>
      <Table columns={columns} dataSource={transactions} />
    </Row>
  </Grid>);
}

export default Wallet;