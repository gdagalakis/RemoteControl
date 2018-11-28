import styled from 'styled-components'
import * as vars from '../DeviceList/style.js'

export const Wrapper = styled.li`
  font-weight: ${props => (props.isHeader ? 'bold' : '')};
  width: 100%;
  display: flex;
  justify-content: flex-start;
`
export const Item = styled.div`
  border: 1px solid ${props => props.theme.border};
  padding: 10px;
  margin-left: -1px;
  margin-bottom: -1px;
  &:first-child {
    flex-grow: 0;
  }
  input {
    width: 100%;
  }
`

export const IdItem = styled(Item)`
  width: ${vars.itemIdWidth};
`

export const ItemName = styled(Item)`
  width: ${vars.itemNameWidth};
`

export const ItemIP = styled(Item)`
  width: ${vars.itemIpWidth};
`

export const ItemDescription = styled(Item)`
  width: ${vars.itemDescriptionWidth};
`

export const ItemActions = styled(Item)`
  width: ${vars.itemActionsWidth};
`
