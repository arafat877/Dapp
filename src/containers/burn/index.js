import { Card, Col, Row } from 'antd';
import React from 'react';
import QRCode from 'react-qr-code';
import { BurnInfo } from './style';

const Burn = () => {
	return (
		<Row>
			<Col xs={24}>
				<Card>
					<BurnInfo>
						<QRCode value="0x0000000000000000000000000000000000000000" size={200} />
						<div className="burn-information">
							<p>Burn your T-Tokens By Sending Them To This Address & Receive Back Locked Crypto</p>
							<p>0x0000000000000000000000000000000000000000</p>
						</div>
					</BurnInfo>
				</Card>
			</Col>
		</Row>
	);
};

export default Burn;
