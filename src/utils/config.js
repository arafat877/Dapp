export const ROPSTEN_URL = 'https://ropsten.infura.io/v3/370da5783b9b4bc086067dcfb45ba7a3';
export const TOKEN_LIST_URL = 'https://raw.githubusercontent.com/thirmprotocol/Assets/master/tokens.json';
export const TOKEN_INTEREST_URL = 'https://raw.githubusercontent.com/thirmprotocol/Assets/master/i.json';

// reference contract
// https://raw.githubusercontent.com/thirmprotocol/contracts/master/thirmprotocol.sol

export const CONTRACT_ADDRESS = '0x17136874edBB6Ab273d7cb51FbFaaf4eac812B88';
export const abi = require(`./${CONTRACT_ADDRESS}.json`);

// abi hotlink
// https://api-ropsten.etherscan.io/api?module=contract&action=getabi&address=${CONTRACT_ADDRESS}&format=raw
