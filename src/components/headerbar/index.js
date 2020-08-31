import { DownOutlined } from '@ant-design/icons';
import { useWeb3React } from '@web3-react/core';
import { Col, Menu, Row } from 'antd';
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { AccountAvatar, AccountDropDown, AccountSwitch, HeaderBarArea } from './style';

const menu = ({ active, error, deactivate, history }) => (
  <Menu>
    <Menu.Item key="0">
      <Link>Account 2</Link>
    </Menu.Item>
    <Menu.Item key="1">
      <Link>Account 3</Link>
    </Menu.Item>
    {(active || error) && (<Menu.Divider />)}
    <Menu.Item key="3">
      <div>
        {(active || error) && (
          <Link
            onClick={() => {
              deactivate();
              history.push("/");
            }}
          >
            Disconnect
          </Link>
        )}
        {!!error && (
          <p>
            {error}
          </p>
        )}
      </div>
    </Menu.Item>
  </Menu>
);

const HeaderBar = (props) => {
  const context = useWeb3React();
  const {
    deactivate,
    active,
    error,
    account
  } = context;

  const history = useHistory();

  return (
    <HeaderBarArea>
      <Row justify="end">
        <Col span={{ xs: 6 }}>
          {
            account && <AccountSwitch>
              <AccountDropDown overlay={menu({ active, error, deactivate, history })} trigger={['click']}>
                <Link>
                  <AccountAvatar src={`https://robohash.org/${account}?set=set5`} />
                  <span>
                    {`${account.substr(0, 20)}...`}
                  </span>
                  <DownOutlined />
                </Link>
              </AccountDropDown>
            </AccountSwitch>
          }
        </Col>
      </Row>
    </HeaderBarArea>
  );
}

export default HeaderBar;