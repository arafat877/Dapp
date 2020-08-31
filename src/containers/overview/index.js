import { formatEther } from "@ethersproject/units";
import { useWeb3React } from '@web3-react/core';
import { Col } from 'antd';
import React from 'react';
import { Grid, Row } from 'react-flexbox-grid';
import { injected } from '../../hooks/connectors';
import { walletlink } from './../../hooks/connectors';

const OverView = (props) => {

  const context = useWeb3React();
  const {
    library,
    chainId,
    account,
    connector
  } = context;

  let connectionType = "";
  if (connector === injected) {
    connectionType = "Meta Mask";
  } else if (connector === walletlink) {
    connectionType = "Wallet Link";
  }

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
      <Col>
        <h4>Connected to {connectionType}</h4>
        <p>
          {ethBalance === undefined
            ? "..."
            : ethBalance === null
              ? "Error"
              : `Ether ${parseFloat(formatEther(ethBalance)).toPrecision(4)}`}
        </p>
      </Col>
    </Row>
  </Grid>);
}

export default OverView;