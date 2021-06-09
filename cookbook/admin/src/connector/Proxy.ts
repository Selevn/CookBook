import axios from "axios";

export const get = async (url:string, data?: { [key: string]: Object[] } ) => {
    const response = await axios(url, {params: data});
    return response.data;
}