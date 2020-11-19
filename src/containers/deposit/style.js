import styled from 'styled-components';
import { StyledCard } from '../globalStyle';


export const DepositWrapper = styled(StyledCard)`
padding: 24px;
@media only screen and (max-width: 992px) {
  padding: 24px 4px;
}
.ant-card-body {
  padding: 0;
}
`;

export const DepositBox = styled.div`
	min-height: 550px;
	padding: 24px;
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

	.qr-code {
		text-align: center;
		padding: 24px;
	}

	.steps-content {
		padding: 20px 0 0 0;
	}

	.deposit-info {
		text-align: center;
	}

	.deposit-address {
		display: flex;
		font-size: 18px;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		.ant-tag {
			padding: 4px 8px;
    	font-size: 13px;
		}
		.anticon {
			cursor: pointer;
		}
	}

`;
