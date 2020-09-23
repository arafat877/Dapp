import { formatEther } from '@ethersproject/units';
import { useWeb3React } from '@web3-react/core';
import { Button, Col, Input, Row, Select } from 'antd';
import { Option } from 'antd/lib/mentions';
import React, { useEffect, useState } from 'react';
import { StyledCard } from '../globalStyle';
import { TOKEN_LIST_URL } from './../../utils/config';

const Burn = () => {
	const { account, library } = useWeb3React();

	const [tokensList, setTokensList] = useState([]);

	const [selectedToken, setSelectedToken] = useState('');

	const [tokenAmount, setTokenAmount] = useState();

	useEffect(() => {
		let stale = false;

		const getTokensList = async () => {
			const tokensListTemp = (await fetch(TOKEN_LIST_URL).then((res) => res.json())).tokens;

			if (!stale) {
				setTokensList(tokensListTemp);
			}
		};

		getTokensList();

		return () => {
			stale = true;
		};
	}, [account]);

	function onChangeToken(value) {
		setSelectedToken(value);
	}

	function onTokenValueChange(baln) {
		const bal = baln.target.value;
		setTokenAmount(bal);
	}

	const onTokenMax = async () => {
		const bal = await library.thirm.methods.balanceOf(account).call();
		if (bal) {
			const ethBal = parseFloat(formatEther(bal)).toFixed(8);
			setTokenAmount(ethBal);
		}
	}

	const onTokenBurn = async () => {
		const tokenAmountWei = library.web3.utils.toWei(tokenAmount, 'ether');
		const burned = await library.thirm.methods.burn(tokenAmountWei).call();
		if (!!burned) {
			console.log(burned);
		}
	}

	return (
		<Row>
			<Col xs={24}>
				<StyledCard>

					<p>
						<Select style={{ width: 300 }} allowClear onChange={onChangeToken} placeholder="Select Coin">
							{tokensList.map((tkn) => (
								<Option value={tkn.address}>{tkn.name}</Option>
							))}
						</Select>
					</p>

					{selectedToken && <p>Token Address: {selectedToken}</p>}

					<p>

						<Input
							value={tokenAmount}
							onChange={onTokenValueChange}
							style={{ width: 300 }}
							placeholder="Number of tokens to burn"
							suffix={
								<Button type="primary" onClick={onTokenMax}>MAX</Button>
							}
						/>
					</p>
					<Button type="primary" onClick={onTokenBurn}>Burn</Button>
				</StyledCard>
			</Col>
		</Row>
	);
};

export default Burn;
