import { formatEther } from '@ethersproject/units';
import { useWeb3React } from '@web3-react/core';
import { Col, Row } from 'antd';
import React, { useState } from 'react';
import QRCode from 'react-qr-code';
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
import { getErrorMessage } from './../../hooks/index';
import { AvatarIcon, ConnectorButton, ErrorAlert, LeftSideCard, LoginInfo, RightSideCard, StyledBalance } from './style';

const chartData = [
	{
		name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
	},
	{
		name: 'Page B', uv: 3000, pv: 1398, amt: 2210,
	},
	{
		name: 'Page C', uv: 2000, pv: 9800, amt: 2290,
	},
	{
		name: 'Page D', uv: 2780, pv: 3908, amt: 2000,
	},
	{
		name: 'Page E', uv: 1890, pv: 4800, amt: 2181,
	},
	{
		name: 'Page F', uv: 2390, pv: 3800, amt: 2500,
	},
	{
		name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
	},
];

const MetaMaskIcon = require('../../assets/images/metamask.png');
const WalletLinkIcon = require('../../assets/images/qr-code.png');
const WalletConnectIcon = require('../../assets/images/wallet-connect.png');

const OverView = (props) => {
	const { library, chainId, account, active, error } = useWeb3React();

	const { connectorsByName, activate, setActivatingConnector } = props;

	// State to set the ether balance
	const [ethBalance, setEthBalance] = useState(0.0);

	// State to set the ether balance
	const [thrmBalance, setThrmBalance] = useState(0.00);

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

		getBalances();

		return () => {
			stale = true;
			setEthBalance(undefined);
		};

	}, [library, account, chainId]);



	const ethBalanceUnit = 'ETH';
	let ethbalanceFront = '';
	let ethBalanceEnd = '';
	if (ethBalance !== null && ethBalance !== undefined) {
		const balanceSplit = parseFloat(formatEther(ethBalance)).toPrecision(5).toString().split('.');
		ethbalanceFront = balanceSplit[0];
		ethBalanceEnd = balanceSplit[1];
	}

	const thrmBalanceUnit = 'THRM';
	let thrmbalanceFront = '';
	let thrmBalanceEnd = '';
	if (thrmBalance !== null && thrmBalance !== undefined) {
		const balanceSplit = parseFloat(formatEther(thrmBalance)).toPrecision(5).toString().split('.');
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
				<Col xs={12}>
					{!!error && (<ErrorAlert
						message="Error"
						description={getErrorMessage(error)}
						type="error"
						showIcon
					/>)}

				</Col>
			</Row>
		);
	}
	return (
		<Row gutter={16}>
			<Col xs={24} xl={6}>
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
					<p className="card-text">Interest Earned</p>
					<h2 className="card-number">0.00005%</h2>
					<p className="card-text">hold more thirm to earn more</p>
				</LeftSideCard>
				<LeftSideCard style={{ height: 150 }}>
					<p className="card-text">Total Supply</p>
					<h2 className="card-number">0</h2>
				</LeftSideCard>
			</Col>
			<Col xs={24} xl={18}>
				<LeftSideCard>
					<LineChart
						width={450}
						height={300}
						data={chartData}
						margin={{
							top: 5, right: 30, left: 20, bottom: 5,
						}}
					>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="name" />
						<YAxis />
						<Tooltip />
						<Legend />
						<Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
						<Line type="monotone" dataKey="uv" stroke="#82ca9d" />
					</LineChart>
				</LeftSideCard>
				<Row gutter={16}>
					<Col xs={24} xl={12}>
						<RightSideCard>
							<p>Scan your token address</p>
							<QRCode value={account} size={150} />
						</RightSideCard>
					</Col>
				</Row>
			</Col>
		</Row>
	);
};

export default OverView;
