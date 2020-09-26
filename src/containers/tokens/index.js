/* eslint-disable react-hooks/exhaustive-deps */
import { useWeb3React } from '@web3-react/core';
import { Button, Tag } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { TOKEN_INTEREST_URL } from '../../utils/config';
import LoadingIndicator from './../../components/loadingIndicator/index';
import { TOKEN_LIST_URL } from './../../utils/config';
import { blackListTokenAddress } from './blackListTokenAddress';
import { StyledTable, TokenTableContainer } from './style';

const Tokens = () => {
	const { chainId, account, library } = useWeb3React();

	const [tokensList, setTokensList] = useState([]);

	useEffect(() => {
		let stale = false;

		const getTokenInformation = async () => {
			let tokensListTemp = (await fetch(TOKEN_LIST_URL).then((res) => res.json())).tokens;

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
		title: 'Mint',
		dataIndex: 'mint',
		key: 'mint',
		render: () => {
			return (
				<Link to="/mint">
					<Button link type="dashed" size="small">
						Mint
					</Button>
				</Link>
			);
		},
	},
	{
		title: 'Burn',
		dataIndex: 'burn',
		key: 'burn',
		render: () => {
			return (
				<Link to="/burn">
					<Button danger type="dashed" size="small">
						Burn
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
