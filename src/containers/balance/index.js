import Icon from '@ant-design/icons';
import { formatEther } from '@ethersproject/units';
import { useWeb3React } from '@web3-react/core';
import { Avatar, Button, Card, Col, List, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as depositSvg } from '../../assets/icons/deposit.svg';
import { ReactComponent as withdrawSvg } from '../../assets/icons/withdraw.svg';
import config from '../../utils/config';
import { getThirmTokenContract } from '../../utils/helpers';
import LoadingIndicator from './../../components/loadingIndicator/index';
import { formatFrontBackBalance } from './../../utils/helpers';
import { BalanceWrapper, StyledTTokenReactApexChart, TTokenCard, TTokenTitle } from './style';
import { tTokenChartOptions } from './tTokenChartOptions';

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
						token.totalSupply = 0;
						token.chartData = [];

						const tokenContract = getThirmTokenContract(library, account, token.address);
						const balance = await tokenContract.balanceOf(account);
						token.balance = parseFloat(formatEther(balance)).toFixed(8);

						const totalSupply = await tokenContract.totalSupply();

						token.totalSupply = parseInt(formatEther(totalSupply));

						return token;
					})
				);
			} catch (e) {
				console.log(e);
			}

			if (!stale) {
				setTokensList(tokensListTemp);
			}
			try {
				tokensListTemp = await Promise.all(
					tokensListTemp.map(async token => {
						const chartRes = await fetch('https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2', {
							method: 'POST',
							body: JSON.stringify({ query: `{ tokenDayDatas( last: 30 where: { token: "${token.address}"}) { id priceUSD } }` }),
							headers: { 'Content-Type': 'application/json' },
						}).then((res) => res.json());

						const tTokenChartData = chartRes.data.tokenDayDatas;
						const ethereumChartSeriesDataTemp = [];
						tTokenChartData.map((usd) => {
							ethereumChartSeriesDataTemp.push(usd.priceUSD);
							return usd;
						});

						token.chartData = ethereumChartSeriesDataTemp;
						return token;
					}));

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
	}, [account, chainId, library]);

	if (tokensList.length === 0) return <LoadingIndicator />;

	return (
		<BalanceWrapper>
			<Row gutter={24}>
				<Col xs={24}>
					<List
						grid={{
							gutter: 36,
							xs: 1,
							sm: 2,
							md: 2,
							lg: 2,
							xl: 3,
							xxl: 4,
						}}
						dataSource={tokensList}
						renderItem={(item) => {
							const [ethBalanceFront, ethBalanceEnd] = formatFrontBackBalance(item.balance);
							return (
								<List.Item>
									<TTokenCard
										width={300}
										title={
											<TTokenTitle>
												<Avatar src={item.image} />
												<h3>{item.name}</h3>
											</TTokenTitle>
										}
										extra={
											<ul className="external-links">
												<li>
													<a href={`https://etherscan.io/token/${item.address}`}>Etherscan</a>
												</li>
												<li>
													<a href={`https://uniswap.info/token/${item.address}`}>Uniswap</a>
												</li>
											</ul>
										}
										actions={[
											<Link to={{ pathname: '/deposit', state: { token: item.id } }}>
												<Button type="link" block icon={<Icon component={depositSvg} style={{ fontSize: 18 }} />}>
													Deposit
											</Button>
											</Link>,
											<Link to={{ pathname: '/withdraw', state: { token: item.id } }}>
												<Button type="link" block icon={<Icon component={withdrawSvg} style={{ fontSize: 18 }} />}>
													Withdraw
											</Button>
											</Link>,
										]}
									>
										<Meta
											description={
												<div className="coin-description">
													<div className="coin-balance">
														<p className="balance-unit">
															PRICE
														</p>
														<span className="balance-front">{ethBalanceFront}</span>
														<span className="balance-end">{`.${ethBalanceEnd}`}</span>
													</div>
													<div className="coin-balance">
														<p className="balance-unit">
															TOTAL SUPPLY
														</p>
														<span className="balance-end">{item.totalSupply}</span>
													</div>
												</div>
											}
										/>
										{
											item.chartData.length > 0 && <Meta
												title={
													<StyledTTokenReactApexChart
														options={{
															...tTokenChartOptions,
														}}
														series={[
															{
																name: item.name,
																data: item.chartData,
															},
														]}
														type="line"
														height={150}
													/>
												}
											/>
										}
									</TTokenCard>
								</List.Item>
							)
						}}
					/>
				</Col>
			</Row>
		</BalanceWrapper>
	);
};

export default Balance;
