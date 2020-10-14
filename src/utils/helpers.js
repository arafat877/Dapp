import { Contract } from '@ethersproject/contracts';
const ttokensAbi = require(`../utils/abis/ttokens.json`);

export const formatFrontBackBalance = (balance) => {
  let balanceFront = '';
  let balanceBack = '';
  if (balance !== null && balance !== undefined) {
    const balanceSplit = parseFloat(balance).toFixed(8).toString().split('.');
    balanceFront = balanceSplit[0];
    balanceBack = balanceSplit[1];
  }
  return [balanceFront, balanceBack];
}

export const getThirmTokenContract = (library, account, address) => {
  return new Contract(address, ttokensAbi, library.getSigner(account).connectUnchecked());
}