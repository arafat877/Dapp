import ReactApexChart from 'react-apexcharts';
import styled from 'styled-components';
import { StyledCard, ThirmTheme } from './../globalStyle';

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