/* eslint-disable react-hooks/exhaustive-deps */
import { formatEther } from '@ethersproject/units';
import { useWeb3React } from '@web3-react/core';
import { Avatar, Button, Col, Form, Input, Row, Tabs } from 'antd';
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

const Burn = () => {
	const { account, library, chainId } = useWeb3React();

	const mainContract = useMainContract();

	const [tokensList, setTokensList] = useState([]);

	const [selectedToken, setSelectedToken] = useState(0);

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
						const addr = await mainContract.getAddress(account, token.name);
						if (addr !== '') {
							token.userAddress = addr;
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
		try {
			const contract = getThirmTokenContract(library, account, tokensList[selectedToken].address);
			const tknAmount = formatEther(values.amount);
			await contract.burn(tknAmount);
		} catch (e) {
			console.log(e);
		}
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
						<Row gutter={24} justify="space-around">
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
												Withdrawal Fees {tokensList[selectedToken].fees} {tokensList[selectedToken].name}{' '}
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
						</Row>
					</WithdrawWrapper>
				</Tabs.TabPane>
			))}
		</StyledTabs>

	);
};

export default Burn;
