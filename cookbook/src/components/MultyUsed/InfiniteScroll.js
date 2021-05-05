import {Loading} from "./Loading/Loading";
import InfiniteScroll from "react-infinite-scroll-component";
import {useCallback, useEffect, useState} from "react";

const calculatePercent = () => {
    return window.pageYOffset / (document.querySelector('body').offsetHeight - window.innerHeight) * 100;
}

export const InfinityScroll = ({children, hasMore, loader, next}) => {
    const [loading, setLoading] = useState(false);

    const scrollHandler = async (e) => {
        if (calculatePercent() > 80){
            if(hasMore && !loading){
                setLoading(true)
                await next()
                setLoading(false)
            }
        }
    }


    useEffect(() => {
        window.addEventListener('scroll', scrollHandler);
        return () => {
            window.removeEventListener('scroll', scrollHandler);
        };
    }, []);

    return (<>
        {children}
        {loading && loader}
    </>)
}