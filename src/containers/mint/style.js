import styled from 'styled-components';
import { StyledCard } from '../globalStyle';

export const MintWrapper = styled(StyledCard)`
	padding: 80px 24px;
	@media only screen and (max-width: 992px) {
		padding: 36px 4px;
	}
	.ant-card-body {
    padding: 0;
	}
`;

export const MintBox = styled.div`
	max-width: 600px;
	padding: 0 24px;
	margin: 0 auto;
	.deposite-form-item {
		input {
			width: 100%;
			height: 40px;
		}
	}
	.qr-code {
		text-align: center;
		padding: 24px;
	}
	.deposite-button {
		height: 50px;
		width: 100%;
		padding: 16px;
	}
	.ant-tag {
		padding: 4px 18px;
	}
	.fee-info {
		padding: 16px 0;
		text-align: center;
	}
	.deposit-info {
		display: flex;
		font-size: 18px;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		.anticon {
			cursor: pointer;
		}
	}
`;
