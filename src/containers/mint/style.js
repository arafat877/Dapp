import styled from 'styled-components';
import { StyledCard } from '../globalStyle';

export const MintWrapper = styled(StyledCard)`
	padding: 16px 36px;
	@media only screen and (max-width: 992px) {
		padding: 8px;
	}
	min-height: 500px;
`;

export const MintBox = styled.div`
	max-width: 600px;
	padding: 0 24px;
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
