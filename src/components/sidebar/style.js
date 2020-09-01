import { Menu } from 'antd';
import styled from 'styled-components';

export const SideBarArea = styled.div`
  display: flex;
  position: sticky;
  top: 0;
  left: 0;
  flex-direction: column;
`;

export const Intro = styled.div`
  text-align: center;
  padding: 8px 16px;
`;

export const SideMenu = styled(Menu)`
  background-color: transparent;
`;

