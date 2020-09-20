import { Col, Row } from 'antd';
import React from 'react';
import QRCode from 'react-qr-code';
import { StyledCard } from '../globalStyle';
import { BurnInfo } from './style';

const Burn = () => {
	return (
		<Row>
			<Col xs={24}>
				<StyledCard>
					<BurnInfo>
						<QRCode value="0xA34eF48B73870FA2ACa1558239576cCBC60Ad542" size={200} />
						<div className="burn-information">
							<p>Burn your T-Tokens By Sending Them To This Address & Receive Back Locked Crypto</p>
							<p>0xA34eF48B73870FA2ACa1558239576cCBC60Ad542</p>
						</div>
					</BurnInfo>
				</StyledCard>
			</Col>
		</Row>
	);
};

export default Burn;
