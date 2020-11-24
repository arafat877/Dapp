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
      margin: 8px 0;
      .balance-front {
        color: ${ThirmTheme.textColorBlack};
        font-weight: 700;
      }
      .balance-end {
        color: ${ThirmTheme.textColorGrey};
      }
      .balance-unit {
        font-size: 14px;
        line-height: 20px;
        font-weight: 700;
        margin-bottom: -6px;
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
  .ant-card-head {
    background-color: ${ThirmTheme.darkBlue};
  }
`;