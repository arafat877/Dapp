import { Avatar, Button, Popover } from 'antd';
import styled from 'styled-components';

export const ThirmLogo = styled.div`
	display: flex;
  padding: 4px;
  margin-right: 16px;
	.logo-text {
    display: flex;
    align-items: center;
    justify-content: flex-start;
		font-size: 18px;
    line-height: 24px;
		font-weight: 700;
	}
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

export const ConnectButton = styled(Button)`
  width: 200px;
  @media only screen and (max-width: 992px) {
    width: 40px;
    padding: 4px;
    margin: 2px;
  }
  margin: 6px;
  height: 45px;
  border: 1px solid #e9e9e9;
  border-radius: 5px;
  &:focus, &:hover, &:active &:focus-within {
    outline: none;
    border: 1px solid #e9e9e9;
  }
  box-shadow: 0 5px 10px rgba(154,160,185,.05), 0 15px 40px rgba(166,173,201,.10);
`;

export const PopverWrapper = styled.div`
 width: 350px;  
 .account-address {
   margin: 16px 4px;
   padding: 8px 16px;
 }
 .connection-info {
   .connection-info-list {
     display: flex;
     flex-direction: row;
     justify-content: space-between;
     padding: 8px 0;
     border-bottom: 1px solid #e9e9e9;

     &:first-child {
      border-top: 1px solid #e9e9e9;
     }
   }
 }

 .account-address {
   padding: 4px;
   font-size: 12px;
    .anticon {
        cursor: pointer;
        padding: 8px;
        font-size: 14px;
      }
 }
`;

export const DisconnectButton = styled(Button)`
	margin: 16px 0 8px 0;
	height: 45px;
	padding: 10px 16px;
	border: 1px solid #e9e9e9;
  border-radius: 5px;
  background: #e74c3c;
  color: #fff;
	width: 100%;
	&:focus,
	&:hover,
	&:active &:focus-within {
		outline: none;
    border: 1px solid #e9e9e9;
    background: #c0392b;
    color: #fff;
	}
`;

export const ConnectedAvatar = styled(Avatar)`
	height: 48px;
	width: 48px;
	box-shadow: 0 5px 10px rgba(154, 160, 185, 0.05), 0 15px 40px rgba(166, 173, 201, 0.1);
	margin-right: 4px;
  padding: 10px;
`;

export const StyledPopover = styled(Popover)`
	width: 300px;
  @media (max-width: 992px) {
		width: 250px;
    font-size: 90%;
    padding: 2px 4px;
	}
	padding: 0 8px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-left: 1px solid #e9e9e9;
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
    background: #e9e9e9;
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

export const HeaderMeta = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  height: 70px;
`;

export const LogoMeta = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  .menu-icon {
    margin-right: 8px;
    font-size: 18px;
  }
`;

