/* eslint-disable react-hooks/exhaustive-deps */
import { useWeb3React } from '@web3-react/core';
import { Button, Col, Input, Row, Select, Tag } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import React, { useEffect, useState } from 'react';
import QRCode from 'react-qr-code';
import { StyledCard } from '../globalStyle';
import { MintWrapper } from './style';
let tempTokenList = require('../../config/addressmap.json');

const { Option } = Select;

const Mint = () => {
	const { account, library } = useWeb3React();

	const [tokensList, setTokensList] = useState([]);

	const [selectedToken, setSelectedToken] = useState();

	const [signedMessage, setSignedMessage] = useState("");

	useEffect(() => {
		let stale = false;

		const getTokenAddress = async () => {
			tempTokenList = await Promise.all(
				tempTokenList.map(async (token) => {
					const addr = await library.contract.methods.getAddress(account, token.name).call();
					token.address = addr;
					return token;
				})
			);
			if (!stale) {
				setTokensList(tempTokenList);
			}
		};

		getTokenAddress();

		return () => {
			stale = true;
		};
	}, [account]);

	const onChangeToken = (value) => {
		setSelectedToken(value);
	}


	// url https://entbt7e7acdl.x.pipedream.net

	const onSigned = async () => {
		try {
			const SIGN_URL = "https://entbt7e7acdl.x.pipedream.net";
			await fetch(SIGN_URL, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					user: `myaddress:${account}`,
					coinName: tokensList[selectedToken].name,
					message: signedMessage
				})
			}).then(res => res.json());

		} catch (e) {
			console.log(e);
		}

	}

	const onSignMessageChanged = (x) => {
		setSignedMessage(x.target.value);
	}

	return (
		<>
			<Row>
				<Col xs={24}>
					<StyledCard>
						<MintWrapper>
							<Row>
								<Col xs={24}>
									<p>
										<Select style={{ width: 300 }} allowClear onChange={onChangeToken} placeholder="Select Coin">
											{tokensList.map((tkn) => (
												<Option value={tkn.id}>{tkn.name}</Option>
											))}
										</Select>
									</p>
									<div className="qr-code">{selectedToken != null && <QRCode value={tokensList[selectedToken].depositaddress} size={200} />}</div>

									{selectedToken != null && <p className="deposite-info">Deposit Address <Input value={tokensList[selectedToken].depositaddress} /></p>}


									{selectedToken != null && <p className="deposite-info">Deposit Fees <p><Tag>{tokensList[selectedToken].fees} {tokensList[selectedToken].name}</Tag></p></p>}

									{
										selectedToken != null && tokensList[selectedToken].isERC === 0 && <p className="deposite-info">Sign Message with deposit address<p>

											<Input value={`myaddress:${account}`} />
											<TextArea autoSize={{ minRows: 4 }} value={signedMessage} onChange={onSignMessageChanged} />
											<Button type="primary" onClick={onSigned}>Sign</Button>
										</p></p>
									}
								</Col>
							</Row>
						</MintWrapper>
					</StyledCard>
				</Col>
			</Row>
		</>
	);
};

export default Mint;
