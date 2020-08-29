import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';
const SideBar = () => {
  return (<div className="sidebar">
    <div className="intro">
      <h3>Welcome to Thirm</h3>
      <p>Connect an Ethereum wallet to manage your DeFi portfolio</p>
      <button className="wallet-connect-button">Connect Wallet</button>
    </div>
    <ul>
      <li><Link to="/wallet">Wallet</Link></li>
    </ul>
  </div>);
}

export default SideBar;