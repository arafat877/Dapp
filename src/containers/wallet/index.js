import { formatEther } from "@ethersproject/units";
import { useWeb3React } from '@web3-react/core';
import React from 'react';

const Wallet = () => {

  const context = useWeb3React();
  const {
    library,
    chainId,
    account,
  } = context;

  const [blockNumber, setBlockNumber] = React.useState();
  const [transactions, setTransactions] = React.useState([]);

  React.useEffect(() => {
    if (library && account) {
      let transactions = [];
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

      return () => {
        setTransactions(undefined);
      };
    }
  }, [library, account, chainId, blockNumber]);

  const [ethBalance, setEthBalance] = React.useState();
  React.useEffect(() => {
    if (library && account) {
      let stale = false;

      library
        .getBalance(account)
        .then(balance => {
          if (!stale) {
            setEthBalance(balance);
          }
        })
        .catch(() => {
          if (!stale) {
            setEthBalance(null);
          }
        });

      return () => {
        stale = true;
        setEthBalance(undefined);
      };
    }
  }, [library, account, chainId]);

  // set up block listener
  React.useEffect(() => {
    if (library) {
      let stale = false;
      library
        .getBlockNumber()
        .then(blockNumber => {
          if (!stale) {
            setBlockNumber(blockNumber);
          }
        })
        .catch(() => {
          if (!stale) {
            setBlockNumber(null);
          }
        });

      const updateBlockNumber = blockNumber => {
        setBlockNumber(blockNumber);
      };
      library.on("block", updateBlockNumber);

      return () => {
        library.removeListener("block", updateBlockNumber);
        stale = true;
        setBlockNumber(undefined);
      };
    }
  }, [library, chainId]);

  return (<div>
    <p>
      {account === undefined
        ? "..."
        : account === null
          ? "None"
          : `${account}`}
    </p>
    <p>
      {ethBalance === undefined
        ? "..."
        : ethBalance === null
          ? "Error"
          : `Ether ${parseFloat(formatEther(ethBalance)).toPrecision(4)}`}
    </p>
    <p>
      {blockNumber === undefined
        ? "..."
        : blockNumber === null
          ? "Error"
          : blockNumber.toLocaleString()}
    </p>

    <table className="transaction-table">
      <thead>
        <tr>
          <th>From</th>
          <th>To</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        {transactions && transactions.map((trans) => (
          <tr>
            <td>
              {trans.from}
            </td>
            <td>{trans.to}</td>
            <td>
              {`Ether ${parseFloat(formatEther(trans.balance)).toPrecision(4)}`}</td>
          </tr>
        ))}
      </tbody>
    </table>


  </div>);
}

export default Wallet;