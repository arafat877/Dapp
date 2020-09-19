/* eslint-disable react-hooks/exhaustive-deps */
import { formatEther } from '@ethersproject/units';
import { useWeb3React } from '@web3-react/core';
import { Col, Row } from 'antd';
import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { LIVE_ETH_PRICE_URL } from '../../utils/config';
import { getErrorMessage } from './../../hooks/index';
import { chartOptions, ethereumChartOptions } from './chartOptions';
import { AvatarIcon, ConnectorButton, ErrorAlert, LeftSideCard, LoginInfo, StyledBalance } from './style';

const MetaMaskIcon = require('../../assets/images/metamask.png');
const WalletLinkIcon = require('../../assets/images/qr-code.png');
const WalletConnectIcon = require('../../assets/images/wallet-connect.png');

const OverView = (props) => {
	const { library, account, active, error } = useWeb3React();
	const { connectorsByName, activate, setActivatingConnector } = props;

	// State to set the ether balance
	const [ethBalance, setEthBalance] = useState(0.0);

	const [thrmBalance, setThrmBalance] = useState(0.0);

	const [tokenOwned, setTokenOwned] = useState(0);

	const [chartSeriesData] = useState([2.3, 3.4, 9.0, 9.1, 8.3, 8.7, 5.6]);

	const [ethereumChartSeriesData, setEthereumChartSeriesData] = useState([]);

	// Get balance when component mounts
	React.useEffect(() => {
		let stale = false;

		const getBalances = async () => {
			if (library && account) {
				library
					.getBalance(account)
					.then((balance) => {
						if (!stale) {
							setEthBalance(balance);
						}
					})
					.catch(() => {
						if (!stale) {
							setEthBalance(null);
						}
					});

				const thrmBalance = await library.thirm.methods.balanceOf(account).call();
				if (thrmBalance) {
					setThrmBalance(thrmBalance);
				}
			}
		};

		const getTotalSupply = async () => {
			if (library) {
				const totalSupply = await library.thirm.methods.totalSupply().call();
				const tokenOwned = parseFloat((thrmBalance / totalSupply) * 100).toFixed(8);
				setTokenOwned(tokenOwned);
			}
		};

		/*
		const getEthBalances = async () => {
			if (library && account) {
				const lastBlock = await library.web3.eth.getBlockNumber();

				const chartBalances = [];
				for (let i = lastBlock - 2; i < lastBlock; i++) {
					let bal = await library.web3.eth.getBalance(account, i);
					bal = parseFloat(library.web3.utils.fromWei(bal, 'ether')).toFixed(8);
					chartBalances.push(bal);
				}
				if (!stale) {
					setChartSeriesData(chartBalances);
				}
			}
		}
		getEthBalances();
		*/

		getBalances();
		getTotalSupply();

		return () => {
			stale = true;
			setEthBalance(undefined);
		};
	}, [account, library]);

	React.useEffect(() => {
		let stale = false;

		const getRealTimeEthBalance = async () => {
			const ethJson = await fetch(LIVE_ETH_PRICE_URL).then((res) => res.json());
			const ethBalance = ethJson.price;
			let ethereumChartSeriesDataTemp = ethereumChartSeriesData;

			if (ethereumChartSeriesData.length === 0) {
				ethereumChartSeriesDataTemp = Array(100).fill(ethBalance);
			}
			ethereumChartSeriesDataTemp.unshift(ethBalance);
			ethereumChartSeriesDataTemp = ethereumChartSeriesDataTemp.slice(0, 100);
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
			setEthBalance(undefined);
		};
	}, [ethereumChartSeriesData.length]);

	const ethBalanceUnit = 'ETH';
	let ethbalanceFront = '';
	let ethBalanceEnd = '';
	if (ethBalance !== null && ethBalance !== undefined) {
		const balanceSplit = parseFloat(formatEther(ethBalance)).toFixed(8).toString().split('.');
		ethbalanceFront = balanceSplit[0];
		ethBalanceEnd = balanceSplit[1];
	}

	const thrmBalanceUnit = 'THRM';
	let thrmbalanceFront = '';
	let thrmBalanceEnd = '';
	if (thrmBalance !== null && thrmBalance !== undefined) {
		const balanceSplit = parseFloat(formatEther(thrmBalance)).toFixed(8).toString().split('.');
		thrmbalanceFront = balanceSplit[0];
		thrmBalanceEnd = balanceSplit[1];
	}

	const activateWallet = async (currentConnector, name) => {
		setActivatingConnector(currentConnector);
		await activate(connectorsByName[name]);
		window.localStorage.setItem('wallet', name);
	};

	if (!active) {
		return (
			<Row>
				<Col xs={24}>
					<LoginInfo>Connect with your wallet</LoginInfo>
				</Col>
				<Col xs={24}>
					<Row gutter={4}>
						{connectorsByName &&
							Object.keys(connectorsByName).map((name) => {
								const currentConnector = connectorsByName[name];
								return (
									<Col>
										{name === 'Injected' && (
											<ConnectorButton
												key={name}
												onClick={() => {
													activateWallet(currentConnector, name);
												}}
											>
												<AvatarIcon src={MetaMaskIcon} />
												<p>Metamask</p>
											</ConnectorButton>
										)}
										{name === 'walletlink' && (
											<ConnectorButton
												type="secondary"
												key={name}
												onClick={() => {
													activateWallet(currentConnector, name);
												}}
											>
												<AvatarIcon src={WalletLinkIcon} />
												<p>Wallet Link</p>
											</ConnectorButton>
										)}

										{name === 'walletConnect' && (
											<ConnectorButton
												type="secondary"
												key={name}
												onClick={() => {
													activateWallet(currentConnector, name);
												}}
											>
												<AvatarIcon src={WalletConnectIcon} />
												<p>Wallet Connect</p>
											</ConnectorButton>
										)}
									</Col>
								);
							})}
					</Row>
				</Col>
				<Col xs={12}>{!!error && <ErrorAlert message="Error" description={getErrorMessage(error)} type="error" showIcon />}</Col>
			</Row>
		);
	}

	return (
		<Row gutter={16}>
			<Col xs={24} xl={8}>
				<LeftSideCard>
					<StyledBalance>
						<p className="card-text balance-unit">{ethBalanceUnit}</p>
						<p className="card-number">
							<span className="balance-front">{ethbalanceFront}</span>
							<span className="balance-end">{`.${ethBalanceEnd}`}</span>
						</p>
					</StyledBalance>
					<StyledBalance>
						<p className="card-text balance-unit">{thrmBalanceUnit}</p>
						<p className="card-number">
							<span className="balance-front">{thrmbalanceFront}</span>
							<span className="balance-end">{`.${thrmBalanceEnd}`}</span>
						</p>
					</StyledBalance>
				</LeftSideCard>
				<LeftSideCard style={{ height: 150 }}>
					<p className="card-text">Thirm Protocol Ownership</p>
					<p className="card-number">{`${tokenOwned} %`}</p>
				</LeftSideCard>
			</Col>
			<Col xs={24} xl={16}>
				<LeftSideCard>
					<ReactApexChart
						options={chartOptions}
						series={[
							{
								name: 'Eth Balance',
								data: chartSeriesData,
							},
						]}
						type="area"
						height={350}
						width={500}
					/>
				</LeftSideCard>

				<LeftSideCard>
					<ReactApexChart
						options={ethereumChartOptions}
						series={[
							{
								name: 'Eth Balance',
								data: ethereumChartSeriesData,
							},
						]}
						type="line"
						height={350}
						width={500}
					/>
				</LeftSideCard>
			</Col>
		</Row>
	);
};

export default OverView;
