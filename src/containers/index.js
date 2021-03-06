import { Layout } from 'antd';
import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import HeaderBar from '../components/headerbar';
import SideBar from '../components/sidebar';
import Web3Wrapper from './../components/web3Wrapper/index';
import { collapsedState } from './../utils/recoilStates';
import Balance from './balance/index';
import Deposit from './deposit/index';
import { StyledContent, StyledDrawer, StyledHeader, StyledSider } from './globalStyle';
import OverView from './overview/index';
import WithDraw from './withdraw/index';

function MainContent() {
	// Left Drawer Open and Close
	const [leftDrawerVisible, setLeftDrawerVisible] = useState(false);




	const onLeftDrawerClose = () => {
		setLeftDrawerVisible(false);
	};
	const onLeftDrawerOpen = () => {
		setLeftDrawerVisible(true);
	};

	const [collapsed, setCollapsed] = useRecoilState(collapsedState);

	const onCollapse = (collapsed) => {
		setCollapsed(collapsed);
	};



	return (

		<Layout>
			<StyledDrawer title={<div className="logo-area">THIRM WALLET</div>} placement="left" onClose={onLeftDrawerClose} visible={leftDrawerVisible}>
				<SideBar />
			</StyledDrawer>

			<StyledHeader>
				<HeaderBar onLeftDrawerOpen={onLeftDrawerOpen} />
			</StyledHeader>

			<Layout>
				<StyledSider width={250} breakpoint="xl" onCollapse={onCollapse} collapsed={collapsed} trigger={null} collapsedWidth={0} theme="dark">
					{!collapsed && <SideBar />}
				</StyledSider>
				<StyledContent>
					<Web3Wrapper>
						<Switch>
							<Route exact path="/" component={() => <OverView />} />
							<Route exact path="/withdraw" component={() => <WithDraw />} />
							<Route exact path="/deposit" component={() => <Deposit />} />
							<Route exact path="/balance" component={() => <Balance />} />
						</Switch>
					</Web3Wrapper>
				</StyledContent>
			</Layout>
		</Layout>
	);
}

export default MainContent;
