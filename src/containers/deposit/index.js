/* eslint-disable react-hooks/exhaustive-deps */
import { CopyOutlined } from '@ant-design/icons';
import { useWeb3React } from '@web3-react/core';
import { Avatar, Button, Col, Form, Input, notification, Row, Steps, Tabs, Tag } from 'antd';
import Meta from 'antd/lib/card/Meta';
import React, { useEffect, useState } from 'react';
import QRCode from 'react-qr-code';
import { useHistory } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { useMainContract } from '../../hooks';
import config from '../../utils/config';
import { StyledTabs, TokenCard } from '../withdraw/style';
import LoadingIndicator from './../../components/loadingIndicator/index';
import { collapsedState } from './../../utils/recoilStates';
import { DepositBox, DepositWrapper } from './style';

const { Step } = Steps;

const steps = [
	{
		title: 'Deposit',
	},
	{
		title: 'Verify',
	},
];

const Deposit = () => {
	const { account, library, chainId } = useWeb3React();

	const mainContract = useMainContract();

	const [tokensList, setTokensList] = useState([]);

	const [selectedToken, setSelectedToken] = useState(0);

	const collapsed = useRecoilValue(collapsedState);

	const [form] = Form.useForm();

	const history = useHistory();

	const [currentStep, setCurrentStep] = useState(0);

	const nextStep = () => {
		setCurrentStep(currentStep + 1);
	};

	const prevStep = () => {
		setCurrentStep(currentStep - 1);
	};

	useEffect(() => {
		let stale = false;

		const getTokensList = async () => {
			const params = history.location.state;

			if (params && params.token) {
				setSelectedToken(params.token.toString());
			}

			let tokensListTemp = [...config.tokens];

			if (!stale) {
				setTokensList(tokensListTemp);
			}
		};

		getTokensList();

		return () => {
			stale = true;
		};
	}, [account, chainId]);

	const onChangeToken = (value) => {
		setSelectedToken(value);
		setCurrentStep(0);
	};

	const onFinish = async (values) => {
		console.log(values);

		try {
			const signatureSubmitted = await mainContract.submitSignature(account, tokensList[selectedToken].coin, values.coinAddress, values.signature, {
				gasLimit: 500000,
			});

			library.once(signatureSubmitted.hash, () => {
				notification['success']({
					message: 'Signature',
					description: `You have successfully submitted signature for ${tokensList[selectedToken].coin}`,
					placement: 'bottomRight',
				});
			});
		} catch (e) {
			console.log(e);
		}
	};

	if (tokensList.length === 0) return <LoadingIndicator />;

	return (
		<StyledTabs defaultActiveKey={selectedToken} tabPosition={collapsed ? 'top' : 'left'} onChange={onChangeToken} type="card">
			{tokensList.map((tkn) => (
				<Tabs.TabPane
					tab={
						<TokenCard>
							<Meta avatar={<Avatar src={tkn.image} size="small" />} title={tkn.coin} />
						</TokenCard>
					}
					key={tkn.id}
				>
					<DepositWrapper>
						<Row gutter={24} justify="space-around">
							<Col xs={24} xl={12}>
								<DepositBox>
									<Steps current={currentStep}>
										{steps.map((item) => (
											<Step key={item.title} title={item.title} />
										))}
									</Steps>

									<div className="steps-content">
										{currentStep === 0 && (
											<div>
												<p className="deposit-info">{tokensList[selectedToken].coin} deposit address</p>
												<div className="deposit-address">
													<Tag color="magenta">{tokensList[selectedToken].depositAddress}</Tag>
													<CopyOutlined
														onClick={() => {
															navigator.clipboard.writeText(tokensList[selectedToken].depositaddress);
															notification['success']({
																message: 'Deposit Address',
																description: 'Deposit Address has been copied to clipboard.',
																placement: 'bottomRight',
															});
														}}
													/>
												</div>
												<div className="qr-code">
													<QRCode value={tokensList[selectedToken].depositAddress} size={200} />
												</div>
											</div>
										)}
										{currentStep === 1 && (
											<Form form={form} layout="vertical" onFinish={onFinish} className="deposit-form" initialValues={{ ethAddress: account }}>
												<p>Sign a message from {tokensList[selectedToken].coin} address you deposited to claim deposit. You only need to do this once & system will automatically credit all future deposits.</p>

												<Form.Item name="ethAddress" rules={[{ required: false, message: '' }]} label={`Message To Sign`} className="deposit-form-item">
													<Input placeholder={`Ethereum Address`} />
												</Form.Item>

												<Form.Item
													name="coinAddress"
													rules={[
														{
															required: true,
															message: `Please enter ${tokensList[selectedToken].coin} address you deposited from`,
														},
													]}
													label={`${tokensList[selectedToken].coin} address`}
													className="deposit-form-item"
												>
													<Input placeholder={`Enter deposited ${tokensList[selectedToken].coin} address`} />
												</Form.Item>

												<Form.Item
													name="signature"
													rules={[
														{
															required: true,
															message: 'Please enter signature hash',
														},
													]}
													label={`${tokensList[selectedToken].coin} signature`}
													className="deposit-form-item"
												>
													<Input placeholder={`Enter ${tokensList[selectedToken].coin} signature`} />
												</Form.Item>

												<Form.Item className="deposit-form-item">
													<Button className="deposit-button" type="primary" htmlType="submit">
														Claim Deposit
													</Button>
												</Form.Item>
											</Form>
										)}
									</div>
									<div className="steps-action">
										{currentStep < steps.length - 1 && (
											<Button type="primary" onClick={() => nextStep()}>
												Next
											</Button>
										)}
										{currentStep > 0 && (
											<Button style={{ margin: '0 8px' }} onClick={() => prevStep()}>
												Previous
											</Button>
										)}
									</div>
								</DepositBox>
							</Col>
						</Row>
					</DepositWrapper>
				</Tabs.TabPane>
			))}
		</StyledTabs>
	);
};

export default Deposit;
