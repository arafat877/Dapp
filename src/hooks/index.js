import { Contract } from '@ethersproject/contracts';
import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected
} from "@web3-react/injected-connector";
import { UserRejectedRequestError as UserRejectedRequestErrorWalletConnect } from "@web3-react/walletconnect-connector";
import { useEffect, useMemo, useState } from "react";
import { injected, walletConnect, walletlink } from "./connectors";
const config = require('../utils/config.json');


const ttokensAbi = require(`../utils/abis/ttokens.json`);
const thirmProtocolAbi = require(`../utils/abis/thirmProtocol.json`);
const abi = require(`../utils/abis/abi.json`);

/*
  ****************************************************************
  * The functions are imported from
  * https://codesandbox.io/s/8rg3h?file=/src/hooks.js
  * Used to build the hook for injected method connection
  ****************************************************************
*/

export function useEagerConnect() {
  const { activate, active } = useWeb3React();

  const [tried, setTried] = useState(false);

  useEffect(() => {
    const wallet = localStorage.getItem('wallet');

    if (wallet === 'Injected') {
      injected.isAuthorized().then(isAuthorized => {
        if (isAuthorized) {
          activate(injected, undefined, true).catch(() => {
            setTried(true);
          });
        } else {
          setTried(true);
        }
      });
    } else if (wallet === 'walletlink') {
      activate(walletlink, undefined, true).catch(() => {
        setTried(true);
      });
    } else if (wallet === 'walletConnect') {
      activate(walletConnect, undefined, true).catch(() => {
        setTried(true);
      });
    }

  }, [activate, active]);

  useEffect(() => {
    if (!tried && active) {
      setTried(true);
    }
  }, [tried, active]);
  return tried;
}

export function useInactiveListener(suppress = false) {
  const { active, error, activate } = useWeb3React();

  useEffect(() => {
    const { ethereum } = window;
    if (ethereum && ethereum.on && !active && !error && !suppress) {
      const handleConnect = () => {
        console.log("Handling 'connect' event")
        activate(injected)
      }

      const handleChainChanged = chainId => {
        console.log("chainChanged", chainId);
        activate(injected);
      };

      const handleAccountsChanged = accounts => {
        console.log("accountsChanged", accounts);
        if (accounts.length > 0) {
          activate(injected);
        }
      };

      const handleNetworkChanged = networkId => {
        console.log("networkChanged", networkId);
        activate(injected);
      };
      ethereum.on('connect', handleConnect)
      ethereum.on("chainChanged", handleChainChanged);
      ethereum.on("accountsChanged", handleAccountsChanged);
      ethereum.on("networkChanged", handleNetworkChanged);

      return () => {
        if (ethereum.removeListener) {
          ethereum.removeListener("connect", handleChainChanged);
          ethereum.removeListener("chainChanged", handleChainChanged);
          ethereum.removeListener("accountsChanged", handleAccountsChanged);
          ethereum.removeListener("networkChanged", handleNetworkChanged);
        }
      };
    }

    return () => { };
  }, [active, error, suppress, activate]);
}

export function getErrorMessage(error) {
  if (error instanceof NoEthereumProviderError) {
    return "No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.";
  } else if (error instanceof UnsupportedChainIdError) {
    return `You're connected to an unsupported network. Change the network to Mainnet.`;
  } else if (
    error instanceof UserRejectedRequestErrorInjected ||
    error instanceof UserRejectedRequestErrorWalletConnect
  ) {
    return "Please authorize this website to access your Ethereum account.";
  } else {
    console.error(error);
    return "An unknown error occurred. Check the console for more details.";
  }
}

/*
  ****************************************************************
  * All the contracts hook
  ****************************************************************
*/
export function useMainContract() {
  const { library, account, chainId } = useWeb3React();

  return useMemo(() => {
    try {
      return new Contract(config[chainId].CONTRACT_ADDRESS, abi, library.getSigner(account).connectUnchecked());
    } catch (error) {
      console.error('Failed to get contract', error)
      return null
    }
  }, [chainId, library, account]);
}

export function useThirmContract() {
  const { library, account, chainId } = useWeb3React();

  return useMemo(() => {
    try {
      return new Contract(config[chainId].THIRM_TOKEN_ADDRESS, ttokensAbi, library.getSigner(account).connectUnchecked());
    } catch (error) {
      console.error('Failed to get contract', error)
      return null
    }
  }, [chainId, library, account]);
}


export function useThirmProtocolContract() {
  const { library, account, chainId } = useWeb3React();

  return useMemo(() => {
    try {
      return new Contract(config[chainId].THIRM_PROTOCOL_CONTRACT_ADDRESS, thirmProtocolAbi, library.getSigner(account).connectUnchecked());
    } catch (error) {
      console.error('Failed to get contract', error)
      return null
    }
  }, [chainId, library, account]);
}