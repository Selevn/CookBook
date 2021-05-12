import {fetchData} from "../../../Connectors/dataProvider";
import {useCallback, useEffect, useState} from "react";

const paginatorInitState = {nextPage: 1, hasNextPage: true};

export function useFetch(url, setItems, settings, paginatorDefault = paginatorInitState) {
    const [paginator, setPaginator] = useState(paginatorDefault)
    const [loader, setLoader] = useState(false)

    const fetch = useCallback((start) => {
        (async () => {
            if(start){
                console.log(start)
                console.log("started")
                setItems([]);
                setLoader(true)
                const data = await fetchData(
                    url, () => {
                    }, {...settings, page: 1},
                );
                console.log(paginator)
                setLoader(false)
                setPaginator({nextPage: data.nextPage, hasNextPage: data.hasNextPage});
                setItems(s => [...s, ...data.docs]);
            }
            else{
                console.log("not started")

                if (paginator.hasNextPage || paginator.nextPage===1) {
                    setLoader(true)
                    const data = await fetchData(
                        url, () => {
                        }, {...settings, page: paginator.nextPage},
                    );
                    console.log(paginator)

                    setLoader(false)
                    setPaginator({nextPage: data.nextPage, hasNextPage: data.hasNextPage});
                    setItems(s => [...s, ...data.docs]);
                }
            }
            }
        )();
    }, [settings, url, setItems, paginator])

    return [fetch, paginator.hasNextPage, loader]
}

