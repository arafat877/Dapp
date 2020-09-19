import { Alert, Avatar, Button } from 'antd';
import ReactApexChart from 'react-apexcharts';
import styled from 'styled-components';
import { StyledCard, ThirmTheme } from './../globalStyle';


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

export const LeftSideCard = styled(StyledCard)`
  margin: 8px 4px;
  width: 100%;
  display: inline-flex;
  .card-text {
    font-size: 16px;
    color: ${ThirmTheme.textColorDark};
    margin-bottom: -4px;
    margin-top: -4px;
    font-weight: 700;
  }
  .card-number {
    font-size: 36px;
    font-weight: 600;
  }

  .balance-unit {
   letter-spacing: 0.1rem;
   color: ${ThirmTheme.primaryColor};
 }
 .balance-front {
   color: ${ThirmTheme.textColorBlack};
   font-weight: 700;
 }
 .balance-end {
   color: ${ThirmTheme.textColorGrey};
   font-weight: 600;
  }
`;

export const RightSideCard = styled(StyledCard)`
  text-align: center;
  margin: 8px 0;
  width: 100%;
`;

export const StyledReactApexChart = styled(ReactApexChart)`
  width: 100%;
  padding: 24px;  
`;