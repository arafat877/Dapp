/* eslint-disable react-hooks/exhaustive-deps */
import { useWeb3React } from '@web3-react/core';
import { Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { LIVE_ETH_PRICE_URL } from '../../utils/config';
import { getErrorMessage } from './../../hooks/index';
import { formatFrontBackBalance } from './../../utils/helpers';
import { ethereumChartOptions } from './chartOptions';
import { AvatarIcon, ConnectorButton, ErrorAlert, LeftSideCard, LoginInfo, StyledBalance } from './style';

const MetaMaskIcon = require('../../assets/images/metamask.png');
const WalletLinkIcon = require('../../assets/images/qr-code.png');
const WalletConnectIcon = require('../../assets/images/wallet-connect.png');

const OverView = (props) => {

	const { library, account, active, error } = useWeb3React();

	const { connectorsByName, activate, setActivatingConnector } = props;

	const [ethBalance, setEthBalance] = useState(0.0);

	const [thrmBalance, setThrmBalance] = useState(0.0);

	const [tokenOwned, setTokenOwned] = useState(0);

	const [ethereumChartSeriesData, setEthereumChartSeriesData] = useState([]);

	useEffect(() => {

		let stale = false;

		const getTokenBalances = async () => {
			if (!account && !library) return;
			const balance = await library
				.getBalance(account);

			if (!stale) {
				setEthBalance(balance);
			}

			const thrmBal = await library.thirm.methods.balanceOf(account).call();
			if (thrmBal) {
				setThrmBalance(thrmBal);
			}

			const totalSupply = await library.thirm.methods.totalSupply().call();
			let tokenOwned = parseFloat((thrmBal / totalSupply) * 100).toFixed(8);
			if (isNaN(tokenOwned)) tokenOwned = parseFloat(0.0).toFixed(8);

			if (!stale) {
				setTokenOwned(tokenOwned);
			}
		};

		getTokenBalances();

		return () => {
			stale = true;
		};

	}, [account, library]);

	useEffect(() => {

		let stale = false;

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
			stale = true
		};

	}, [ethereumChartSeriesData.length]);

	const [thrmbalanceFront, thrmBalanceEnd] = formatFrontBackBalance(thrmBalance);

	const [ethbalanceFront, ethBalanceEnd] = formatFrontBackBalance(ethBalance);

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
						<p className="card-text balance-unit">ETH</p>
						<p className="card-number">
							<span className="balance-front">{ethbalanceFront}</span>
							<span className="balance-end">{`.${ethBalanceEnd}`}</span>
						</p>
					</StyledBalance>
					<StyledBalance>
						<p className="card-text balance-unit">THRM</p>
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
					<ReactApexChart options={ethereumChartOptions} series={[{
						name: 'Eth Balance',
						data: ethereumChartSeriesData
					}]} type="line" height={350} width={500} />
				</LeftSideCard>
			</Col>
		</Row>
	);
};

export default OverView;