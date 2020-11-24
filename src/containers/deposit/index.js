/* eslint-disable react-hooks/exhaustive-deps */
import { CopyOutlined } from '@ant-design/icons';
import { useWeb3React } from '@web3-react/core';
import { Avatar, Button, Checkbox, Col, Form, Image, Input, notification, Row, Steps, Switch, Tabs, Tag } from 'antd';
import Meta from 'antd/lib/card/Meta';
import React, { useEffect, useState } from 'react';
import QRCode from 'react-qr-code';
import { useHistory } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import expertImage from '../../assets/images/expert.png';
import noobImage from '../../assets/images/noob.png';
import supportImage from "../../assets/images/support.jpg";
import { useMainContract } from '../../hooks';
import config from '../../utils/config';
import { StyledTabs, TokenCard } from '../withdraw/style';
import LoadingIndicator from './../../components/loadingIndicator/index';
import { collapsedState } from './../../utils/recoilStates';
import { DepositBox, DepositWrapper, ExpertiseButtons, NoobInfo } from './style';


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

	const [expertiseLevel, setExpertiseLevel] = useState();

	const [termAgreed, setTermAgreed] = useState(false);

	const nextStep = () => {
		setCurrentStep(currentStep + 1);
	};

	const prevStep = () => {
		setCurrentStep(currentStep - 1);
	};

	useEffect(() => {
		let stale = false;

		const getNoobExpert = async () => {
			const expertise = localStorage.getItem('expertise');
			setExpertiseLevel(expertise);
		}

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

		getNoobExpert();
		getTokensList();

		return () => {
			stale = true;
		};
	}, [account, chainId]);

	const onChangeToken = (value) => {
		setSelectedToken(value);
		setCurrentStep(0);
	};


	const onExpertiseLevelChange = (value) => {
		if (value) {
			localStorage.setItem('expertise', 'expert');
			setExpertiseLevel('expert')
		} else {
			localStorage.setItem('expertise', 'noob');
			setExpertiseLevel('noob')
		}
	}

	const onTermAgreed = (e) => {
		setTermAgreed(e.target.checked);
	}

	const checkCoinAddressMap = async (value) => {
		try {
			const mappedAddress = await mainContract.getAddressMap(value);
			if (mappedAddress === '0x0000000000000000000000000000000000000000') return null;
			return mappedAddress;
		} catch (e) {
			console.log(e);
			return null;
		}

	}

	const onFinish = async (values) => {

		if (!termAgreed) return;

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

						{
							expertiseLevel && <Row justify="end">
								<Switch
									checkedChildren={`Expert`}
									unCheckedChildren={`Noob`}
									defaultChecked={expertiseLevel === 'expert'}
									onChange={onExpertiseLevelChange}
								/>
							</Row>
						}

						<Row gutter={24} justify="space-around">
							<Col xs={24} xl={12}>

								{
									!expertiseLevel && <DepositBox>
										<h3 className="expertise-title">Select your expertise</h3>
										<ExpertiseButtons>
											<Button type="link" className="expertise-item" onClick={
												() => {
													setExpertiseLevel("noob")
												}
											}>
												<Image
													alt=""
													preview={false}
													width={120}
													src={noobImage}
												/>
												<p className="expertise-label">
													I'm a noob
											</p>
											</Button>

											<Button type="link" className="expertise-item" onClick={
												() => {
													setExpertiseLevel("expert")
												}
											}>
												<Image
													alt=""
													preview={false}
													width={120}
													src={expertImage}
												/>
												<p className="expertise-label">
													I'm an expert
											</p>
											</Button>
										</ExpertiseButtons>

									</DepositBox>
								}

								{
									expertiseLevel && expertiseLevel === 'expert' && <DepositBox>
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
																navigator.clipboard.writeText(tokensList[selectedToken].depositAddress);
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
													<p className="deposit-info">Estimated Deposit Fee: 4 tNANO</p>
												</div>
											)}
											{currentStep === 1 && (
												<Form form={form} layout="vertical" onFinish={onFinish} className="deposit-form" initialValues={{ ethAddress: account }}>
													<p>Sign a message from {tokensList[selectedToken].coin} address you deposited to claim deposit. You only need to do this once & system will automatically credit all future deposits.</p>

													<Form.Item
														name="ethAddress"
														rules={[{
															required: false,
															message: ''
														}]}
														label={`Message To Sign`} className="deposit-form-item">
														<Input placeholder={`Ethereum Address`} />
													</Form.Item>

													<Form.Item
														name="coinAddress"
														rules={[
															{
																required: true,
																message: `Please enter ${tokensList[selectedToken].coin} address you deposited from`,
															},
															() => ({
																async validator(rule, value) {
																	const mappedAddress = await checkCoinAddressMap(value);

																	if (mappedAddress == null) {
																		return Promise.resolve();
																	}
																	return Promise.reject(`Address mapped to ${mappedAddress} already`);
																},
															}),
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
														<Checkbox onChange={onTermAgreed} defaultChecked={termAgreed}>
															I agree that I have used my wallet and not any exchange addresses for the deposit. I'm responsible for the action I have taken.
														</Checkbox>
													</Form.Item>

													<Form.Item className="deposit-form-item">
														<Button className="deposit-button" type="primary" htmlType="submit" disabled={!termAgreed}>
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
								}

								{
									expertiseLevel && expertiseLevel === 'noob' && <DepositBox>
										<NoobInfo>
											<Image
												alt=""
												preview={false}
												src={supportImage}
											/>

											<p className="noob-message">Email us at <a href="mailto:developers@thirm.com">developer@thirm.com</a></p>
											<p className="noob-message">We will map your address for you, its a one time process after that all your deposit will be processed automatically.</p>
										</NoobInfo>
									</DepositBox>
								}

							</Col>
						</Row>
					</DepositWrapper>
				</Tabs.TabPane>
			))}
		</StyledTabs>
	);
};

export default Deposit;
