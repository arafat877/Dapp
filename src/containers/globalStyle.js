import { Drawer, Layout } from 'antd';
import styled from 'styled-components';

export const StyledContent = styled(Layout.Content)`
  padding: 120px 36px;
  max-width: 870px;
  margin: 36px auto;
  display: flex;
  @media (max-width: 1200px) {
    margin: 24px auto;
    max-width: 760px;
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
  flex-grow: 1;
`;

export const StyledHeader = styled(Layout.Header)`
  background-color: #fbfbfb;
  box-shadow: 0 5px 10px rgba(154,160,185,.05), 0 15px 40px rgba(166,173,201,.10);
  padding: 0 8px;
  position: fixed;
  z-index: 99;
  width: 100%;
`;

export const StyledSider = styled(Layout.Sider)`
  background-color: #fbfbfb;
  box-shadow: 0 5px 10px rgba(154,160,185,.10), 0 15px 40px rgba(166,173,201,.15);
  margin: 0;
  padding: 0;
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  z-index: 98;
`;

export const SideWrapper = styled.div`
  position: fixed;
  top: 100px;
  width: 250px;
  min-height: 100vh;
  @media (max-width: 768px) {
    display: none;
  }
`;

export const StyledDrawer = styled(Drawer)`
  background-color: #fafafa;
`;


