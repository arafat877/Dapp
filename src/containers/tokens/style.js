import { Spin, Table } from 'antd';
import styled from 'styled-components';

export const TokenTableContainer = styled.div`
  width: 100%;
`;

export const StyledTable = styled(Table)`
  border: 1px solid #f1f1f1;
	box-shadow: 0 5px 10px rgba(154, 160, 185, 0.05), 0 15px 40px rgba(166, 173, 201, 0.1);
  border-radius: 16px;
`;

export const CustomSpin = styled(Spin)`
  display: flex;
  justify-content: center;
  align-items: center;
`;