import { Spin } from 'antd';
import React from 'react';
import { LoadingContainer } from './style';

const LoadingIndicator = () => {
  return (<LoadingContainer>
    <Spin size="large" />
    <p className="loading-text">Loading</p>
  </LoadingContainer>);
}

export default LoadingIndicator;