import Icon from '@ant-design/icons';
import { useWeb3React } from '@web3-react/core';
import { Menu } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { ReactComponent as bitcoinSvg } from "../../assets/icons/bitcoin.svg";
import { ReactComponent as dashboardSvg } from "../../assets/icons/dashboard.svg";
import { ReactComponent as depositSvg } from "../../assets/icons/deposit.svg";
import { ReactComponent as withdrawSvg } from "../../assets/icons/withdraw.svg";
import { SideMenu, SideSocial, SideWrapper, SocialAvatar, ThirmSideLogo } from './style';


const TwitterIcon = require('../../assets/images/twitter.png');
const DiscordIcon = require('../../assets/images/discord.png');
const GithubIcon = require('../../assets/images/github.png');

const SideBar = () => {
	const { active } = useWeb3React();

	const [activePath, setActivePath] = useState("");

	const history = useHistory();

	useEffect(() => {
		let activePathTemp = history.location.pathname.split('/')[1];
		if (!activePathTemp) activePathTemp = 'overview';
		setActivePath(activePathTemp);
	}, [history]);

	return (
		<SideWrapper>
			<ThirmSideLogo>
				<Link to="/">
					<span className="logo-text">THIRM DAPP</span>
				</Link>
			</ThirmSideLogo>
			{active && (
				<SideMenu mode="inline" defaultSelectedKeys={[activePath]} theme="dark">
					<Menu.Item icon={<Icon component={dashboardSvg} />} key="overview">
						<Link to="/">Overview</Link>
					</Menu.Item>
					<Menu.Item icon={<Icon component={bitcoinSvg} />} key="balance">
						<Link to="/balance">Balance</Link>
					</Menu.Item>

					<Menu.Item icon={<Icon component={depositSvg} />} key="deposit">
						<Link to="/deposit">Deposit</Link>
					</Menu.Item>

					<Menu.Item icon={<Icon component={withdrawSvg} />} key="withdraw">
						<Link to="/withdraw">Withdraw</Link>
					</Menu.Item>

				</SideMenu>
			)}

			<SideSocial>
				<ul>
					<li>
						<a href="https://github.com/thirmprotocol">
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
