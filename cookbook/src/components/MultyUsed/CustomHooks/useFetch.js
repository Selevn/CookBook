import {fetchData} from "../../../Connectors/dataProvider";
import {useCallback, useEffect, useState} from "react";

const paginatorInitState = {nextPage: 1, hasNextPage: true};

export function useFetch(url, setItems, settings, paginatorDefault = paginatorInitState) {
    const [paginator, setPaginator] = useState(paginatorDefault)
    const [loader, setLoader] = useState(false)
    const [total, setTotal] = useState(0)
    const fetch = useCallback((start) => {
        (async () => {
            if(start){
                setItems([]);
                setLoader(true)
                console.log(url)
                const data = await fetchData(
                    url, () => {
                    }, {...settings, page: 1},
                );
                console.log(data)

                setLoader(false)
                setTotal(data?.total)
                setPaginator({nextPage: data.nextPage, hasNextPage: data.hasNextPage});
                setItems(s => [...s, ...data.docs]);
            }
            else{
                if (paginator.hasNextPage || paginator.nextPage===1) {
                    setLoader(true)
                    const data = await fetchData(
                        url, () => {
                        }, {...settings, page: paginator.nextPage},
                    );
                    setTotal(data?.total)
                    setLoader(false)
                    setPaginator({nextPage: data.nextPage, hasNextPage: data.hasNextPage});
                    setItems(s => [...s, ...data.docs]);
                }
            }
            }
        )();
    }, [settings, url, setItems, paginator])

    return [fetch, paginator.hasNextPage, loader, total]
}

