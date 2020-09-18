import { Alert, Avatar, Button, Card } from 'antd';
import styled from 'styled-components';

export const StyledBalance = styled.div`
 font-size: 32px;
 color: #191919;
 margin: 8px;
 .balance-unit {
   font-weight: 600;
 }
 .balance-front {
   color: #000;
   font-weight: 700;
 }
 .balance-end {
   color: #bdbdbd;
   font-weight: 600;
  }
`;

export const PerformanceWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  .nomics-ticker-widget-embedded {
    width: 100%;
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

export const LeftSideCard = styled(Card)`
  margin: 8px 0;
  width: 100%;
  display: inline-flex;
  .card-text {
    font-size: 16px;
    color: #727272;
    margin-bottom: -4px;
    margin-top: -4px
  }
  .card-number {
    font-size: 36px;
    font-weight: 600;
  }
`;

export const RightSideCard = styled(Card)`
  text-align: center;
  margin: 8px 0;
  width: 100%;
`;