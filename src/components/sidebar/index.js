import { BorderlessTableOutlined, FireOutlined, NodeIndexOutlined } from '@ant-design/icons';
import { useWeb3React } from '@web3-react/core';
import { Menu } from 'antd';
import SubMenu from 'antd/lib/menu/SubMenu';
import React from 'react';
import { Link } from 'react-router-dom';
import { SideMenu, SideSocial, SideWrapper, SocialAvatar } from './style';

const TwitterIcon = require('../../assets/images/twitter.png');
const DiscordIcon = require('../../assets/images/discord.png');
const GithubIcon = require('../../assets/images/github.png');

const SideBar = (props) => {
	const { active } = useWeb3React();

	let addr = window.location.pathname.split('/')[1];

	if (!addr) addr = 'overview';

	return (
		<SideWrapper>
			{active && (
				<SideMenu mode="inline" defaultSelectedKeys={[addr]} defaultOpenKeys={['tokenz']} forceSubMenuRender={true}>
					<Menu.Item icon={<BorderlessTableOutlined />} key="overview">
						<Link to="/">Overview</Link>
					</Menu.Item>

					<Menu.Item icon={<BorderlessTableOutlined />} key="tokens">
						<Link to="/tokens">Vaults</Link>
					</Menu.Item>

					<SubMenu key="tokenz" icon={<BorderlessTableOutlined />} title="T-Tokens">
						<Menu.Item icon={<NodeIndexOutlined />} key="deposit">
							<Link to="/deposit">Deposit</Link>
						</Menu.Item>

						<Menu.Item icon={<FireOutlined />} key="withdraw">
							<Link to="/withdraw">Withdraw</Link>
						</Menu.Item>
					</SubMenu>

					<Menu.Item icon={<BorderlessTableOutlined />} key="addressmap">
						<Link to="/addressmap">Crosschain</Link>
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
