/* eslint-disable react-hooks/exhaustive-deps */
import { ExportOutlined, ImportOutlined } from '@ant-design/icons';
import { formatEther } from '@ethersproject/units';
import { useWeb3React } from '@web3-react/core';
import { Avatar, Button, Card, Col, List, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import config from '../../utils/config';
import { getThirmTokenContract } from "../../utils/helpers";
import { StyledCard } from '../globalStyle';
import LoadingIndicator from './../../components/loadingIndicator/index';
import { BalanceWrapper } from './style';

const { Meta } = Card;

const Balance = () => {
  const { account, library, chainId } = useWeb3React();

  const [tokensList, setTokensList] = useState([]);

  useEffect(() => {
    let stale = false;

    const getTokensList = async () => {

      let tokensListTemp = [...config.tokens];

      try {

        tokensListTemp = await Promise.all(
          tokensListTemp.map(async (token) => {
            token.balance = (0).toFixed(8);
            try {
              const tokenContract = getThirmTokenContract(library, account, token.address);

              const balance = formatEther(await tokenContract.balanceOf(account)).toFixed(8);
              token.balance = balance;
            } catch (e) {
              console.log(e);
            }

            return token;
          })
        );

      } catch (e) {
        console.log(e);
      }

      if (!stale) {
        setTokensList(tokensListTemp);
      }
    };

    getTokensList();

    return () => {
      stale = true;
    };
  }, [account, chainId]);


  if (tokensList.length === 0) return <LoadingIndicator />;

  return (
    <BalanceWrapper>
      <Row gutter={24}>
        <Col xs={24}>
          <List
            grid={{
              gutter: 24, xs: 1,
              sm: 2,
              md: 2,
              lg: 2,
              xl: 3,
              xxl: 4,
            }}
            dataSource={tokensList}
            renderItem={item => (
              <List.Item>
                <StyledCard
                  width={300}
                  actions={[
                    <Link to={{ pathname: '/deposit', state: { token: item.id } }}>
                      <Button type="link" block icon={<ImportOutlined />}>
                        Deposit
                  </Button>
                    </Link>
                    ,
                    <Link to={{ pathname: '/withdraw', state: { token: item.id } }}>
                      <Button type="link" block icon={<ExportOutlined />}>
                        Withdraw
                  </Button>
                    </Link>,
                  ]}
                >
                  <Meta
                    avatar={<Avatar src={item.image} />}
                    title={item.coin}
                    description={
                      <div className="coin-description">
                        <p className="coin-balance">{item.balance}</p>
                        <ul className="external-links">
                          <li>
                            <a href={`https://etherscan.io/token/${item.address}`}>
                              Etherscan
                        </a>
                          </li>
                          <li>
                            <a href={`https://uniswap.info/token/${item.address}`}>
                              Uniswap
                        </a>
                          </li>
                        </ul>
                      </div>
                    }
                  />

                </StyledCard>
              </List.Item>
            )}
          />

        </Col>
      </Row>
    </BalanceWrapper>
  );
};

export default Balance;
