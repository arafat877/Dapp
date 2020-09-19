import styled from 'styled-components';
import { StyledCard } from '../globalStyle';

export const TokenCard = styled(StyledCard)`
	cursor: pointer;
	width: 300px;
	height: 200px;
	&:hover {
		background-color: #fafafa;
	}
`;
