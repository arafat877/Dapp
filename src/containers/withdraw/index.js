/* eslint-disable react-hooks/exhaustive-deps */
import { LoadingOutlined } from '@ant-design/icons';
import { formatEther, parseEther } from '@ethersproject/units';
import { useWeb3React } from '@web3-react/core';
import { Avatar, Button, Col, Form, Input, Modal, Row, Steps, Tabs } from 'antd';
import Meta from 'antd/lib/card/Meta';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { useMainContract } from '../../hooks';
import { getThirmTokenContract } from "../../utils/helpers";
import LoadingIndicator from './../../components/loadingIndicator/index';
import config from './../../utils/config.json';
import { collapsedState } from './../../utils/recoilStates';
import { StyledTabs, TokenCard, WithdrawBox, WithdrawWrapper } from './style';


const { Step } = Steps;

const ALLOWANCE_LIMIT = 1000000;

const WithDraw = () => {
	const { account, library, chainId } = useWeb3React();

	const mainContract = useMainContract();

	const [tokensList, setTokensList] = useState([]);

	const [selectedToken, setSelectedToken] = useState(0);

	const [withDrawModalVisible, setWithDrawModalVisible] = useState(false);

	const [withDrawAmount, setWithDrawAmount] = useState(false);

	const [withdrawTokenAddress, setWithdrawTokenAddress] = useState(false);

	const [currentWithdrawStep, setCurrentWithdrawStep] = useState(0);

	const [processingApproval, setProcessingApproval] = useState(false);

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

			let tokensListTemp = [...config[chainId].tokens];

			try {

				tokensListTemp = await Promise.all(
					tokensListTemp.map(async (token) => {
						token.approved = false;
						const tokenContract = getThirmTokenContract(library, account, token.address);

						const allowance = parseInt(formatEther(await tokenContract.allowance(account, config[chainId].CONTRACT_ADDRESS)));

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
		}
	};

	const onFinish = async (values) => {
		setWithDrawModalVisible(true);
		setWithDrawAmount(values.amount);
		setWithdrawTokenAddress(values.tokenAddress);
		setCurrentWithdrawStep(0);

		try {

			const tokenContract = getThirmTokenContract(library, account, config[chainId].THIRM_TOKEN_ADDRESS);

			const allowance = parseInt(formatEther(await tokenContract.allowance(account, config[chainId].CONTRACT_ADDRESS)));

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

			const tokenContract = getThirmTokenContract(library, account, config[chainId].THIRM_TOKEN_ADDRESS);

			const tknAmount = parseEther(ALLOWANCE_LIMIT + "");
			await tokenContract.approve(config[chainId].CONTRACT_ADDRESS, tknAmount);

			setProcessingApproval(true);
			const checkAllowance = setInterval(async () => {
				const allowance = parseInt(formatEther(await tokenContract.allowance(account, config[chainId].CONTRACT_ADDRESS)));

				if (allowance >= ALLOWANCE_LIMIT) {
					clearInterval(checkAllowance);
					setProcessingApproval(false);
					if (tokensList[selectedToken].approved) {
						setCurrentWithdrawStep(2);
					} else {
						setCurrentWithdrawStep(1);
					}
				}
			}, 5000);

		} catch (e) {
			console.log(e);
		}
	}

	const approveCurrentToken = async () => {

		try {

			const tokenContract = getThirmTokenContract(library, account, tokensList[selectedToken].address);

			const allowance = parseInt(formatEther(await tokenContract.allowance(account, config[chainId].CONTRACT_ADDRESS)));

			if (allowance >= ALLOWANCE_LIMIT) {
				setCurrentWithdrawStep(2);
				return;
			}

			const tknAmount = parseEther(ALLOWANCE_LIMIT + "");
			await tokenContract.approve(config[chainId].CONTRACT_ADDRESS, tknAmount);

			setProcessingApproval(true);
			const checkAllowance = setInterval(async () => {
				const allowance = parseInt(formatEther(await tokenContract.allowance(account, config[chainId].CONTRACT_ADDRESS)));

				if (allowance >= ALLOWANCE_LIMIT) {
					tokensList[selectedToken].approved = true;
					setProcessingApproval(false);
					setCurrentWithdrawStep(2);
					clearInterval(checkAllowance);
				}
			}, 5000);

		} catch (e) {
			console.log(e);
		}
	}

	const finishWithdraw = async () => {

		try {

			const tknAmount = parseEther(withDrawAmount);

			await mainContract.registerWithdrawal(tokensList[selectedToken].name, withdrawTokenAddress, tknAmount);

			setWithDrawModalVisible(false);

		} catch (e) {
			console.log(e);
		}
	}

	const onChangeToken = (value) => {
		setSelectedToken(value);
	};

	if (tokensList.length === 0) return <LoadingIndicator />;

	return (

		<StyledTabs defaultActiveKey={selectedToken} tabPosition={collapsed ? 'top' : 'left'} onChange={onChangeToken} type="card">
			{tokensList.map((tkn) => (
				<Tabs.TabPane
					tab={
						<TokenCard>
							<Meta avatar={<Avatar src={tkn.image} size="small" />} title={tkn.name} />
						</TokenCard>
					}
					key={tkn.id}
				>
					<WithdrawWrapper>
						<Row gutter={24} justify="space-around">
							<Col xs={24} xl={12}>
								<WithdrawBox>
									<Form form={form} layout="vertical" onFinish={onFinish} className="withdraw-form">

										<Form.Item name="tokenAddress" rules={[{ required: true, message: 'Please input token address' }]} label={`${tokensList[selectedToken].name} address`} className="withdraw-form-item">
											<Input
												placeholder={`Enter ${tokensList[selectedToken].name} address`}
											/>
										</Form.Item>

										<Form.Item name="amount" rules={[{ required: true, message: 'Please input token Amount' }]} label="Number of tokens to withdraw" className="withdraw-form-item">
											<Input
												placeholder="Enter Number of tokens to withdraw"
												suffix={
													<Button type="primary" danger onClick={onTokenMax}>
														MAX
													</Button>
												}
											/>
										</Form.Item>

										<Form.Item className="withdraw-form-item">
											<Button className="withdraw-button" type="primary" htmlType="submit">
												Withdraw
											</Button>
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
												<Button className="withdraw-button" type="primary" onClick={approveThirm} disabled={currentWithdrawStep !== 0}>
													Approve
											</Button>
											}

												icon={currentWithdrawStep === 0 && processingApproval && <LoadingOutlined />}
											/>

											<Step title={`Approve ${tokensList[selectedToken].name}`} description={
												<Button className="withdraw-button" type="primary" onClick={approveCurrentToken} disabled={currentWithdrawStep !== 1}>
													Approve
											</Button>
											}
												icon={currentWithdrawStep === 1 && processingApproval && <LoadingOutlined />}
											/>

											<Step title="Withdraw" description={
												<Button className="withdraw-button" type="primary" onClick={finishWithdraw} disabled={currentWithdrawStep !== 2}>
													WithDraw
											</Button>
											} />

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
