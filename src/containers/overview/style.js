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


export const AssetWrapper = styled.div`
  margin-top: 36px;
 border: 1px solid #e3e3e3;
 padding: 24px 16px;
 border-radius: 8px;
 h3 {
   margin-left: 6px;
   margin-bottom: 16px;
 }
  table td {
    border: 0;
  }
`;
export const PerformanceWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 40px;
  justify-content: center;
`;

export const RightButtonGroups = styled.div`
  display: flex;
  button {
    margin-left: 8px;
  }
`;
