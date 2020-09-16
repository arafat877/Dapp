import { Avatar, Button, Menu } from 'antd';
import styled from 'styled-components';

export const ThirmLogo = styled.div`
  margin-left: 4px;
  display: flex;
  flex-direction: row;
  justify-content: middle;
  align-items: center;
  .logo{
    margin-left: 16px;
  }
  .logo-text {
    margin-left: 8px;
    font-size: 17px;
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
 width: 250px;
`;

export const DisconnectButton = styled(Button)`
  margin: 16px 0 8px 0;
  height: 45px;
  padding: 10px 16px;
  border: 1px solid #e3e3e3;
  border-radius: 5px;
  width: 100%;
  &:focus, &:hover, &:active &:focus-within {
    outline: none;
    border: 1px solid #e3e3e3;
  }
`;

export const ConnectedAvatar = styled(Avatar)`
  height: 32px;
  width: 32px;
  @media only screen and (max-width: 768px) {
    height: 24px;
    width: 24px;
    margin-left: 4px;
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



