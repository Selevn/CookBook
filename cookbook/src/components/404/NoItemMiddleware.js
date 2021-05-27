import {withRouter, Redirect} from "react-router-dom";
import {STATE} from "../../constants";
import {hasItem as getItem} from "../../Connectors/dataProvider";
import {useEffect, useState} from "react";
import {Loading} from "../MultyUsed/Loading/Loading";


export const NotFoundMiddleware = ({children, match, propType}) => {
    const [hasItem, setHasItem] = useState(STATE.INIT);
    const {id, type: paramType} = match.params;
    const type = propType || paramType;
    useEffect(() => {
        (async () => {
            console.log(type)
            console.log(id)
            const data = await getItem(type, id)
            if (data) setHasItem(STATE.OK)
            else setHasItem(STATE.FAIL)
        })()
    }, [type, id, setHasItem])

    return (
        <>
            {hasItem === STATE.INIT && <Loading/>}
            {hasItem === STATE.OK && <>{children}</>}
            {hasItem === STATE.FAIL && <Redirect to="/404"/>}
        </>)
}

export default withRouter(NotFoundMiddleware);
