import ReactApexChart from 'react-apexcharts';
import styled from 'styled-components';

export const BalanceWrapper = styled.div`
  padding: 24px 0;
  .coin-description{
    .coin-balance {
      font-weight: 600;
      font-size: 16px;
    }
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
  }
`;

export const StyledTTokenReactApexChart = styled(ReactApexChart)`
  width: 100%;
  margin-bottom: -40px;
  margin-top: -20px;
`;
