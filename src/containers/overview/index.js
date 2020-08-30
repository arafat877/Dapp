import { formatEther } from "@ethersproject/units";
import { useWeb3React } from '@web3-react/core';
import React from 'react';
import { Grid, Row } from 'react-flexbox-grid';

const OverView = () => {

  const context = useWeb3React();
  const {
    library,
    chainId,
    account,
  } = context;

  // State to set the ether balance
  const [ethBalance, setEthBalance] = React.useState();

  // Get balance when component mounts
  // TODO: change promise to async await
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

  return (<Grid fluid>
    <Row>
      <p>
        {ethBalance === undefined
          ? "..."
          : ethBalance === null
            ? "Error"
            : `Ether ${parseFloat(formatEther(ethBalance)).toPrecision(4)}`}
      </p>

    </Row>
  </Grid>);
}

export default OverView;