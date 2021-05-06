import {Loading} from "./Loading/Loading";
import InfiniteScroll from "react-infinite-scroll-component";
import {useCallback, useEffect, useState} from "react";

const calculatePercent = () => {
    return window.pageYOffset / (document.querySelector('body').offsetHeight - window.innerHeight) * 100;
}

const debouncer = (func, wait) => {
    let timeout;

    return function executedFunction() {
        const context = this;

        const later = function() {
            timeout = null;
        };

        const callNow = !timeout;

        clearTimeout(timeout);

        timeout = setTimeout(later, wait);

        if (callNow) func.apply(context);
    };
};

// не работает loader потому что запрос идёт во внешнем компоненте
export const InfinityScrolls = function ({children, hasMore, loader, next, dataLength}) {

    const fetcher = useCallback(()=>{
        next()
    },[dataLength])

    const [loading, setLoading] = useState(false);
    const nextHandler = debouncer(() => {
        /*setter(s=>!s)*/
        setLoading(true)
        fetcher()
        setLoading(false)
    }, 500)

    const scrollHandler = () => {
        if (calculatePercent() > 80){
            if(hasMore && !loading){
                nextHandler()
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