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
	max-width: 450px;
	padding: 0 24px;
	.withdraw-form-item {
		input {
			width: 100%;
			height: 40px;
		}
		
	}
	.withdraw-button{
   		height: 50px;
    	width: 100%;
    	padding: 16px;
  	}
		.ant-tag {
			padding: 4px 18px;
		}
		.fee-info {
			padding: 4px 0;
		}
		.address-info {
			margin: 24px 0;
		}
`;


export const WithdrawWrapper = styled(StyledCard)`
	padding: 48px 24px;
	@media only screen and (max-width: 992px) {
    padding: 4px;
  }
	min-height: 500px;
	.ant-card-body {
    padding: 0;
	}
`;

export const StyledTabs = styled(Tabs)`
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