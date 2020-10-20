/* eslint-disable react-hooks/exhaustive-deps */
import { CopyOutlined } from '@ant-design/icons';
import { useWeb3React } from '@web3-react/core';
import { Avatar, Col, notification, Row, Tabs, Tag } from 'antd';
import Meta from 'antd/lib/card/Meta';
import React, { useEffect, useState } from 'react';
import QRCode from 'react-qr-code';
import { useHistory } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import LoadingIndicator from './../../components/loadingIndicator/index';
import { collapsedState } from './../../utils/recoilStates';
import { StyledTabs, TokenCard } from './../burn/style';
import { MintBox, MintWrapper } from './style';

const config = require('../../utils/config.json');

const Mint = () => {
	const { account, chainId } = useWeb3React();

	const [tokensList, setTokensList] = useState([]);

	const [selectedToken, setSelectedToken] = useState(0);

	const collapsed = useRecoilValue(collapsedState);

	const history = useHistory();

	useEffect(() => {
		let stale = false;

		const getTokenAddress = async () => {
			const params = history.location.state;

			if (params && params.token) {
				setSelectedToken(params.token.toString());
			}

			let tokensListTemp = [...config[chainId].tokens];

			if (!stale) {
				setTokensList(tokensListTemp);
			}
		};

		getTokenAddress();

		return () => {
			stale = true;
		};
	}, [account, chainId]);

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
					<MintWrapper>
						<Row gutter={24} justify="space-around">
							<Col xs={24} xl={12}>
								<MintBox>
									<div className="qr-code">{selectedToken != null && <QRCode value={tokensList[selectedToken].depositaddress} size={200} />}</div>

									<div className="deposit-info">
										<Tag color="magenta">{tokensList[selectedToken].depositaddress}</Tag>
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

									{selectedToken != null && (
										<p className="fee-info">
											Deposit Fees {tokensList[selectedToken].fees} {tokensList[selectedToken].name}{' '}
										</p>
									)}
								</MintBox>
							</Col>
						</Row>
					</MintWrapper>
				</Tabs.TabPane>
			))}
		</StyledTabs>
	);
};

export default Mint;
