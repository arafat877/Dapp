import { formatEther } from '@ethersproject/units';
import { useWeb3React } from '@web3-react/core';
import { Button, Col, Modal, Row } from 'antd';
import React, { useState } from 'react';
import QRCode from 'react-qr-code';
import { AvatarIcon, ConnectorButton, LoginInfo, PerformanceWrapper, RightButtonGroups, StyledBalance } from './style';

const MetaMaskIcon = require('../../assets/images/metamask.png');
const WalletLinkIcon = require('../../assets/images/qr-code.png');
const WalletConnectIcon = require('../../assets/images/wallet-connect.png');

const OverView = (props) => {
	const { library, chainId, account, active } = useWeb3React();

	const { connectorsByName, activate, setActivatingConnector } = props;

	// State to set the ether balance
	const [ethBalance, setEthBalance] = React.useState();

	// Get balance when component mounts
	React.useEffect(() => {
		if (library && account) {
			let stale = false;

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

			return () => {
				stale = true;
				setEthBalance(undefined);
			};
		}
	}, [library, account, chainId]);

	const balanceUnit = 'ETH';

	let balanceFront = '';
	let balanceEnd = '';
	if (ethBalance !== null && ethBalance !== undefined) {
		const balanceSplit = parseFloat(formatEther(ethBalance)).toPrecision(5).toString().split('.');
		balanceFront = balanceSplit[0];
		balanceEnd = balanceSplit[1];
	}

	const activateWallet = async (currentConnector, name) => {
		setActivatingConnector(currentConnector);
		await activate(connectorsByName[name]);
		window.localStorage.setItem('wallet', name);
	};

	const [qrCodeModalVisible, setQrCodeModalVisible] = useState(false);

	const showQrCodeModal = () => {
		setQrCodeModalVisible(true);
	};

	const qrCodeModalHandleOk = (e) => {
		setQrCodeModalVisible(false);
	};

	const qrCodeModalHandleCancel = (e) => {
		setQrCodeModalVisible(false);
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
			</Row>
		);
	}

	return (
		<>
			<Row>
				<Col xs={24}>
					<Row justify="space-between" align="middle">
						<Col xs={12}>
							<StyledBalance>
								{balanceFront && balanceEnd && (
									<>
										<span className="balance-unit">{balanceUnit}</span>
										<span className="balance-front">{balanceFront}</span>
										<span className="balance-end">{`.${balanceEnd}`}</span>
									</>
								)}
							</StyledBalance>
						</Col>
						<Col xs={6}>
							<Row justify="end">
								<RightButtonGroups>
									<Button type="primary" onClick={showQrCodeModal}>
										QR CODE
									</Button>
									<Button type="primary">
										<a href={`https://etherscan.io/address/${account}`}>View On Explorer</a>
									</Button>
								</RightButtonGroups>
							</Row>
						</Col>
					</Row>
					<Row>
						<Col sm={{ span: 24 }}>
							<PerformanceWrapper></PerformanceWrapper>
						</Col>
					</Row>
				</Col>
			</Row>
			<Modal title="QR CODE" visible={qrCodeModalVisible} onOk={qrCodeModalHandleOk} onCancel={qrCodeModalHandleCancel} footer={null}>
				{' '}
				<Row justify="space-around">
					<Col xs={12}>
						<QRCode value={account} size={250} />
					</Col>
				</Row>
			</Modal>
		</>
	);
};

export default OverView;
