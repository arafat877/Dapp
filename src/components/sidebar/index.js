import Icon from '@ant-design/icons';
import { useWeb3React } from '@web3-react/core';
import { Menu } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { ReactComponent as bitcoinSvg } from "../../assets/icons/bitcoin.svg";
import { ReactComponent as dashboardSvg } from "../../assets/icons/dashboard.svg";
import { ReactComponent as depositSvg } from "../../assets/icons/deposit.svg";
import { ReactComponent as withdrawSvg } from "../../assets/icons/withdraw.svg";
import { SideMenu, SideSocial, SideWrapper, SocialAvatar } from './style';


const TwitterIcon = require('../../assets/images/twitter.png');
const DiscordIcon = require('../../assets/images/discord.png');
const GithubIcon = require('../../assets/images/github.png');

const SideBar = (props) => {
	const { active } = useWeb3React();

	const [addr, setAddr] = useState();

	const history = useHistory();

	useEffect(() => {
		let addrTemp = history.location.pathname.split('/')[1];
		if (!addrTemp) addrTemp = 'overview';
		setAddr(addrTemp);
	}, [history, props]);

	return (
		<SideWrapper>
			{active && (
				<SideMenu mode="inline" defaultSelectedKeys={[addr]} defaultOpenKeys={['tokenz']} forceSubMenuRender={true}>
					<Menu.Item icon={<Icon component={dashboardSvg} style={{ fontSize: 18 }} />} key="overview">
						<Link to="/">Overview</Link>
					</Menu.Item>
					<Menu.Item icon={<Icon component={bitcoinSvg} style={{ fontSize: 18 }} />} key="balance">
						<Link to="/balance">Balance</Link>
					</Menu.Item>

					<Menu.Item icon={<Icon component={depositSvg} style={{ fontSize: 18 }} />} key="deposit">
						<Link to="/deposit">Deposit</Link>
					</Menu.Item>

					<Menu.Item icon={<Icon component={withdrawSvg} style={{ fontSize: 18 }} />} key="withdraw">
						<Link to="/withdraw">Withdraw</Link>
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

export default SideBar;
