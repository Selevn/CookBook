import axios from "axios";
import React from "react";

export const get = async (url:string, data?: { [key: string]: any }, loaderSetter?:  React.Dispatch<React.SetStateAction<boolean>>) => {
    loaderSetter && loaderSetter(true)
    const response = await axios(url, {params: data});
    loaderSetter && loaderSetter(false)
    return response.data;
}