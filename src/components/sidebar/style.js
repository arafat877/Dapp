import { Avatar, Menu } from 'antd';
import styled from 'styled-components';

export const SideMenu = styled(Menu)`
	background-color: #fff;
	border: 0;
	margin-top: 36px;
	@media only screen and (max-width: 768px) {
		margin-top: 4px;
	}
`;

export const SideWrapper = styled.div`
	position: fixed;
	top: 0px;
	width: 250px;
	min-height: 100vh;
	height: 100%;
	display: flex;
	flex-direction: column;
	margin-top: 60px;
	@media (max-width: 768px) {
		margin-top: 60px;
		width: 200px;
	}
`;

export const SideSocial = styled.div`
	margin-top: auto;
	height: 80px;
	ul {
		margin: 16px;
		display: inline-flex;
		li {
			padding-left: 8px;
		}
	}
`;

export const SocialAvatar = styled(Avatar)`
	height: 36px;
	width: 36px;
	padding: 6px;
	box-shadow: 0 5px 10px rgba(154, 160, 185, 0.05), 0 15px 40px rgba(166, 173, 201, 0.1);
	background-color: #fff;
	margin-right: 4px;
	&:hover {
		background: #f1f1f1;
	}
`;
