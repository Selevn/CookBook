import {fetchData} from "../../../Connectors/dataProvider";
import {useCallback, useEffect, useState} from "react";

const paginatorInitState = { nextPage: 1, hasNextPage: true };

export function useFetch(url, setItems, settings, paginatorDefault = paginatorInitState)
{
    const [paginator, setPaginator] = useState(paginatorDefault)
    const [loader, setLoader] = useState(false)

    console.log("FetchRerendered. Pagi: ",paginator)

    const fetch = useCallback(() => {
        (async () => {
                if (paginator.hasNextPage) {
                    setLoader(true)
                    const data = await fetchData(
                        url, () => {
                        }, {...settings, page: paginator.nextPage},
                    );
                    setLoader(false)
                    setPaginator({nextPage: data.nextPage, hasNextPage: data.hasNextPage});
                    console.log('data',data)
                    console.log('paginator',paginator)
                    setItems(s => [...s, ...data.docs]);
                }
            }
        )();
    },[settings, paginator.nextPage])

    return [fetch, paginator.hasNextPage, loader]
}

