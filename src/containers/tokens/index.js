/* eslint-disable react-hooks/exhaustive-deps */
import { formatEther } from '@ethersproject/units';
import { useWeb3React } from '@web3-react/core';
import { Button, Tag } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useMainContract } from '../../hooks';
import { TOKEN_INTEREST_URL } from '../../utils/config';
import { getThirmTokenContract } from '../../utils/helpers';
import LoadingIndicator from './../../components/loadingIndicator/index';
import { TOKEN_LIST_URL } from './../../utils/config';
import { blackListTokenAddress } from './blackListTokenAddress';
import { CustomSpin, StyledTable, TokenTableContainer } from './style';

const Tokens = () => {
	const { chainId, account, library } = useWeb3React();

	const [tokensList, setTokensList] = useState([]);

	const [priceLoading, setPriceLoading] = useState([]);

	const mainContract = useMainContract();

	useEffect(() => {
		let stale = false;

		const getTokenInformation = async () => {
			let tokensListTemp = setTokensList;

			try {
				tokensListTemp = (await fetch(TOKEN_LIST_URL).then((res) => res.json())).tokens;
				// Filter by network and blacklisted
				tokensListTemp = tokensListTemp
					.filter((tkn) => tkn.chainId === chainId)
					.filter((tkn) => !blackListTokenAddress.includes(tkn.address))
					.map((tkn) => {
						tkn.key = tkn.name;
						tkn.value = 1;
						tkn.apy = "";
						tkn.balance = "0.00000000";
						return tkn;
					});
				if (!stale) {
					setTokensList(tokensListTemp);
					setPriceLoading(true);
				}
			} catch (e) {
				console.log(e);
			}

			try {
				const interestDataTemp = (await fetch(TOKEN_INTEREST_URL).then((res) => res.json())).tokens;
				tokensListTemp = tokensListTemp.map((tkn) => {
					interestDataTemp.forEach((intr) => {
						if (intr.Address === tkn.address) {
							tkn.apy = Number.parseFloat(intr.Interest).toFixed(2);
						}
					});
					return tkn;
				});
			} catch (e) {
				console.log(e);
			}

			try {
				tokensListTemp = await Promise.all(
					tokensListTemp.map(async (tkn) => {
						const val = await mainContract.getTToken(tkn.symbol);

						if (val && val > 1) {
							tkn.value = Number.parseFloat(formatEther(val)).toFixed(2);
						} else {
							tkn.value = 1;
						}
						return tkn;
					})
				);
			} catch (e) {
				console.log(e);
			}

			try {
				tokensListTemp = await Promise.all(tokensListTemp.map(async (tkn) => {
					const contract = getThirmTokenContract(library, account, tkn.address);
					const bal = await contract.balanceOf(account);
					const tknBalance = formatEther(bal);
					tkn.balance = Number.parseFloat(parseFloat(tknBalance) * tkn.value).toFixed(8);
					return tkn;
				}));

			} catch (e) {
				console.log(e);
			}

			if (!stale) {
				setTokensList(tokensListTemp);
				setPriceLoading(false);
			}
		};

		getTokenInformation();

		return () => {
			stale = true;
		};
	}, [chainId, account]);

	if (tokensList.length === 0) return <LoadingIndicator />;

	return <TokenTableContainer>{tokensList.length > 0 && <StyledTable size="medium" columns={addressMapTableColumns(priceLoading)} type="fixed" dataSource={tokensList} pagination={false} scroll={{ x: 250 }} />}</TokenTableContainer>;
};

const addressMapTableColumns = (priceLoading) => ([
	{
		title: 'Token',
		dataIndex: 'logoURI',
		key: 'logoURI',
		render: (text) => {
			if (text) {
				return <Avatar src={text} />;
			}
			return null;
		},
	},
	{
		title: 'Name',
		dataIndex: 'name',
		key: 'name',
	},
	{
		title: 'Address',
		key: 'address',
		dataIndex: 'address',
	},
	{
		title: 'Holdings',
		dataIndex: 'symbol',
		key: 'symbol',
		width: 180,
		render: (text, tkn) => {
			if (priceLoading) return <CustomSpin size="small" />;
			if (text) {
				return <>{`${tkn.balance} ${text} `}</>;
			}
			return null;
		},
	},
	{
		title: 'Rate',
		key: 'value',
		dataIndex: 'value',
		width: 100,
		render: (text, tkn) => {
			if (priceLoading) return <CustomSpin size="small" />;
			if (text) {
				return <>{`${text} ${tkn.symbol.split('t')[1]}`}</>;
			}
			return null;
		},
	},
	{
		title: 'Total Backed',
		key: 'balance',
		dataIndex: 'balance',
		width: 180,
		render: (text, tkn) => {
			if (priceLoading) return <CustomSpin size="small" />;
			return <>{`${text} ${tkn.symbol.split('t')[1]}`}</>;
		},
	},
	{
		title: 'Deposit',
		dataIndex: 'deposit',
		key: 'deposit',
		render: () => {
			return (
				<Link to="/deposit">
					<Button link type="dashed" size="small">
						Deposit
					</Button>
				</Link>
			);
		},
	},
	{
		title: 'Withdraw',
		dataIndex: 'withdraw',
		key: 'withdraw',
		render: () => {
			return (
				<Link to="/withdraw">
					<Button danger type="dashed" size="small">
						Withdraw
					</Button>
				</Link>
			);
		},
	},

	{
		title: 'Yearly Growth',
		dataIndex: 'apy',
		key: 'apy',
		render: (text) => {
			if (priceLoading) return <CustomSpin size="small" />;
			if (text) {
				return <Tag color={text === 0 ? 'warning' : 'success'}>{`${text} %`}</Tag>;
			}
			return null;
		},
	},
]);

export default Tokens;
