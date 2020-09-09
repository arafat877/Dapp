import { Avatar, Button } from 'antd';
import styled from 'styled-components';

export const LoginInfo = styled.h1`
  font-size: 30px;
  text-align: left;
  margin-bottom: 40px;
`;

export const Intro = styled.div`
  text-align: center;
  padding: 8px 16px;
`;

export const ConnectorButton = styled(Button)`
  margin: 8px 4px;
  padding: 10px;
  height: 100px;
  width: 120px;
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
