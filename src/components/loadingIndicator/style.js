
import styled from 'styled-components';
import { ThirmTheme } from './../../containers/globalStyle';

export const LoadingContainer = styled.div`
  display:flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50vh;
  .loading-text {
    margin-top: 16px;
    color: ${ThirmTheme.textColorGrey};
    font-size: 16px;
  }
`;