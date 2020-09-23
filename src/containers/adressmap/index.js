/* eslint-disable react-hooks/exhaustive-deps */
import { useWeb3React } from '@web3-react/core';
import { Avatar, Button, Card, Form, Input, List, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import LoadingIndicator from './../../components/loadingIndicator/index';
import { TokenCard } from './style';

const ttokenList = require('../../config/addressmap.json');

const { Meta } = Card;

const AddressMap = () => {
	const [tokensList, setTokensList] = useState([]);

	const { account, library } = useWeb3React();

	const [form] = Form.useForm();

	const setTokenAddress = async (address) => {
		const res = await library.contract.methods.setAddress(selectedToken.name, address).send({ from: account });

		if (res) {
			let tempTokenList = [...tokensList];

			tempTokenList = tempTokenList.map((token) => {
				if (Object.keys(res).length > 0 && token.name === selectedToken.name) {
					token.address = address;
				}
				return token;
			});
			setTokensList(tempTokenList);
		}
	};

	useEffect(() => {
		let stale = false;

		const getTokenAddress = async () => {
			let tempTokenList = ttokenList.filter((tkn) => tkn.isERC === 0);
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

	const [tokenModalVisible, setTokenModalVisible] = useState(false);
	const [selectedToken, setSelectedToken] = useState({});

	const showTokenModal = (id) => {
		setTokenModalVisible(true);
		setSelectedToken(tokensList[id]);
	};

	const handleTokenModalOk = (e) => {
		setTokenModalVisible(false);
	};

	const handleTokenModalCancel = (e) => {
		setTokenModalVisible(false);
	};

	const onAddressSubmitted = (values) => {
		setTokenAddress(values.address);
		setTokenModalVisible(false);
	};

	if (tokensList.length === 0) return <LoadingIndicator />;

	return (
		<>
			<List
				grid={{ gutter: 16, xs: 1 }}
				dataSource={tokensList}
				renderItem={(item, id) => (
					<List.Item>
						<TokenCard
							onClick={() => {

								if (item.address === '') {

									showTokenModal(id);
								}
							}}
						>
							<Meta avatar={<Avatar src={item.image} />} title={item.name} description={<p>{item.address !== '' ? item.address : `Address not set`}</p>} />
						</TokenCard>
					</List.Item>
				)}
			/>
			<Modal title={`Set address for ${selectedToken.name}`} visible={tokenModalVisible} onOk={handleTokenModalOk} onCancel={handleTokenModalCancel} footer={null}>
				{
					<Form form={form} layout="vertical" onFinish={onAddressSubmitted}>
						<Form.Item
							name="address"
							label="Enter the address"
							required
							rules={[
								{
									required: true,
									message: 'Address is required',
								},
							]}
						>
							<Input placeholder="Address" />
						</Form.Item>
						<Form.Item>
							<Button type="primary" htmlType="submit">
								Set Address
							</Button>
						</Form.Item>
					</Form>
				}
			</Modal>
		</>
	);
};

export default AddressMap;
