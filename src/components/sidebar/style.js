import { Avatar, Menu } from 'antd';
import styled from 'styled-components';
import { ThirmTheme } from './../../containers/globalStyle';

export const SideMenu = styled(Menu)`
	background-color: ${ThirmTheme.darkBlue} !important;
	border: 0;
	margin-top: 24px;
	.ant-menu-item {
		height: 50px;
		padding: 8px 0;
		.anticon {
			color: #bdbdbd;
			font-size: 18px;
		}
		&:hover, &:focus {
			background-color: rgba(0,0,0,0.2);
		}
	}
	.ant-menu-item-selected {
		font-weight: 700;
		color: #fff;
		background-color: rgba(0,0,0,0.3) !important;
		.anticon {
			color: #fff;
		}
	}
	@media only screen and (max-width: 992px) {
		margin-top: 4px;
	}
`;

export const SideWrapper = styled.div`
	position: fixed;
	background-color: ${ThirmTheme.darkBlue};
	top: 0px;
	width: 250px;
	min-height: 100vh;
	height: 100%;
	display: flex;
	flex-direction: column;
	@media (max-width: 992px) {
		width: 260px;
	}
`;

export const SideSocial = styled.div`
	margin-top: auto;
	margin-bottom: 120px;
	height: 80px;
	ul {
		margin: 16px;
		display: inline-flex;
		li {
			padding-left: 8px;
		}
	}

	.alert-message {
		background-color: ${ThirmTheme.darkBlue};
		.ant-alert-message {
			color: #e67e22;
		}
	
		border: 0;
	}
`;

export const SocialAvatar = styled(Avatar)`
	height: 36px;
	width: 36px;
	padding: 6px;
	box-shadow: 0 5px 10px rgba(154, 160, 185, 0.05), 0 15px 40px rgba(166, 173, 201, 0.1);
	background-color: #666;
	margin-right: 4px;
	&:hover {
		background: ${ThirmTheme.textColorGrey};
	}
`;

export const ThirmSideLogo = styled.div`
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 4px;
		margin-right: 16px;
		height: 70px;
		background: ${ThirmTheme.hardDarkBlue};
		margin-right: 0;
		.logo-text {
			display: flex;
			align-items: center;
			justify-content: flex-start;
			font-size: 18px;
			line-height: 24px;
			font-weight: 700;
			color: #fff;
		}
`;
