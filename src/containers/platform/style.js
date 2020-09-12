import { Card } from 'antd';
import styled from 'styled-components';

export const TokenCard = styled(Card)`
  cursor: pointer;
  width: 250px;
  height: 140px;
  &:hover {
    background-color: #fafafa;
  }
  border: 0;
  box-shadow: 0 5px 10px rgba(154,160,185,.05), 0 15px 40px rgba(166,173,201,.10);
`;