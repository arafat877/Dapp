import { Avatar, Button } from 'antd';
import styled from 'styled-components';

export const ConnectorButton = styled(Button)`
  width: 100%;
  height: 50px;
  margin: 8px 0;
`;

export const LoginInfo = styled.h1`
  font-size: 30px;
  text-align: left;
  margin-bottom: 40px;
`;

export const ConnectWalletWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ConnectWalletBox = styled.div`
  width: 500px;
`;

export const AvatarIcon = styled(Avatar)`
  padding: 6px;
  margin: 4px;
`;
