import React from "react";
import styled, {css} from "styled-components";


const StatusStyled = styled.span<{status:number}>`
    
  ${p => p.status===0 && css`color:green`}
  ${p => p.status===1 && css`color:orange`}
  ${p => p.status===2 && css`color:red`}

`

const UserStatus = ({status}:{status:number}) :React.ReactElement => {
    let content:string = "Active";
    if(status === 0 || Number.isNaN(status))
        status = 0
    if(status === 1)
        content = "Blocked"
    if(status === 2)
        content = "Deleted"

    return (
        <StatusStyled status={status}>
            {content}
        </StatusStyled>
    )
}

export default React.memo(UserStatus)