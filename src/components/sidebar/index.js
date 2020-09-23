import { BorderlessTableOutlined, EyeOutlined, FireOutlined, FundOutlined, MoneyCollectOutlined, NodeIndexOutlined, RightOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { useWeb3React } from '@web3-react/core';
import { Col, Menu, Row, Tag } from 'antd';
import SubMenu from 'antd/lib/menu/SubMenu';
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { injected } from '../../hooks/connectors';
import { walletConnect, walletlink } from './../../hooks/connectors';
import { ConnectButton, ConnectedAvatar, ConnectorAvatar, DisconnectButton, PopverWrapper, SideMenu, SideSocial, SideWrapper, SocialAvatar, StyledPopover } from './style';

const MetaMaskIcon = require('../../assets/images/metamask.png');
const WalletLinkIcon = require('../../assets/images/qr-code.png');
const WalletConnectIcon = require('../../assets/images/wallet-connect.png');
const TwitterIcon = require('../../assets/images/twitter.png');
const DiscordIcon = require('../../assets/images/discord.png');
const GithubIcon = require('../../assets/images/github.png');

const SideBar = (props) => {
	const { deactivate, active, error, account, connector, chainId } = useWeb3React();

	const [networkName, setNetworkName] = useState('');

	const { collapsed } = props;

	useEffect(() => {
		const changeNetworkName = () => {
			if (!account && !chainId) return;

			if (chainId && chainId === 1) {
				setNetworkName('MainNet');
			} else if (chainId && chainId === 3) {
				setNetworkName('Ropsten');
			} else {
				setNetworkName('');
			}
		};

		changeNetworkName();
	}, [account, chainId]);

	const history = useHistory();

	let addr = window.location.pathname.split('/')[1];

	if (!addr) addr = 'overview';

	return (
		<SideWrapper>
			{!collapsed && (
				<Row>
					<Col span={{ xs: 24 }}>
						{
							<ConnectButton type="secondary">
								{active ? (
									<StyledPopover placement="right" content={() => <ActivePopoverContent account={account} active={active} error={error} deactivate={deactivate} connector={connector} history={history} />}>
										<ConnectedAvatar src={`https://robohash.org/${account}?set=set5`} />
										{networkName && (
											<Tag className="network-name" color="success">
												{networkName}
											</Tag>
										)}
										<span>
											<RightOutlined className="drop-down" />
										</span>
									</StyledPopover>
								) : (
										<Link to="/">
											<ThunderboltOutlined /> {`Connect`}
										</Link>
									)}
							</ConnectButton>
						}
					</Col>
				</Row>
			)}
			{active && (
				<SideMenu mode="inline" defaultSelectedKeys={[addr]} defaultOpenKeys={['tokenz', 'config']} forceSubMenuRender={true}>
					<Menu.Item icon={<EyeOutlined />} key="overview">
						<Link to="/">Overview</Link>
					</Menu.Item>

					<Menu.Item icon={<MoneyCollectOutlined />} key="tokens">
						<Link to="/tokens">T-Tokens</Link>
					</Menu.Item>

					<SubMenu key="tokenz" icon={<MoneyCollectOutlined />} title="Actions">
						<Menu.Item icon={<NodeIndexOutlined />} key="mint">
							<Link to="/mint">Mint</Link>
						</Menu.Item>

						<Menu.Item icon={<FireOutlined />} key="burn">
							<Link to="/burn">Burn</Link>
						</Menu.Item>
					</SubMenu>

					<SubMenu key="config" icon={<MoneyCollectOutlined />} title="Config">
						<Menu.Item icon={<BorderlessTableOutlined />} key="addressmap">
							<Link to="/addressmap">Address</Link>
						</Menu.Item>
					</SubMenu>

					<Menu.Item icon={<FundOutlined />} key="platform">
						<Link to="/platform">Platforms</Link>
					</Menu.Item>
				</SideMenu>
			)}

			<SideSocial>
				<ul>
					{' '}
					<li>
						<a href="https://github.com/thirmprotocol/app">
							<SocialAvatar src={GithubIcon} />
						</a>
					</li>
					<li>
						<a href="https://twitter.com/thirmprotocol">
							<SocialAvatar src={TwitterIcon} />
						</a>
					</li>
					<li>
						<a href="https://discord.com/widget?id=712795894982115380&theme=dark">
							<SocialAvatar src={DiscordIcon} />
						</a>
					</li>
				</ul>
			</SideSocial>
		</SideWrapper>
	);
};

const ActivePopoverContent = ({ account, active, error, deactivate, connector, history }) => (
	<PopverWrapper>
		<Row justify="space-between" align="middle">
			<Col>{connector === injected ? <ConnectorAvatar src={MetaMaskIcon} /> : connector === walletlink ? <ConnectorAvatar src={WalletLinkIcon} /> : connector === walletConnect ? <ConnectorAvatar src={WalletConnectIcon} /> : null}</Col>
			<Col>{account}</Col>
			<Col xs={24}>
				{(active || error) && (
					<DisconnectButton
						onClick={() => {
							localStorage.removeItem('wallet');
							deactivate();
							history.push('/');
						}}
					>
						Disconnect
					</DisconnectButton>
				)}
				{!!error && <p>{error}</p>}
			</Col>
		</Row>
	</PopverWrapper>
);

export default SideBar;
