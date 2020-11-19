import styled from 'styled-components';
import { StyledCard } from '../globalStyle';


export const DepositWrapper = styled(StyledCard)`
padding: 80px 24px;
@media only screen and (max-width: 992px) {
  padding: 36px 4px;
}
.ant-card-body {
  padding: 0;
}
`;

export const DepositBox = styled.div`
	max-width: 450px;
	padding: 0 24px;
	margin: 0 auto;
	.deposit-form-item {
		input {
			width: 100%;
			height: 40px;
		}
	}
	.deposit-button{
   		height: 50px;
    	width: 100%;
    	padding: 16px;
  	}

`;
