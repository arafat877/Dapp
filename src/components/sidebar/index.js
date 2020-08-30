import { useWeb3React } from '@web3-react/core';
import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';
const SideBar = () => {
  const context = useWeb3React();
  const {
    deactivate,
    active,
    error
  } = context;

  return (<div className="sidebar">
    <div className="intro">
      <h3>Welcome to Thirm</h3>
      <p>Connect an Ethereum wallet to manage your DeFi portfolio</p>
      <div>
        {(active || error) && (
          <button className="wallet-connect-button"
            onClick={() => {
              deactivate();
            }}
          >
            Deactivate
          </button>
        )}
        {!!error && (
          <p>
            {error}
          </p>
        )}
      </div>
    </div>
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/wallet">Wallet</Link></li>
    </ul>
  </div>);
}

export default SideBar;