import styled from 'styled-components';
import { StyledCard } from '../globalStyle';


export const DepositWrapper = styled(StyledCard)`
padding: 80px 24px;
@media only screen and (max-width: 992px) {
  padding: 36px 4px;
}
.ant-card-body {
  padding: 0;
}
`;