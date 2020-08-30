import { useWeb3React } from "@web3-react/core";
import { Button } from 'antd';
import React from 'react';
import { useHistory } from "react-router-dom";
import { useEagerConnect, useInactiveListener } from "../../hooks";
import { injected } from "../../hooks/connectors";

const connectorsByName = {
  Injected: injected,
};

const ConnectWallet = () => {
  const context = useWeb3React();
  const {
    connector,
    activate,
    error,
  } = context;

  // state for connectot activation
  const [activatingConnector, setActivatingConnector] = React.useState();
  React.useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    }
  }, [activatingConnector, connector]);

  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = useEagerConnect();

  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  useInactiveListener(!triedEager || !!activatingConnector);

  const history = useHistory();

  // Activate the current connector
  const activateWallet = (currentConnector, name) => {
    setActivatingConnector(currentConnector);
    activate(connectorsByName[name]);
    history.push("/overview");
  }

  return (
    <div>
      <p>Log In to Thirm Wallet with</p>
      {Object.keys(connectorsByName).map(name => {
        const currentConnector = connectorsByName[name];
        const activating = currentConnector === activatingConnector;
        const connected = currentConnector === connector;
        const disabled =
          !triedEager || !!activatingConnector || connected || !!error;
        return (
          <Button
            type="primary"
            disabled={disabled}
            key={name}
            onClick={() => {
              activateWallet(currentConnector, name);
            }}>
            {activating && (
              <div>Loading</div>
            )}
            {connected ? (
              <span role="img" aria-label="check">
                ✅ Connected
              </span>) : (<span>Connect with Metamask</span>
              )}
          </Button>
        );
      })}
    </div>
  );
}

export default ConnectWallet;