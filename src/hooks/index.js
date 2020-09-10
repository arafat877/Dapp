import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import { injected, walletConnect, walletlink } from "./connectors";

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