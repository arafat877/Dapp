import { Drawer, Layout } from 'antd';
import styled from 'styled-components';

export const StyledContent = styled(Layout.Content)`
  padding: 36px;
  max-width: 850px;
  margin: 36px auto;
  display: flex;
  @media (max-width: 1200px) {
    margin: 24px auto;
    max-width: 750px;
  }
   @media (max-width: 992px) {
    margin: 24px auto;
    max-width: 576px;
  }

  @media (max-width: 768px) {
    margin: 16px auto;
    max-width: 95%;
  }
  @media (max-width: 576px) {
    margin: 0 auto;
    max-width: 100%;
  }
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


