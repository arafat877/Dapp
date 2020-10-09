import { Alert, Avatar, Button } from 'antd';
import styled from 'styled-components';


export const LoginInfo = styled.h2`
  font-size: 24px;
  margin: 10px;
  margin-bottom: 40px;
`;

export const ConnectorButton = styled(Button)`
  margin: 8px;
  padding: 16px;
  height: 100px;
  width: 120px;
  box-shadow: 0 5px 10px rgba(154, 160, 185, 0.05), 0 15px 40px rgba(166, 173, 201, 0.1);
  border: 0;
  &:focus, &:hover, &:active &:focus-within {
    outline: none;
    background-color: #f9f9f9;
  }
`;

export const AvatarIcon = styled(Avatar)`
  padding: 6px;
  margin: 4px;
`;

export const ErrorAlert = styled(Alert)`
  margin-top: 36px;
`;