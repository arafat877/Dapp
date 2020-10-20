/* eslint-disable react-hooks/exhaustive-deps */
import { formatEther } from '@ethersproject/units';
import { useWeb3React } from '@web3-react/core';
import { Button } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useMainContract } from '../../hooks';
import { getThirmTokenContract } from '../../utils/helpers';
import LoadingIndicator from './../../components/loadingIndicator/index';
import { CustomSpin, StyledTable, TokenTableContainer } from './style';

const config = require('./../../utils/config');

const Tokens = () => {
	const { chainId, account, library } = useWeb3React();

	const [tokensList, setTokensList] = useState([]);

	const [priceLoading, setPriceLoading] = useState([]);

	const mainContract = useMainContract();

	useEffect(() => {
		let stale = false;

		const getTokenInformation = async () => {
			let tokensListTemp = [...config[chainId].tokens];

			try {
				tokensListTemp = tokensListTemp.map((tkn) => {
					tkn.key = tkn.name;
					tkn.value = 1;
					tkn.apy = 0;
					tkn.balance = '0.00000000';
					return tkn;
				});
			} catch (e) {
				console.log(e);
			}

			if (!stale) {
				setTokensList(tokensListTemp);
				setPriceLoading(true);
			}

			try {
				tokensListTemp = await Promise.all(
					tokensListTemp.map(async (tkn) => {
						const val = await mainContract.getTToken(tkn.name);
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
				tokensListTemp = await Promise.all(
					tokensListTemp.map(async (tkn) => {
						const contract = getThirmTokenContract(library, account, tkn.address);
						const bal = await contract.balanceOf(account);
						const tknBalance = formatEther(bal);
						tkn.balance = Number.parseFloat(parseFloat(tknBalance) * tkn.value).toFixed(8);
						return tkn;
					})
				);
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

const addressMapTableColumns = (priceLoading) => [
	{
		title: 'Token',
		dataIndex: 'image',
		key: 'image',
		render: (text) => {
			if (text) {
				return <Avatar src={text} />;
			}
			return null;
		},
	},
	{
		title: 'Name',
		dataIndex: 'tname',
		key: 'tname',
	},
	{
		title: 'Address',
		key: 'address',
		dataIndex: 'address',
	},
	{
		title: 'Holdings',
		dataIndex: 'tname',
		key: 'tname',
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
				return <>{`${text} ${tkn.name}`}</>;
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
			return <>{`${text} ${tkn.name}`}</>;
		},
	},
	{
		title: 'Deposit',
		dataIndex: 'deposit',
		key: 'deposit',
		render: (text, tkn) => {
			return (
				<Link
					to={{
						pathname: '/deposit',
						state: { token: tkn.id },
					}}
					href="#"
				>
					<Button type="dashed" size="small">
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
		render: (text, tkn) => {
			return (
				<Link
					to={{
						pathname: '/withdraw',
						state: { token: tkn.id },
					}}
					href="#"
				>
					<Button danger type="dashed" size="small">
						Withdraw
					</Button>
				</Link>
			);
		},
	},
];

export default Tokens;
