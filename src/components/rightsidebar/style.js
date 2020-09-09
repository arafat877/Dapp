import { Avatar, Button } from 'antd';
import styled from 'styled-components';

export const ConnectorButton = styled(Button)`
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
  margin: 24px 0;
  height: 80px;
  border: 0;
  background: #fafafa;
  &:focus, &:hover, &:active &:focus-within {
    background: #f3f3f3;
  }
  .network-name {
    margin-top: 8px;
    margin-left: 36px;
  }
  .drop-down {
    margin-left: 4px;
  }
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
  box-shadow: 0 5px 10px rgba(154,160,185,.05), 0 15px 40px rgba(166,173,201,.10);
  background-color: #fff;
  margin-right: 4px;
`;

export const ConnectorAvatar = styled(Avatar)`
  height: 32px;
  width: 32px;
  margin-right: 8px;
`;