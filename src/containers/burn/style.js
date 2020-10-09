import { Tabs } from 'antd';
import styled from 'styled-components';
import { StyledCard } from '../globalStyle';

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
	padding: 16px 36px;
	@media only screen and (max-width: 992px) {
    padding: 8px;
  }
	min-height: 500px;
`;

export const StyledTabs = styled(Tabs)`
.ant-tabs-nav-list .ant-tabs-tab {
  background: #fafafa;
	border-color: #fafafa;
	height: 60px;
	margin: 4px 0;
}
.ant-tabs-nav-list .ant-tabs-tab-active {
  background: #eaeaea;
}
`;