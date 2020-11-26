import ReactApexChart from 'react-apexcharts';
import styled from 'styled-components';
import { StyledCard, ThirmTheme } from './../globalStyle';

export const LeftSideCard = styled(StyledCard)`
	margin: 16px 0;
	width: 100%;
	display: inline-flex;
	background: #6441A5; 
	background: -webkit-linear-gradient(to right, #FFFFFF, #FAFAFA);
	background: linear-gradient(to right, #FFFFFF, #FAFAFA); 
	.card-text {
		font-size: 16px;
		color: ${ThirmTheme.primaryColor};
		margin-bottom: -4px;
		margin-top: -4px;
		font-weight: 700;
	}
	.card-number {
		font-size: 36px;
		font-weight: 600;
		.balance-front {
			color: ${ThirmTheme.textColorBlack};
			font-weight: 700;
		}
		.balance-end {
			color: ${ThirmTheme.textColorGrey};
			font-weight: 600;
		}
	}

	.balance-unit {
		color: ${ThirmTheme.primaryColor};
	}


	.card-logo img {
		width: 150px;
		margin: 24px 0;
		margin-right: 24px;
	}
	min-height: 150px;
`;

export const RightSideCard = styled(StyledCard)`
	margin: 16px 0;
	width: 100%;
	padding: 0;
	background: #6441A5; 
	background: -webkit-linear-gradient(to right, #FFFFFF, #FAFAFA);
	background: linear-gradient(to right, #FFFFFF, #FAFAFA); 
	.card-text {
		font-size: 16px;
		color: ${ThirmTheme.primaryColor};
		margin-bottom: -4px;
		margin-top: -4px;
		font-weight: 700;
	}
	.loading-chart {
		display: flex;
  	justify-content: center;
  	align-items: center;
		height: 320px;
	}

	.card-number {
		font-size: 36px;
		font-weight: 600;
		.balance-front {
			color: ${ThirmTheme.textColorBlack};
			font-weight: 700;
		}
		.balance-end {
			color: ${ThirmTheme.textColorGrey};
			font-weight: 600;
		}
	}
`;

export const StyledReactApexChart = styled(ReactApexChart)`
	width: 100%;
	margin-bottom: -16px;
`;


export const OverviewCard = styled.a`
	button {
		width: 100%;
		padding: 8px 0;
		margin: 8px 0;
		height: 40px;
		box-shadow: 0 5px 10px rgba(154, 160, 185, 0.05), 0 15px 40px rgba(166, 173, 201, 0.1);
	}
	padding: 4px;
`;

export const DiscordCard = styled.iframe`
	margin: 8px 0;
`;