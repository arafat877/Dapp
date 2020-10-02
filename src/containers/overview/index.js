/* eslint-disable react-hooks/exhaustive-deps */
import { formatEther } from '@ethersproject/units';
import { useWeb3React } from '@web3-react/core';
import { Button, Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { LIVE_ETH_PRICE_URL } from '../../utils/config';
import { formatFrontBackBalance } from './../../utils/helpers';
import { ethereumChartInitialOptions } from './chartOptions';
import { DiscordBox, LeftSideCard, OverviewCard, RightSideCard, StyledReactApexChart } from './style';

const OverView = () => {
	const { library, account } = useWeb3React();

	const [ethBalance, setEthBalance] = useState(0.0);

	const [thrmBalance, setThrmBalance] = useState(0.0);

	const [tokenOwned, setTokenOwned] = useState(0.0);

	const [thirmValue, setThirmValue] = useState(0.0);
	const [transactionCount, setTransactionCount] = useState(0);

	const [ethereumChartSeriesData, setEthereumChartSeriesData] = useState([]);

	const [ethereumChartOptions, setEthereumChartOptions] = useState();

	useEffect(() => {


		const getThirmValue = async () => {
			const res = await fetch("https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2", {
				method: "POST",
				body: JSON.stringify({ query: `query { token(id : "0xa93f2a6b50d92bd64848f5ea15164f558b75ce9c"){ id derivedETH tradeVolume txCount totalLiquidity } }` }),
				headers: { 'Content-Type': 'application/json' }
			}).then((res) => res.json());

			const { derivedETH, txCount } = res.data.token;

			setThirmValue(derivedETH);
			setTransactionCount(txCount);
		}

		getThirmValue();

	}, []);

	useEffect(() => {
		let stale = false;

		const getTokenBalances = async () => {

			const balance = formatEther(await library.getBalance(account));

			if (!stale) {
				setEthBalance(balance);
			}

			const thrmBal = await library.thirm.methods.balanceOf(account).call();

			if (thrmBal) {
				setThrmBalance(formatEther(thrmBal));
			}

			const totalSupply = await library.thirm.methods.totalSupply().call();
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

			const ethJson = await fetch(LIVE_ETH_PRICE_URL).then((res) => res.json());
			const ethBalance = ethJson.price;
			let ethereumChartSeriesDataTemp = ethereumChartSeriesData;

			if (ethereumChartSeriesData.length === 0) {
				ethereumChartSeriesDataTemp = Array(50).fill(ethBalance);
			}
			ethereumChartSeriesDataTemp.reverse().unshift(ethBalance);
			ethereumChartSeriesDataTemp = ethereumChartSeriesDataTemp.slice(0, 50).reverse();

			if (!stale) {
				setEthereumChartSeriesData(ethereumChartSeriesDataTemp);
			}
		};
		const checkEthBalance = setInterval(() => {
			getRealTimeEthBalance();
		}, 3000);

		return () => {
			clearInterval(checkEthBalance);
			stale = true;
		};
	}, [ethereumChartSeriesData.length]);

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

				<OverviewCard href="https://app.uniswap.org/#/swap?outputCurrency=0xa93f2a6b50d92bd64848f5ea15164f558b75ce9c">
					<Button type="primary">Uniswap</Button>
				</OverviewCard>

				<OverviewCard href="https://etherscan.io/token/0xa93f2a6b50d92bd64848f5ea15164f558b75ce9c">
					<Button type="primary">EtherScan</Button>
				</OverviewCard>
			</Col>
			<Col xs={24} xl={16}>
				<RightSideCard>
					<h3 className="card-text">Ethereum Price</h3>
					{
						ethereumChartOptions && <StyledReactApexChart
							options={ethereumChartOptions}
							series={[
								{
									name: 'USDT',
									data: ethereumChartSeriesData,
								},
							]}
							type="line"
							height={305}
						/>
					}


				</RightSideCard>

				<DiscordBox>
					<iframe title="discord" src="https://discord.com/widget?id=712795894982115380&theme=dark" width="100%" height="350" frameborder="0" sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"></iframe>
				</DiscordBox>

			</Col>
		</Row>
	);
};

export default OverView;
