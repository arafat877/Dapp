/* eslint-disable react-hooks/exhaustive-deps */
import { CheckOutlined, LoadingOutlined } from '@ant-design/icons';
import { formatEther, parseEther } from '@ethersproject/units';
import { useWeb3React } from '@web3-react/core';
import { Alert, Avatar, Button, Col, Form, Input, Modal, notification, Row, Steps, Tabs } from 'antd';
import Meta from 'antd/lib/card/Meta';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { useMainContract } from '../../hooks';
import config from '../../utils/config';
import { getThirmTokenContract } from "../../utils/helpers";
import LoadingIndicator from './../../components/loadingIndicator/index';
import { useThirmContract } from './../../hooks/index';
import { collapsedState } from './../../utils/recoilStates';
import { StyledButton } from './../globalStyle';
import { StyledTabs, TokenCard, WithdrawBox, WithdrawWrapper } from './style';


const { Step } = Steps;

const ALLOWANCE_LIMIT = 1000000;

const WithDraw = () => {
	const { account, library, chainId } = useWeb3React();

	const mainContract = useMainContract();

	const thirmContract = useThirmContract();

	const [tokensList, setTokensList] = useState([]);

	const [selectedToken, setSelectedToken] = useState(0);

	const [withDrawModalVisible, setWithDrawModalVisible] = useState(false);

	const [withDrawAmount, setWithDrawAmount] = useState(false);

	const [withdrawTokenAddress, setWithdrawTokenAddress] = useState(false);

	const [currentWithdrawStep, setCurrentWithdrawStep] = useState(0);

	const [processingApproval, setProcessingApproval] = useState(false);

	const [lowThirmWarning, setLowThirmWarning] = useState(false);

	const collapsed = useRecoilValue(collapsedState);

	const [form] = Form.useForm();

	const history = useHistory();

	useEffect(() => {
		let stale = false;

		const getTokensList = async () => {

			const params = history.location.state;

			if (params && params.token) {
				setSelectedToken(params.token.toString());
			}

			let tokensListTemp = [...config.tokens];

			const thrmBal = formatEther(await thirmContract.balanceOf(account));

			if (thrmBal < 10) {
				setLowThirmWarning(true);
			}

			try {

				tokensListTemp = await Promise.all(
					tokensListTemp.map(async (token) => {
						token.approved = false;
						const tokenContract = getThirmTokenContract(library, account, token.address);

						const allowance = parseInt(formatEther(await tokenContract.allowance(account, config.CONTRACT_ADDRESS)));

						if (allowance && allowance >= ALLOWANCE_LIMIT) {
							token.approved = true;
						}
						return token;
					})
				);

			} catch (e) {
				console.log(e);
			}

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
	};

	const onTokenMax = async () => {

		try {
			const contract = getThirmTokenContract(library, account, tokensList[selectedToken].address);
			const bal = await contract.balanceOf(account);
			if (bal) {
				const ethBal = parseFloat(formatEther(bal)).toFixed(8);
				form.setFieldsValue({
					amount: ethBal,
				});
			}
		} catch (e) {
			console.log(e);
			form.setFieldsValue({
				amount: (0).toFixed(8),
			});
		}
	};

	const onFinish = async (values) => {
		setWithDrawModalVisible(true);
		setWithDrawAmount(values.amount);
		setWithdrawTokenAddress(values.tokenAddress);
		setCurrentWithdrawStep(0);

		try {

			const tokenContract = getThirmTokenContract(library, account, config.THIRM_TOKEN_ADDRESS);

			const allowance = parseInt(formatEther(await tokenContract.allowance(account, config.CONTRACT_ADDRESS)));

			if (allowance >= ALLOWANCE_LIMIT) {
				setCurrentWithdrawStep(1);
				if (tokensList[selectedToken].approved) {
					setCurrentWithdrawStep(2);
				}
			}
		} catch (e) {
			console.log(e);
		}

	};

	const approveThirm = async () => {

		try {

			const tokenContract = getThirmTokenContract(library, account, config.THIRM_TOKEN_ADDRESS);

			const tknAmount = parseEther(ALLOWANCE_LIMIT + "");
			const approved = await tokenContract.approve(config.CONTRACT_ADDRESS, tknAmount);

			setProcessingApproval(true);
			library.once(approved.hash, () => {
				setProcessingApproval(false);
				if (tokensList[selectedToken].approved) {
					setCurrentWithdrawStep(2);
				} else {
					setCurrentWithdrawStep(1);
				}
			});

		} catch (e) {
			console.log(e);
		}
	}

	const approveCurrentToken = async () => {

		try {

			const tokenContract = getThirmTokenContract(library, account, tokensList[selectedToken].address);

			const tknAmount = parseEther(ALLOWANCE_LIMIT + "");
			const approved = await tokenContract.approve(config.CONTRACT_ADDRESS, tknAmount);

			setProcessingApproval(true);
			library.once(approved.hash, () => {
				setProcessingApproval(false);
				tokensList[selectedToken].approved = true;
				setCurrentWithdrawStep(2);
			});

		} catch (e) {
			console.log(e);
		}
	}

	const finishWithdraw = async () => {

		try {

			const tknAmount = parseEther(withDrawAmount);

			const withdrawed = await mainContract.registerWithdrawal(tokensList[selectedToken].coin, withdrawTokenAddress, tknAmount, {
				gasLimit: 500000
			});

			setProcessingApproval(true);
			library.once(withdrawed.hash, () => {
				setProcessingApproval(false);
				setWithDrawModalVisible(false);

				notification["success"]({
					message: 'Withdrawed',
					description:
						`You have successfully withdrawed ${withDrawAmount} ${tokensList[selectedToken].coin}`,
					placement: 'bottomRight'
				});

			});

		} catch (e) {
			console.log(e);
		}
	}


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
					<WithdrawWrapper>
						<Row gutter={24} justify="space-around">
							<Col xs={24} xl={20} xxl={14}>
								<WithdrawBox>
									<Form
										form={form}
										layout="vertical"
										onFinish={onFinish}
										className="withdraw-form"
									>

										<Form.Item
											name="tokenAddress"
											rules={[{
												required: true,
												message: 'Please input token address'
											}]}
											label={`${tokensList[selectedToken].coin} address`}
											className="withdraw-form-item">
											<Input
												placeholder={`Enter ${tokensList[selectedToken].coin} address`}
											/>
										</Form.Item>

										<Form.Item
											name="amount"
											rules={[{
												required: true,
												message: 'Please input token Amount'
											}]}
											label="Number of tokens to withdraw"
											className="withdraw-form-item">
											<Input
												placeholder="Enter Number of tokens to withdraw"
												suffix={
													<Button type="primary" danger onClick={onTokenMax}>
														MAX
													</Button>
												}
											/>
										</Form.Item>

										<p className="withdraw-info">Withdraw Fee: 1 THIRM</p>
										{
											lowThirmWarning && <p className="withdraw-info">

												<Alert message="You have less than 10 THIRM. Do you still want to continue?" type="warning" showIcon />
											</p>
										}

										<Form.Item className="withdraw-form-item">
											<StyledButton className="withdraw-button" type="primary" htmlType="submit">
												Withdraw
											</StyledButton>
										</Form.Item>
									</Form>

									<Modal
										title="Withdraw"
										visible={withDrawModalVisible}
										onOk={() => setWithDrawModalVisible(false)}
										onCancel={() => setWithDrawModalVisible(false)}
										footer={null}
									>
										<Steps direction="vertical" current={currentWithdrawStep}>

											<Step title="Approve THIRM" description={
												<StyledButton className="withdraw-button" type="primary" icon={currentWithdrawStep > 0 && <CheckOutlined />} onClick={approveThirm} disabled={currentWithdrawStep !== 0}>
													{
														currentWithdrawStep > 0 ? "Approved" : "Approve"
													}
												</StyledButton>
											}
												icon={currentWithdrawStep === 0 && processingApproval && <LoadingOutlined />}
											/>

											<Step title={`Approve ${tokensList[selectedToken].coin}`} description={
												<StyledButton className="withdraw-button" type="primary" icon={currentWithdrawStep > 1 && <CheckOutlined />} onClick={approveCurrentToken} disabled={currentWithdrawStep !== 1}>
													{
														currentWithdrawStep > 1 ? "Approved" : "Approve"
													}
												</StyledButton>
											}
												icon={currentWithdrawStep === 1 && processingApproval && <LoadingOutlined />}
											/>

											<Step title="Withdraw" description={
												<StyledButton type="primary" icon={currentWithdrawStep > 2 && <CheckOutlined />} onClick={finishWithdraw} disabled={currentWithdrawStep !== 2}>
													WithDraw
											</StyledButton>
											}
												icon={currentWithdrawStep === 2 && processingApproval && <LoadingOutlined />}
											/>

										</Steps>
									</Modal>

								</WithdrawBox>
							</Col>
						</Row>
					</WithdrawWrapper>
				</Tabs.TabPane>
			))}
		</StyledTabs>

	);
};

export default WithDraw;
