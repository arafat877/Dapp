import { Layout } from 'antd';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HeaderBar from '../components/headerbar';
import SideBar from '../components/sidebar';
import Web3Wrapper from './../components/web3Wrapper/index';
import AddressMap from './adressmap';
import Burn from './burn/index';
import { StyledContent, StyledDrawer, StyledHeader, StyledSider } from './globalStyle';
import Mint from './mint/index';
import OverView from './overview/index';
import Tokens from './tokens/index';

function MainContent() {
	// Left Drawer Open and Close
	const [leftDrawerVisible, setLeftDrawerVisible] = useState(false);
	const onLeftDrawerClose = () => {
		setLeftDrawerVisible(false);
	};
	const onLeftDrawerOpen = () => {
		setLeftDrawerVisible(true);
	};

	const [collapsed, setCollapsed] = useState(false);

	const onCollapse = (collapsed) => {
		setCollapsed(collapsed);
	};

	return (
		<Router>
			<Layout>
				<StyledDrawer title={<div className="logo-area">THIRM WALLET</div>} placement="left" onClose={onLeftDrawerClose} visible={leftDrawerVisible}>
					<SideBar collapsed={collapsed} />
				</StyledDrawer>

				<StyledHeader>
					<HeaderBar collapsed={collapsed} onLeftDrawerOpen={onLeftDrawerOpen} />
				</StyledHeader>

				<Layout>
					<StyledSider width={250} breakpoint="md" onCollapse={onCollapse} collapsed={collapsed} trigger={null} collapsedWidth={0}>
						{!collapsed && <SideBar collapsed={collapsed} />}
					</StyledSider>
					<StyledContent>
						<Web3Wrapper>
							<Switch>
								<Route exact path="/" component={() => <OverView />} />
								<Route exact path="/addressmap" component={() => <AddressMap />} />
								<Route exact path="/tokens" component={() => <Tokens />} />
								<Route exact path="/burn" component={() => <Burn />} />
								<Route exact path="/mint" component={() => <Mint />} />
							</Switch>
						</Web3Wrapper>
					</StyledContent>
				</Layout>
			</Layout>
		</Router>
	);
}

export default MainContent;
