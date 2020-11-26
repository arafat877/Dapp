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
	min-height: 650px;
	padding: 24px;
	margin: 0 auto;
	.deposit-form-item {
		input {
			width: 100%;
			height: 40px;
		}
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
		.ant-alert {
			margin: 16px 0;
		}
	}

	.deposit-address {
		display: flex;
		font-size: 18px;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		input {
			max-width: 500px;
			margin-right: 8px;
		}
		.anticon {
			cursor: pointer;
		}
	}
	.expertise-title {
		text-align: center;
	}

`;

export const ExpertiseButtons = styled.div`
	display: flex;
	justify-content: center;
	padding: 60px 0;
	.expertise-item {
		box-shadow: 0 5px 10px rgba(154, 160, 185, 0.05), 0 15px 40px rgba(166, 173, 201, 0.1);
		height: 210px;
		margin: 24px;
		padding: 24px 36px;
		&:hover {
			background-color: #e9e9e9;
		}
		.expertise-label {
			margin-top: 24px;
			}
	}
`;

export const AddressMappedInfo = styled.div`
	margin: 40px 0;
`
