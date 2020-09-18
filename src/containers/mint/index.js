import { Card, Col, Row, Select, Tabs } from 'antd';
import React, { useState } from 'react';
import QRCode from 'react-qr-code';
import { tTokensList } from './../../utils/tTokensList';
import { MintWrapper } from './style';

const { TabPane } = Tabs;
const { Option } = Select;

const Mint = () => {
	const [tokensList] = useState(tTokensList);
	const [selectedToken, setSelectedToken] = useState('');
	function onChangeToken(value) {
		setSelectedToken(value);
	}

	return (
		<>
			<Row>
				<Col xs={24}>
					<Card>
						<MintWrapper>
							<Tabs defaultActiveKey="1" centered>
								<TabPane tab="ERC20" key="1">
									<div className="qr-code">
										<QRCode value="0xA34eF48B73870FA2ACa1558239576cCBC60Ad542" size={200} />
									</div>
									<p className="deposite-info">Deposite Address: 0xA34eF48B73870FA2ACa1558239576cCBC60Ad542</p>
								</TabPane>
								<TabPane tab="Non ERC20" key="2">
									<Row>
										<Col xs={24}>
											<p>Select Token</p>
											<p>
												<Select style={{ width: 200 }} allowClear onChange={onChangeToken} placeholder="Select Coin">
													{tokensList.map((tkn) => (
														<Option value={tkn.depositaddress}>{tkn.name}</Option>
													))}
												</Select>
											</p>

											<div className="qr-code">{selectedToken && <QRCode value={selectedToken} size={200} />}</div>
											{selectedToken && <p className="deposite-info">Deposite Address: {selectedToken}</p>}
										</Col>
									</Row>
								</TabPane>
							</Tabs>
						</MintWrapper>
					</Card>
				</Col>
			</Row>
		</>
	);
};

export default Mint;
