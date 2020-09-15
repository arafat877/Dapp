import { Card } from 'antd';
import styled from 'styled-components';

export const TokenCard = styled(Card)`
	cursor: pointer;
	width: 400px;
	height: 200px;
	&:hover {
		background-color: #fafafa;
	}
	border: 0;
	box-shadow: 0 5px 10px rgba(154, 160, 185, 0.05), 0 15px 40px rgba(166, 173, 201, 0.1);
`;
