import ReactApexChart from 'react-apexcharts';
import styled from 'styled-components';
import { StyledCard, ThirmTheme } from './../globalStyle';

export const BalanceWrapper = styled.div`
  padding: 24px 0;
  .external-links {
      display: flex;
      li {
        padding-right: 8px;
        &:last-child {
          padding-right: 0;
        }
        a {
          color: #bdbdbd;
          &:hover {
            color: #ffffff;
          }
        }
      }
    }
    
  .coin-description{
    .coin-balance {
      font-size: 28px;
      font-weight: 600;
      margin: 4px 0;
      .balance-front {
        color: ${ThirmTheme.textColorBlack};
        font-weight: 700;
      }
      .balance-end {
        color: ${ThirmTheme.textColorGrey};
      }
      .balance-unit {
        padding-left: 8px;
        font-size: 18px;
		    color: ${ThirmTheme.secondaryColor};
      }
      
    }

    .coin-meta {
      font-size: 20px;
      font-weight: 600;
      margin: 4px 0;
      .balance-prefix {
        color: ${ThirmTheme.textColorGrey};
        font-weight: 700;
      }
      .balance-suffix {
        padding-left: 8px;
        font-size: 14px;
		    color: ${ThirmTheme.secondaryColor};
      }
    }
    
  }
`;

export const StyledTTokenReactApexChart = styled(ReactApexChart)`
  width: 100%;
  margin-bottom: -40px;
  margin-top: -10px;
`;

export const TTokenTitle = styled.div`
  display: flex;
  h3 {
    padding-left: 16px;
    color: #fff;
  }
`;

export const TTokenCard = styled(StyledCard)`
border-radius: 10px;
  .ant-card-head {
    background-color: ${ThirmTheme.darkBlue};
  }
`;