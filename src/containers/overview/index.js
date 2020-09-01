import { formatEther } from "@ethersproject/units";
import { useWeb3React } from '@web3-react/core';
import { Col, Row } from 'antd';
import React from 'react';

const OverView = (props) => {

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


  return (
    <Row>
      <Col xs={24}>
        <p>
          {ethBalance === undefined
            ? "..."
            : ethBalance === null
              ? "Error"
              : `Ether ${parseFloat(formatEther(ethBalance)).toPrecision(4)}`}
        </p>
      </Col>
    </Row>
  );
}

export default OverView;