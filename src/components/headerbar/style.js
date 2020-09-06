import { Avatar, Button, Menu } from 'antd';
import styled from 'styled-components';

export const ThirmLogo = styled.div`
  margin-left: 4px;
  display: flex;
  flex-direction: row;
  justify-content: middle;
  align-items: center;
  .logo {
    margin-left: 12px;
  }
  .logo-text {
    margin-left: 8px;
    font-size: 15px;
    font-weight: 500;
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
  width: 400px;
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


