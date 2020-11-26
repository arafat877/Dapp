import { Tabs } from 'antd';
import styled from 'styled-components';
import { StyledCard, ThirmTheme } from '../globalStyle';

export const TokenCard = styled(StyledCard)`
	cursor: pointer;
	border: 0px;
	box-shadow: none;
	background: transparent;
	width: 150px;
`;

export const WithdrawBox = styled.div`
	min-height: 650px;
	padding: 24px;
	margin: 0 auto;
	.withdraw-form-item {
		input {
			width: 100%;
			height: 40px;
		}
		
	}
		.withdraw-info {
			text-align: center;
			.ant-alert {
				margin: 16px 0;
			}
		}
`;


export const WithdrawWrapper = styled(StyledCard)`
	padding: 24px;
	@media only screen and (max-width: 992px) {
    padding: 24px 4px;
  }
	.ant-card-body {
    padding: 0;
	}
`;

export const StyledTabs = styled(Tabs)`
padding: 0 8px 36px 0;
.ant-tabs-nav-list .ant-tabs-tab {
	height: 60px;
	margin: 4px 0;
	border: 0;
	background-color: #fff;
}
.ant-tabs-nav-list .ant-tabs-tab-active {
	background: ${ThirmTheme.primaryColor};
	.ant-card-meta-title {
		color: #ffffff;
	}
	box-shadow: 0 5px 10px rgba(154, 160, 185, 0.05), 0 15px 40px rgba(166, 173, 201, 0.1);
	}
`;