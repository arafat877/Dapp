/* eslint-disable react-hooks/exhaustive-deps */
import { useWeb3React } from '@web3-react/core';
import { Avatar, Tabs } from 'antd';
import Meta from 'antd/lib/card/Meta';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import config from '../../utils/config';
import { StyledTabs, TokenCard } from '../withdraw/style';
import LoadingIndicator from './../../components/loadingIndicator/index';
import { collapsedState } from './../../utils/recoilStates';
import { DepositWrapper } from './style';


const Deposit = () => {
  const { account, chainId } = useWeb3React();

  const [tokensList, setTokensList] = useState([]);

  const [selectedToken, setSelectedToken] = useState(0);

  const collapsed = useRecoilValue(collapsedState);

  const history = useHistory();

  useEffect(() => {
    let stale = false;

    const getTokensList = async () => {

      const params = history.location.state;

      if (params && params.token) {
        setSelectedToken(params.token.toString());
      }

      let tokensListTemp = [...config.tokens];

      if (!stale) {
        setTokensList(tokensListTemp);
      }
    };

    getTokensList();

    return () => {
      stale = true;
    };
  }, [account, chainId]);


  const onChangeToken = (value) => {
    setSelectedToken(value);
  };

  if (tokensList.length === 0) return <LoadingIndicator />;

  return (

    <StyledTabs defaultActiveKey={selectedToken} tabPosition={collapsed ? 'top' : 'left'} onChange={onChangeToken} type="card">
      {tokensList.map((tkn) => (
        <Tabs.TabPane
          tab={
            <TokenCard>
              <Meta avatar={<Avatar src={tkn.image} size="small" />} title={tkn.name} />
            </TokenCard>
          }
          key={tkn.id}
        >
          <DepositWrapper>
            Coming soon...
					</DepositWrapper>
        </Tabs.TabPane>
      ))}
    </StyledTabs>

  );
};

export default Deposit;
