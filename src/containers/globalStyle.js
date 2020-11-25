import { Button, Card, Drawer, Layout } from 'antd';
import styled from 'styled-components';

export const ThirmTheme = {
	primaryColor: "#1e3799",
	secondaryColor: "#3c6382",
	primaryDarkColor: "#001f6b",
	primaryLightColor: "#a7bbef",
	textColorBlack: "#191919",
	textColorWhite: "#F9F9F9",
	textColorDark: "#858585",
	textColorGrey: "#bdbdbd",
	darkBlue: '#0c2461',
	hardDarkBlue: 'rgba(0, 0, 0, 0.3)'
};

export const StyledContent = styled(Layout.Content)`
	margin: 36px auto 0 auto;
	padding: 65px;
	background: #FFFFFF;
	@media (max-width: 992px) {
		margin: 70px auto;
		padding: 16px;
	}
	.alert-message {
		margin-bottom: 16px;
		border: 1px solid #e9e9e9;
	}
`;

export const StyledHeader = styled(Layout.Header)`
	background-color: #fff;
	padding: 0 8px;
	position: fixed;
	z-index: 99;
	width: 100%;
	height: 70px;
	box-shadow: 0 5px 10px rgba(154, 160, 185, 0.05), 0 15px 40px rgba(166, 173, 201, 0.1);
`;

export const StyledSider = styled(Layout.Sider)`
	background-color: ${ThirmTheme.darkBlue};
	margin: 0;
	min-height: 100vh;
	position: relative;
	overflow: hidden;
	z-index: 999;
`;

export const StyledDrawer = styled(Drawer)`
	background-color: ${ThirmTheme.darkBlue};
	.ant-drawer-body {
		margin: 0;
		padding: 0;
	}
`;

export const StyledCard = styled(Card)`
	border-radius: 10px;
	overflow: hidden;
	border: 0;
	box-shadow: 0 5px 10px rgba(154, 160, 185, 0.1), 2px 15px 40px rgba(166, 173, 201, 0.2);
`;

export const StyledButton = styled(Button)`
	margin: 8px 0;
	color: #ffffff;
	background: #0575E6;
	background: -webkit-linear-gradient(to right, #021B79, #0575E6);
	background: linear-gradient(to right, #021B79, #0575E6); 
	border-radius: 5px;
	border: 0;
	box-shadow: 0 5px 10px rgba(154, 160, 185, 0.1), 2px 15px 40px rgba(166, 173, 201, 0.2);
	overflow: hidden;

	transition: background .6s ease-in-out !important;

	&:hover, &:focus {
		background: #057596;
		background: -webkit-linear-gradient(to right, #021B79, #057596);
		background: linear-gradient(to right, #021B79, #057596); 
		border-radius: 5px;
	}

`
