import { Drawer, Layout } from 'antd';
import styled from 'styled-components';

export const StyledContent = styled(Layout.Content)`
  padding: 36px;
`;

export const StyledHeader = styled(Layout.Header)`
  background-color: #fbfbfb;
  position: relative;
  box-shadow: 0 5px 10px rgba(154,160,185,.05), 0 15px 40px rgba(166,173,201,.2);
  padding: 0 8px;
`;

export const StyledSider = styled(Layout.Sider)`
  background-color: #fafafa;
  box-shadow: 0 5px 10px rgba(154,160,185,.05), 0 15px 40px rgba(166,173,201,.2);
  margin: 0;
  padding: 0;
`;

export const StyledDrawer = styled(Drawer)`
  background-color: #fafafa;
`;


