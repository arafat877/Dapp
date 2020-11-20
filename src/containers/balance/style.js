import ReactApexChart from 'react-apexcharts';
import styled from 'styled-components';
import { ThirmTheme } from './../globalStyle';

export const BalanceWrapper = styled.div`
  padding: 24px 0;
  .external-links {
      display: flex;
      li {
        padding-right: 8px;
        a {
          color: #999;
          &:hover {
            color: #191919;
          }
        }
      }
    }
    
  .coin-description{
    .coin-balance {
      font-size: 24px;
      line-height: 18px;
      font-weight: 600;
      .balance-front {
        color: ${ThirmTheme.textColorBlack};
        font-weight: 700;
      }
      .balance-end {
        color: ${ThirmTheme.textColorGrey};
      }
      .balance-unit {
        padding-left: 8px;
        font-size: 16px;
		    color: ${ThirmTheme.secondaryColor};
      }
    }
    
  }
`;

export const StyledTTokenReactApexChart = styled(ReactApexChart)`
  width: 100%;
  margin-bottom: -40px;
  margin-top: -20px;
`;

export const TTokenTitle = styled.div`
  display: flex;
  h3 {
    padding-left: 16px;
  }
`;