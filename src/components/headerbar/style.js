import { Avatar, Dropdown, Layout, Menu } from 'antd';
import styled from 'styled-components';

const { Header } = Layout;

export const HeaderBarArea = styled(Header)`
  background-color: #fbfbfb;
`;

export const SideBarArea = styled.div`
  background-color: #fbfbfb;
  height: 100%;
  display: flex;
  position: sticky;
  height: 100vh;
  top: 0;
  left: 0;
  flex-direction: column;
`;

export const Intro = styled.div`
  text-align: center;
  padding: 8px 16px;
`;

export const AccountSwitch = styled.div`
  display: grid;
`;

export const SideMenu = styled(Menu)`
  padding-top: 16px;
  background-color: #fbfbfb;
  border: 0;
  width: 100%;
  border-top: 1px solid #e3e3e3;
`;

export const AccountAvatar = styled(Avatar)`
  margin-right: 8px;
  margin-left: 8px;
`;

export const AccountDropDown = styled(Dropdown)`
  padding: 4px 0;
  margin: 0;
`;
