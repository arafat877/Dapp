/* eslint-disable react-hooks/exhaustive-deps */
import { Card, List } from 'antd';
import React, { useEffect, useState } from 'react';
import { PLATFORM_LIST_URL } from '../../utils/config';
import LoadingIndicator from './../../components/loadingIndicator/index';
import { TokenCard } from './style';

const { Meta } = Card;

const Platform = () => {

	const [platformsList, setPlatformsList] = useState([]);

	useEffect(() => {

		let stale = false

		const getPlatformsList = async () => {
			const platformsJson = await fetch(PLATFORM_LIST_URL).then((res) => res.json());

			if (!stale) {
				setPlatformsList(platformsJson);
			}
		}

		getPlatformsList();

		return () => {
			stale = true;
		};

	});

	if (platformsList.length === 0) return <LoadingIndicator />;

	return (
		<List
			grid={{ gutter: 20, xs: 1 }}
			dataSource={platformsList}
			renderItem={(item, id) => (
				<List.Item>
					<TokenCard>
						<Meta title={item.Platform} description={<p>{item.Defination}</p>} />
					</TokenCard>
				</List.Item>
			)}
		/>
	);
};

export default Platform;
