import React, {useEffect, useState} from 'react';
import {DataGrid, GridColumns, GridSortDirection} from "@material-ui/data-grid";
import SortProxy from "../../connector/SortProxy";
import {get} from "../../connector/Proxy";
import {TableStatistic} from "../../interfaces/usersInterfaces";

const Table = ({columns, source}:{columns:GridColumns, source:string}) : React.ReactElement  => {

    const [data, setData] = useState([])
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const [totalRows, setTotalRows] = useState(0)

    const [sortModel, setSortModel] = useState([
        { field: '_id', sort: 'asc' as GridSortDirection },
    ]);

    const handleSortModelChange = (params:any) => {
        if (params.sortModel !== sortModel) {
            setSortModel(params.sortModel);
        }
    };

    useEffect(()=>{
        (async()=>{
            const sort = SortProxy(sortModel)
            const result  = await get(source, {page:page, sort:sort}, setLoading);
            result.docs.forEach((item:TableStatistic) => item.id=item._id)
            setData(result.docs)
            if(totalRows === 0)
                setTotalRows(result.total)
        })()
    },[page, sortModel, source])

    return (
        <DataGrid
            paginationMode={'server'}
            rows={data}
            columns={columns}
            pageSize={15}
            rowCount = {totalRows}

            loading={loading}

            disableColumnFilter
            disableColumnMenu

            page={page-1}
            onPageChange={(params) => {
                setPage(params.page+1);
            }}

            sortingMode="server"
            sortModel={sortModel}
            onSortModelChange={handleSortModelChange}
        />
    );
};

export default Table;