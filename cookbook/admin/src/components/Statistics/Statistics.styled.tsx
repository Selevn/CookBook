import styled from "styled-components";
import {Container} from "../common/StyledComponents";

export const StatisticContainer = styled(Container)`
  padding: 26px;
  background-color: white;
  box-shadow: 0 0 16px rgba(0, 0, 0, 0.06);
  border-radius: 20px;
  min-height: calc(105px - 26px - 26px);
  min-width: calc(196px - 26px - 26px);
  display: flex;
  flex-direction: column;
  gap:15px;

  h3 {
    margin: 0;
    font-size: 18px;
    line-height: 24.55px;
  }

  p {
    font-size: 16px;
    line-height: 21.82px;
    margin: 0;

  }
`

export const SmallStatistic = styled(StatisticContainer)`
  max-height: calc(105px - 26px - 26px);
`
export const NormalStatistic = styled(StatisticContainer)`
  max-height: calc(181px - 26px - 26px);
  span:last-of-type{
    margin-left: auto;
  }
`
export const WideStatistic = styled(StatisticContainer)`
  max-height: calc(181px - 26px - 26px);
  max-width: calc(416px - 26px - 26px);
  text-align: left;
  h3{
    margin-bottom: 5px;
  }
  span:last-of-type{
    margin-left: auto;
  }
`
export const StatisticValue = styled.span`
  font-weight: bolder;
`

export const ItemStatistic = styled(StatisticContainer)`
    gap:5px;
  img{
    border-radius: 8px;
  }
`

export const StatisticRow = styled(Container)`
  gap:24px;
`
export const UserImage = styled.img`
  border-radius: 50%;
  position: relative;
  top: -25%;
  width: 32px;
  height: 32px;
`

