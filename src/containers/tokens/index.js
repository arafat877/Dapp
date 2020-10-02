/* eslint-disable react-hooks/exhaustive-deps */
import { useWeb3React } from '@web3-react/core';
import { Button, Tag } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { TOKEN_INTEREST_URL } from '../../utils/config';
import LoadingIndicator from './../../components/loadingIndicator/index';
import { thirmAbi, TOKEN_LIST_URL } from './../../utils/config';
import { blackListTokenAddress } from './blackListTokenAddress';
import { StyledTable, TokenTableContainer } from './style';

const Tokens = () => {
	const { chainId, account, library } = useWeb3React();

	const [tokensList, setTokensList] = useState([]);

	useEffect(() => {
		let stale = false;

		const getTokenInformation = async () => {
			let tokensListTemp;
			try {
				tokensListTemp = (await fetch(TOKEN_LIST_URL).then((res) => res.json())).tokens;

				const interestDataTemp = (await fetch(TOKEN_INTEREST_URL).then((res) => res.json())).tokens;

				// Filter by network and blacklisted
				tokensListTemp = tokensListTemp
					.filter((tkn) => tkn.chainId === chainId)
					.filter((tkn) => !blackListTokenAddress.includes(tkn.address))
					.map((tkn) => {
						tkn.key = tkn.name;
						tkn.value = 1;
						return tkn;
					});

				// Get token value
				tokensListTemp = await Promise.all(
					tokensListTemp.map(async (tkn) => {
						const res = await library.contract.methods.getTToken(tkn.symbol).call();
						if (res && res > 1) {
							tkn.value = library.web3.utils.fromWei(res, 'ether').toString();
						} else {
							tkn.value = 1;
						}
						return tkn;
					})
				);

				// get APY and platform data && merge
				tokensListTemp = tokensListTemp.map((tkn) => {
					interestDataTemp.forEach((intr) => {
						if (intr.Address === tkn.address) {
							tkn.apy = Number.parseFloat(intr.Interest).toFixed(2);
						}
					});
					return tkn;
				});

				// Get token balance
				tokensListTemp = await Promise.all(tokensListTemp.map(async (tkn) => {
					const contract = new library.web3.eth.Contract(thirmAbi, tkn.address);
					const bal = await contract.methods.balanceOf(account).call();
					tkn.balance = bal * tkn.value;
					return tkn;
				}));

			} catch (e) {
				throw e;
			}

			if (!stale) {
				setTokensList(tokensListTemp);
			}
		};

		getTokenInformation();

		return () => {
			stale = true;
		};
	}, [chainId, account]);

	if (tokensList.length === 0) return <LoadingIndicator />;

	return <TokenTableContainer>{tokensList.length > 0 && <StyledTable size="medium" columns={addressMapTableColumns} type="fixed" dataSource={tokensList} pagination={false} scroll={{ x: 250 }} />}</TokenTableContainer>;
};

const addressMapTableColumns = [
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
		title: 'Symbol',
		dataIndex: 'symbol',
		key: 'symbol',
	},
	{
		title: 'Address',
		key: 'address',
		dataIndex: 'address',
	},
	{
		title: 'Value',
		key: 'value',
		dataIndex: 'value',
		render: (text, tkn) => {
			if (text) {
				return <>{`${text} ${tkn.symbol.split('t')[1]}`}</>;
			}
			return null;
		},
	},
	{
		title: 'Balance',
		key: 'balance',
		dataIndex: 'balance',
		render: (text, tkn) => {
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
		render: (text, tkn) => {
			if (text) {
				return <Tag color={text === 0 ? 'warning' : 'success'}>{`${text} %`}</Tag>;
			}
			return null;
		},
	},
];

export default Tokens;
