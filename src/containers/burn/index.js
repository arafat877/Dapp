import { formatEther } from '@ethersproject/units';
import { useWeb3React } from '@web3-react/core';
import { Button, Col, Form, Input, Row, Select, Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import { StyledCard } from '../globalStyle';
import AddressMapJson from './../../config/addressmap.json';
import { thirmAbi } from './../../utils/config';
import { BurnInfo } from './style';

const Burn = () => {
	const { account, library } = useWeb3React();

	const [tokensList, setTokensList] = useState([]);

	const [selectedToken, setSelectedToken] = useState();

	function onChangeToken(value) {
		setSelectedToken(value);
	}

	const [form] = Form.useForm();

	useEffect(() => {
		let stale = false;

		const getTokensList = async () => {
			const tokensListTemp = AddressMapJson;

			if (!stale) {
				setTokensList(tokensListTemp);
			}
		};

		getTokensList();

		return () => {
			stale = true;
		};
	}, [account]);

	const onTokenMax = async () => {
		if (selectedToken == null) return;
		const contract = new library.web3.eth.Contract(thirmAbi, tokensList[selectedToken].address);
		const bal = await contract.methods.balanceOf(account).call();
		if (bal) {
			const ethBal = parseFloat(formatEther(bal)).toFixed(8);
			form.setFieldsValue({
				amount: ethBal
			});
		}
	}

	const onFinish = async (values) => {
		const contract = new library.web3.eth.Contract(thirmAbi, tokensList[values.token].address);
		const tokenAmountWei = library.web3.utils.toWei(values.amount, 'ether');
		await contract.methods.burn(tokenAmountWei).send({ from: account });
	};

	return (
		<Row>
			<Col xs={24}>
				<StyledCard>
					<BurnInfo>
						<Form
							form={form}
							name="basic"
							onFinish={onFinish}
						>
							<Form.Item
								name="token"
								rules={[{ required: true, message: 'Please select a token' }]}
							>
								<Select style={{ width: 300 }} allowClear placeholder="Select Coin" onChange={onChangeToken}>
									{tokensList.map((tkn) => (
										<Select.Option value={tkn.id}>{tkn.tfullname}</Select.Option>
									))}
								</Select>
							</Form.Item>
							<Form.Item
								name="amount"
								rules={[{ required: true, message: 'Please input token Amount' }]}
							>
								<Input
									style={{ width: 300 }}
									placeholder="Number of tokens to burn"
									suffix={
										<Button type="primary" danger onClick={onTokenMax}>MAX</Button>
									}
								/>
							</Form.Item>

							{selectedToken != null && <p className="deposite-info">Deposit Fees <p>
								<Tag>{tokensList[selectedToken].fees} {tokensList[selectedToken].name}</Tag>
							</p>
							</p>}

							<Form.Item
							>
								<Button className="burn-button" type="primary" htmlType="submit">Burn</Button>
							</Form.Item>
						</Form>
					</BurnInfo>
				</StyledCard>
			</Col>
		</Row>
	);
};

export default Burn;
