import { formatEther } from "@ethersproject/units";
import { useWeb3React } from '@web3-react/core';
import { Button, Col, Image, Row, Table } from 'antd';
import React from 'react';
import { AssetWrapper, PerformanceWrapper, StyledBalance } from './style';

const columns = [
  {
    title: 'All Assets',
    dataIndex: 'assets',
  },
  {
    title: 'Equity',
    dataIndex: 'equity',
    align: "right"
  }
];

const data = [
  {
    key: '1',
    assets: 'Ether',
    equity: 32
  },
  {
    key: '2',
    assets: 'Thirm',
    equity: 42,
  },
  {
    key: '3',
    assets: 'T Bitcoin',
    equity: 32
  },
];

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

  const balanceUnit = "ETH";

  let balanceFront = "";
  let balanceEnd = "";
  if (ethBalance !== null && ethBalance !== undefined) {
    const balanceSplit = parseFloat(formatEther(ethBalance)).toPrecision(5).toString().split('.');
    balanceFront = balanceSplit[0];
    balanceEnd = balanceSplit[1];
  }

  return (
    <Row>
      <Col xs={24}>
        <Row justify="space-between" align="middle">
          <Col xs={12}>
            <StyledBalance>
              {balanceFront && balanceEnd && <><span className="balance-unit">{balanceUnit}</span>
                <span className="balance-front">{balanceFront}</span>
                <span className="balance-end">{`.${balanceEnd}`}</span>
              </>}

            </StyledBalance>
          </Col>

          <Col xs={6}>
            <Row justify="end">
              <Button type="primary">QR CODE</Button>
            </Row>
          </Col>


          <Col xs={6}>
            <Row justify="end">
              <Button type="primary">View On Explorer</Button>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col sm={{ span: 24 }}>
            <PerformanceWrapper>
              <Image src="https://i.ibb.co/ydDtDTp/Capture.png" alt="Capture" border="0" />
            </PerformanceWrapper>
          </Col>
        </Row>
        <Row>
          <Col sm={{ span: 24 }}>
            <AssetWrapper>
              <h3>Assets</h3>
              <Table columns={columns} dataSource={data} size="middle" pagination={false} responsive="xs"
                showHeader={false}
                tableLayout="fixed" />
            </AssetWrapper>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default OverView;