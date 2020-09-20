/* eslint-disable react-hooks/exhaustive-deps */
import { useWeb3React } from '@web3-react/core';
import { Col, Row, Select, Tabs } from 'antd';
import React, { useEffect, useState } from 'react';
import QRCode from 'react-qr-code';
import { StyledCard } from '../globalStyle';
import { MintWrapper } from './style';
let tempTokenList = require('../../config/addressmap.json');

const { TabPane } = Tabs;
const { Option } = Select;

const Mint = () => {
	const { account, library } = useWeb3React();

	const [tokensList, setTokensList] = useState([]);

	const [selectedToken, setSelectedToken] = useState('');

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

	function onChangeToken(value) {
		setSelectedToken(value);
	}

	return (
		<>
			<Row>
				<Col xs={24}>
					<StyledCard>
						<MintWrapper>
							<Tabs defaultActiveKey="1" centered>
								<TabPane tab="ERC20" key="1">
									<div className="qr-code">
										<QRCode value="0xA34eF48B73870FA2ACa1558239576cCBC60Ad542" size={200} />
									</div>
									<p className="deposite-info">Deposite Address: 0xA34eF48B73870FA2ACa1558239576cCBC60Ad542</p>
								</TabPane>
								<TabPane tab="Non ERC20" key="2">
									<Row>
										<Col xs={24}>
											<p>Select Token</p>
											<p>
												<Select style={{ width: 200 }} allowClear onChange={onChangeToken} placeholder="Select Coin">
													{tokensList.map((tkn) => (
														<Option value={tkn.depositaddress}>{tkn.name}</Option>
													))}
												</Select>
											</p>

											<div className="qr-code">{selectedToken && <QRCode value={selectedToken} size={200} />}</div>
											{selectedToken && <p className="deposite-info">Deposite Address: {selectedToken}</p>}
										</Col>
									</Row>
								</TabPane>
							</Tabs>
						</MintWrapper>
					</StyledCard>
				</Col>
			</Row>
		</>
	);
};

export default Mint;
