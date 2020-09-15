import { Alert, Avatar, Button } from 'antd';
import styled from 'styled-components';

export const StyledBalance = styled.div`
 font-size: 32px;
 font-weight: 600;
 color: #191919;
 .balance-unit {
   font-size: 16px;
   margin-right: 8px;
   font-weight: 500;
 }
 .balance-front {
   color: #000;
 }
 .balance-end {
   color: #bdbdbd;
  }
`;

export const PerformanceWrapper = styled.div`
  margin-top: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  .nomics-ticker-widget-embedded {
    width: 100%;
  }
`;

export const RightButtonGroups = styled.div`
  display: flex;
  button {
    margin-left: 8px;
  }
`;

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

export const ErrorAlert = styled(Alert)`
margin-top: 36px;
`;