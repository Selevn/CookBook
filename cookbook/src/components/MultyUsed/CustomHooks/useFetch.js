import {fetchData} from "../../../Connectors/dataProvider";
import {useCallback, useState} from "react";

const paginatorInitState = {nextPage: 1, hasNextPage: true};

export function useFetch(url, setItems, settings, paginatorDefault = paginatorInitState) {
    const [paginator, setPaginator] = useState(paginatorDefault)
    const [loader, setLoader] = useState(false)
    const fetch = useCallback(() => {
        (async () => {
                if (paginator.nextPage === 1)
                {
                    setItems([]);
                    setPaginator(paginatorDefault);
                }
                if (paginator.hasNextPage || paginator.nextPage===1) {
                    setLoader(true)
                    const data = await fetchData(
                        url, () => {
                        }, {...settings, page: paginator.nextPage},
                    );
                    console.log(data)
                    setLoader(false)
                    setPaginator({nextPage: data.nextPage, hasNextPage: data.hasNextPage});
                    setItems(s => [...s, ...data.docs]);
                }
            }
        )();
    }, [settings, url, setItems, paginator.nextPage])

    return [fetch, paginator.hasNextPage, loader]
}

