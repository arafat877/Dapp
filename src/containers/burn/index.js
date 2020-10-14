import { formatEther } from '@ethersproject/units';
import { useWeb3React } from '@web3-react/core';
import { Avatar, Button, Col, Form, Input, Row, Tabs } from 'antd';
import Meta from 'antd/lib/card/Meta';
import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useMainContract } from '../../hooks';
import { getThirmTokenContract } from "../../utils/helpers";
import LoadingIndicator from './../../components/loadingIndicator/index';
import config from './../../utils/config.json';
import { collapsedState } from './../../utils/recoilStates';
import { StyledTabs, TokenCard, WithdrawBox, WithdrawWrapper } from './style';

const Burn = () => {
	const { account, library } = useWeb3React();

	const mainContract = useMainContract();

	const [tokensList, setTokensList] = useState([]);

	const [selectedToken, setSelectedToken] = useState(0);

	const collapsed = useRecoilValue(collapsedState);

	const [form] = Form.useForm();
	const [form2] = Form.useForm();

	useEffect(() => {
		let stale = false;

		const getTokensList = async () => {
			let tokensListTemp = config.tokens;
			try {
				tokensListTemp = await Promise.all(
					tokensListTemp.map(async (token) => {
						if (token.isERC === 0) {
							const addr = await mainContract.getAddress(account, token.name);
							if (addr !== '') {
								token.userAddress = addr;
							} else {
								token.userAddress = null;
							}
						} else {
							token.userAddress = null;
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
	}, [account, mainContract]);


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
		try {
			const contract = getThirmTokenContract(library, account, tokensList[selectedToken].address);
			const tknAmount = formatEther(values.amount);
			await contract.burn(tknAmount);
		} catch (e) {
			console.log(e);
		}
	};

	const setTokenAddress = async (address) => {

		try {
			const res = await mainContract.setAddress(tokensList[selectedToken].name, address);

			if (res) {
				let tempTokenList = [...tokensList];

				tempTokenList = tempTokenList.map((token) => {
					if (Object.keys(res).length > 0 && token.name === tokensList[selectedToken].name) {
						token.userAddress = address;
					}
					return token;
				});
				setTokensList(tempTokenList);
			}
		} catch (e) {
			console.log(e);
		}
	};

	const onAddressSubmitted = (values) => {
		setTokenAddress(values.address);
	};

	const onChangeToken = (value) => {
		setSelectedToken(value);
	};

	if (tokensList.length === 0) return <LoadingIndicator />;

	return (

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
					<WithdrawWrapper>
						<Row gutter={24}>
							<Col xs={24} xl={12}>
								<WithdrawBox>
									<Form form={form} layout="vertical" onFinish={onFinish} className="withdraw-form">
										<Form.Item name="amount" rules={[{ required: true, message: 'Please input token Amount' }]} label="Enter number of tokens" className="withdraw-form-item">
											<Input
												placeholder="Number of tokens to burn"
												suffix={
													<Button type="primary" danger onClick={onTokenMax}>
														MAX
													</Button>
												}
											/>
										</Form.Item>
										{selectedToken != null && (
											<p className="fee-info">
												<p>
													Withdrawal Fees {tokensList[selectedToken].fees} {tokensList[selectedToken].name}{' '}
												</p>
											</p>
										)}
										<Form.Item className="withdraw-form-item">
											<Button className="withdraw-button" type="primary" htmlType="submit">
												Withdraw
											</Button>
										</Form.Item>
									</Form>
								</WithdrawBox>
							</Col>

							{tokensList[selectedToken].isERC === 0 && (
								<Col xs={24} xl={12}>
									<WithdrawBox>
										<p className="address-info">{tokensList[selectedToken].userAddress !== null ? '' : 'You have not set the address.'}</p>
										<Form
											form={form2}
											layout="vertical"
											onFinish={onAddressSubmitted}
											className="withdraw-form"
											initialValues={{
												address: tokensList[selectedToken].userAddress,
											}}
										>
											<Form.Item
												className="withdraw-form-item"
												name="address"
												label={`Enter your ${tokensList[selectedToken].name} Address`}
												i
												required
												rules={[
													{
														required: true,
														message: 'Address Required',
													},
												]}
											>
												<Input placeholder="Address" />
											</Form.Item>
											<Form.Item>
												<Button type="primary" htmlType="submit" className="withdraw-button">
													{`${tokensList[selectedToken].userAddress === null ? 'Set Address' : 'Change Address'}`}
												</Button>
											</Form.Item>
										</Form>
									</WithdrawBox>
								</Col>
							)}
						</Row>
					</WithdrawWrapper>
				</Tabs.TabPane>
			))}
		</StyledTabs>

	);
};

export default Burn;
