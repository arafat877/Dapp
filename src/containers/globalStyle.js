import { Drawer, Layout } from 'antd';
import styled from 'styled-components';

export const StyledContent = styled(Layout.Content)`
  margin: 32px auto;
  padding: 48px;
  background-color: #fefefe;
  @media (max-width: 768px) {
    margin: 60px auto;
    padding: 16px;
  }
`;

export const StyledHeader = styled(Layout.Header)`
  background-color: #fff;
  box-shadow: 0 5px 10px rgba(154,160,185,.05), 0 15px 40px rgba(166,173,201,.10);
  padding: 0 8px;
  position: fixed;
  z-index: 99;
  width: 100%;
`;

export const StyledSider = styled(Layout.Sider)`
  background-color: #fff;
  box-shadow: 0 5px 10px rgba(154,160,185,.10), 0 15px 40px rgba(166,173,201,.15);
  margin: 0;
  padding: 0;
  min-height: 100vh;
  position: relative;
  overflow: hidden;
`;

export const StyledDrawer = styled(Drawer)`
  background-color: #fafafa;
`;


