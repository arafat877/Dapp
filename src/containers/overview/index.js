/* eslint-disable react-hooks/exhaustive-deps */
import { formatEther } from '@ethersproject/units';
import { useWeb3React } from '@web3-react/core';
import { Button, Col, Row, Spin } from 'antd';
import moment from 'moment-timezone';
import React, { useEffect, useState } from 'react';
import { LIVE_THRM_PRICE_URL } from '../../utils/config';
import { useThirmContract } from './../../hooks/index';
import { formatFrontBackBalance } from './../../utils/helpers';
import { ethereumChartInitialOptions } from './chartOptions';
import { LeftSideCard, OverviewCard, RightSideCard, StyledReactApexChart } from './style';

const OverView = () => {
	const { library, account } = useWeb3React();

	const [ethBalance, setEthBalance] = useState(0.0);

	const [thrmBalance, setThrmBalance] = useState(0.0);

	const [tokenOwned, setTokenOwned] = useState(0.0);

	const [thirmValue, setThirmValue] = useState(0.0);

	const [transactionCount, setTransactionCount] = useState(0);

	const [ethereumChartSeriesData, setEthereumChartSeriesData] = useState([]);

	const [ethereumChartSeriesDate, setEthereumChartSeriesDate] = useState([]);

	const [ethereumChartOptions, setEthereumChartOptions] = useState();

	const thirmContract = useThirmContract();

	useEffect(() => {
		const getThirmValue = async () => {
			const res = await fetch(LIVE_THRM_PRICE_URL, {
				method: 'POST',
				body: JSON.stringify({ query: `query { token(id : "0xa93f2a6b50d92bd64848f5ea15164f558b75ce9c"){ id derivedETH tradeVolume txCount totalLiquidity untrackedVolumeUSD} }` }),
				headers: { 'Content-Type': 'application/json' },
			}).then((res) => res.json());

			const { derivedETH, txCount } = res.data.token;

			setThirmValue(derivedETH);
			setTransactionCount(txCount);
		};

		getThirmValue();
	}, []);

	useEffect(() => {
		let stale = false;

		const getTokenBalances = async () => {
			const balance = formatEther(await library.getBalance(account));

			if (!stale) {
				setEthBalance(balance);
			}

			const thrmBal = await thirmContract.balanceOf(account);

			if (thrmBal) {
				setThrmBalance(formatEther(thrmBal));
			}

			const totalSupply = await thirmContract.totalSupply();
			let tokenOwned = parseFloat((parseFloat(thrmBal).toFixed(8) / totalSupply) * 100);
			if (isNaN(tokenOwned)) tokenOwned = parseFloat(0.0);

			if (!stale) {
				setTokenOwned(tokenOwned.toFixed(8));
			}
		};

		getTokenBalances();

		return () => {
			stale = true;
		};
	}, [account, library]);

	useEffect(() => {
		let stale = false;

		setEthereumChartOptions(ethereumChartInitialOptions);

		const getRealTimeEthBalance = async () => {
			let ethBalances = [];
			const limit = 10;
			let ethereumChartSeriesDataTemp = ethereumChartSeriesData;

			try {
				const res = await fetch(LIVE_THRM_PRICE_URL, {
					method: 'POST',
					body: JSON.stringify({ query: `{ tokenDayDatas( last: ${limit} where: { token: "0xa93f2a6b50d92bd64848f5ea15164f558b75ce9c"}) { id priceUSD } }` }),
					headers: { 'Content-Type': 'application/json' },
				}).then((res) => res.json());

				ethBalances = res.data.tokenDayDatas;

			} catch (e) {
				console.log(e);
			}
			if (ethBalances.length > 0) {
				ethBalances.map((usd) => {
					ethereumChartSeriesDataTemp.push(usd.priceUSD);
					return usd;
				})
			}
			if (ethereumChartSeriesDataTemp.length < limit) {
				for (let i = ethereumChartSeriesDataTemp.length; i < limit; i++) {
					ethereumChartSeriesDataTemp.unshift(0);
				}
			}

			let ethereumChartSeriesDateTemp = ethereumChartSeriesDate;
			for (let i = 0; i < limit; i++) {
				const day = moment().tz("Asia/Hong_Kong").subtract(i, 'days');
				ethereumChartSeriesDateTemp.push(day.format("D MMM"));
			}

			ethereumChartSeriesDateTemp = ethereumChartSeriesDateTemp.reverse();

			ethereumChartSeriesDataTemp = ethereumChartSeriesDataTemp.reverse().slice(0, limit).reverse();

			if (!stale) {
				setEthereumChartSeriesData(ethereumChartSeriesDataTemp);
				setEthereumChartSeriesDate(ethereumChartSeriesDateTemp);
			}
		};

		getRealTimeEthBalance();
		return () => {
			stale = true;
		};
	}, []);


	const [thrmBalanceFront, thrmBalanceEnd] = formatFrontBackBalance(thrmBalance);

	const [ethBalanceFront, ethBalanceEnd] = formatFrontBackBalance(ethBalance);

	const [thrmValueFront, thrmValueEnd] = formatFrontBackBalance(thirmValue);

	const [tokenOwnedFront, tokenOwnedEnd] = formatFrontBackBalance(tokenOwned);

	return (
		<Row gutter={24}>
			<Col xs={24} xl={8}>
				<LeftSideCard>
					<p className="card-text balance-unit">ETH</p>
					<p className="card-number">
						<span className="balance-front">{ethBalanceFront}</span>
						<span className="balance-end">{`.${ethBalanceEnd}`}</span>
					</p>

					<p className="card-text balance-unit">THRM</p>
					<p className="card-number">
						<span className="balance-front">{thrmBalanceFront}</span>
						<span className="balance-end">{`.${thrmBalanceEnd}`}</span>
					</p>

					<p className="card-text">Thirm Protocol Ownership</p>
					<p className="card-number">
						<span className="balance-front">{tokenOwnedFront}</span>
						<span className="balance-end">{`.${tokenOwnedEnd} %`}</span>
					</p>
				</LeftSideCard>
				<LeftSideCard>
					<p className="card-text balance-unit">1 THRM </p>
					<p className="card-number">
						<span className="balance-front">{thrmValueFront}</span>
						<span className="balance-end">{`.${thrmValueEnd}`} ETH</span>
					</p>

					<p className="card-text">Transactions</p>
					<p className="card-number">
						<span className="balance-front">{transactionCount}</span>
					</p>
				</LeftSideCard>

				<OverviewCard target="_blank" href="https://app.uniswap.org/#/swap?outputCurrency=0xa93f2a6b50d92bd64848f5ea15164f558b75ce9c">
					<Button type="primary">Uniswap</Button>
				</OverviewCard>

				<OverviewCard target="_blank" href="https://etherscan.io/token/0xa93f2a6b50d92bd64848f5ea15164f558b75ce9c">
					<Button type="primary">EtherScan</Button>
				</OverviewCard>
			</Col>
			<Col xs={24} xl={16}>
				<RightSideCard>
					<h3 className="card-text">THRM Price</h3>
					{ethereumChartSeriesData.length > 0 ? (
						<StyledReactApexChart
							options={{
								...ethereumChartOptions, labels: ethereumChartSeriesDate,
							}}
							series={[
								{
									name: 'USDT',
									data: ethereumChartSeriesData,
								},
							]}
							type="area"
							height={305}
						/>) : <div className="loading-chart"><Spin size="large" /></div>
					}
				</RightSideCard>

				<iframe title="discord" src="https://discord.com/widget?id=712795894982115380&theme=dark" width="100%" height="350" frameborder="0" sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"></iframe>
			</Col>
		</Row>
	);
};

export default OverView;
