import { useWeb3React } from '@web3-react/core';
import { Avatar, Button, Col, Form, Input, Row, Tabs } from 'antd';
import Meta from 'antd/lib/card/Meta';
import TextArea from 'antd/lib/input/TextArea';
import React, { useEffect, useState } from 'react';
import QRCode from 'react-qr-code';
import { useRecoilValue } from 'recoil';
import LoadingIndicator from './../../components/loadingIndicator/index';
import { collapsedState } from './../../utils/recoilStates';
import { StyledTabs, TokenCard } from './../burn/style';
import { MintBox, MintWrapper } from './style';
const config = require('../../utils/config.json');

const Mint = () => {
	const { account, library } = useWeb3React();

	const [tokensList, setTokensList] = useState([]);

	const [selectedToken, setSelectedToken] = useState(0);

	const collapsed = useRecoilValue(collapsedState);

	const [form] = Form.useForm();

	useEffect(() => {
		let stale = false;

		const getTokenAddress = async () => {
			let tempTokenList = config.tokens;
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
	}, [account, library.contract.methods]);

	const onChangeToken = (value) => {
		setSelectedToken(value);
	};

	const onSigned = async (values) => {
		try {
			const coinNameAddress = tokensList[selectedToken].name + ':' + values.coinAddress;
			await library.contract.methods.setSig(coinNameAddress, values.signedMessage).send({ from: account });
		} catch (e) {
			throw e;
		}
	};

	if (tokensList.length === 0) return <LoadingIndicator />;

	return (
		<MintWrapper>
			<StyledTabs defaultActiveKey={selectedToken} tabPosition={collapsed ? 'top' : 'left'} onChange={onChangeToken} type="card" animated={true}>
				{tokensList.map((tkn) => (
					<Tabs.TabPane
						tab={
							<TokenCard>
								<Meta avatar={<Avatar src={tkn.image} size="small" />} title={tkn.name} />
							</TokenCard>
						}
						key={tkn.id}
					>
						<Row gutter={24}>
							<Col xs={24} xl={12}>
								<MintBox>
									<div className="qr-code">{selectedToken != null && <QRCode value={tokensList[selectedToken].depositaddress} size={200} />}</div>

									<div style={{ marginBottom: 16 }}>
										<Input addonBefore="Deposit Address" value={tokensList[selectedToken].depositaddress} defaultValue="loading" />
									</div>

									{selectedToken != null && (
										<p className="fee-info">
											<p>
												Deposit Fees {tokensList[selectedToken].fees} {tokensList[selectedToken].name}{' '}
											</p>
										</p>
									)}
								</MintBox>
							</Col>

							{tokensList[selectedToken].isERC === 0 && (
								<Col xs={24} xl={12}>
									<MintBox>
										<Form form={form} layout="vertical" className="deposite-form" onFinish={onSigned}>
											<Form.Item label="Paste address from which you are Depositing" className="deposite-form-item" name="coinAddress" rules={[{ required: true, message: 'Please input your coin address' }]}>
												<Input />
											</Form.Item>
											<Form.Item label="Sign this message with address" className="deposite-form-item">
												<Input value={`${account}`} />
											</Form.Item>
											<Form.Item label="Paste signature below" className="deposite-form-item" name="signedMessage" rules={[{ required: true, message: 'Please input signature' }]}>
												<TextArea autoSize={{ minRows: 4 }} />
											</Form.Item>
											<Form.Item className="deposite-form-item">
												<Button className="deposite-button" type="primary" htmlType="submit">
													Sign
												</Button>
											</Form.Item>
										</Form>
									</MintBox>
								</Col>
							)}
						</Row>
					</Tabs.TabPane>
				))}
			</StyledTabs>
		</MintWrapper>
	);
};

export default Mint;
