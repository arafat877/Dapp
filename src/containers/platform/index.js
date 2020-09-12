/* eslint-disable react-hooks/exhaustive-deps */
import { Card, List } from 'antd';
import React, { useState } from 'react';
import { TokenCard } from './style';
import tPlatformList from './tPlatformList';

const { Meta } = Card;

const Platform = () => {

  const [platformsList] = useState(tPlatformList);

  return (
    <>
      <List
        grid={{ gutter: 16, xs: 1 }}
        dataSource={platformsList.platforms}
        renderItem={(item, id) => (
          <List.Item>
            <TokenCard
            >
              <Meta
                title={item.Platform}
                description={<p>{item.Defination}</p>}
              />
            </TokenCard>
          </List.Item>
        )}
      />
    </>
  );
}

export default Platform;