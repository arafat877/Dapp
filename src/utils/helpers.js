import { formatEther } from '@ethersproject/units';

export const formatFrontBackBalance = (balance) => {
  let balanceFront = '';
  let balanceBack = '';
  if (balance !== null && balance !== undefined) {
    const balanceSplit = parseFloat(formatEther(balance)).toFixed(8).toString().split('.');
    balanceFront = balanceSplit[0];
    balanceBack = balanceSplit[1];
  }
  return [balanceFront, balanceBack];
}