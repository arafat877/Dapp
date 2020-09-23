import { Avatar, Button, Menu, Popover } from 'antd';
import styled from 'styled-components';

export const ThirmLogo = styled.div`
	display: flex;
	.logo-text {
		margin-left: 8px;
		font-size: 18px;
		font-weight: 700;
	}
`;

export const SideMenu = styled(Menu)`
  padding-top: 16px;
  background-color: #fbfbfb;
  border: 0;
  width: 100%;
  border-top: 1px solid #e3e3e3;
`;

export const ConnectorButton = styled(Button)`
  width: 100%;
  height: 80px;
  margin: 8px 4px;
  padding: 10px;
  &:focus, &:hover, &:active &:focus-within {
    outline: none;
    border: 1px solid #f9f9f9;
    background-color: #f9f9f9;
  }
`;

export const AvatarIcon = styled(Avatar)`
  padding: 6px;
  margin: 4px;
`;

export const ConnectButton = styled(Button)`
  width: 200px;
  @media only screen and (max-width: 768px) {
    width: 40px;
    padding: 4px;
  }
  margin: 6px;
  height: 45px;
  border: 1px solid #e3e3e3;
  border-radius: 5px;
  &:focus, &:hover, &:active &:focus-within {
    outline: none;
    border: 1px solid #e3e3e3;
  }
  box-shadow: 0 5px 10px rgba(154,160,185,.05), 0 15px 40px rgba(166,173,201,.10);
`;

export const PopverWrapper = styled.div`
 width: 300px;  
 .account-address {
   margin: 16px 0;
   padding: 8px;
 }
 .connection-info {
   .connection-info-list {
     display: flex;
     flex-direction: row;
     justify-content: space-between;
     padding: 8px 0;
     border-bottom: 1px solid #e3e3e3;

     &:first-child {
      border-top: 1px solid #e3e3e3;
     }
   }
 }
`;

export const DisconnectButton = styled(Button)`
	margin: 16px 0 8px 0;
	height: 45px;
	padding: 10px 16px;
	border: 1px solid #e3e3e3;
	border-radius: 5px;
	width: 100%;
	&:focus,
	&:hover,
	&:active &:focus-within {
		outline: none;
		border: 1px solid #e3e3e3;
	}
`;

export const ActiveButton = styled(Button)`
  span {
    color: #00ff00;
  }
  border: 2px solid #00ff00;
  &:focus, &:hover, &:active &:focus-within {
    border: 2px solid #00ff00;
  }
`;

export const ConnectedAvatar = styled(Avatar)`
	height: 48px;
	width: 48px;
	box-shadow: 0 5px 10px rgba(154, 160, 185, 0.05), 0 15px 40px rgba(166, 173, 201, 0.1);
	background-color: #fff;
	margin-right: 4px;
	border: 1px solid #e3e3e3;
`;

export const StyledPopover = styled(Popover)`
	width: 300px;
  @media (max-width: 768px) {
		width: 220px;
	}
	padding: 4px 8px;
  float: right;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-left: 1px solid #e3e3e3;
  border-right: 1px solid #e3e3e3;
  cursor: pointer;
  .left-content, .right-content {
    display: flex;
    flex-direction: row;
  }
	.network-name {
		margin: auto 4px;
    height: 25px;
	}
  .connection-info {
    display: flex;
    flex-direction: column;
    line-height: 1.4;
    margin: 4px 8px;
    .connection-info-up {
      font-weight: 600;
    }
    .connection-info-down {
      color: #888;
    }
  }
  .dropdown-icon {
    margin: auto 8px;
    background: #e3e3e3;
    padding: 6px;
    border-radius: 50%;
  }
  .inactive-dot {
    height: 16px;
    width: 16px;
    border-radius: 50%;
    background-color: red;
    border: 2px solid #fff;
  }

  .active-dot {
    height: 16px;
    width: 16px;
    border-radius: 50%;
    background-color: green;
    border: 2px solid #fff;
  }
`;

export const ConnectorAvatar = styled(Avatar)`
	height: 32px;
	width: 32px;
	margin-right: 8px;
`;

