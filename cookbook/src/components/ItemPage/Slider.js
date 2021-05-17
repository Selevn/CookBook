import {ItemPageImageBook, SliderStyle} from "./style/ItemPageComponentStyle";
import React, {useCallback, useEffect, useState} from "react";
import {FaChevronLeft, FaChevronRight} from "react-icons/all";

const Slider = ({mainImage, inputImagesArray=[]}) => {
    if(typeof(inputImagesArray) !== typeof([]))
        throw new Error("Invalid inputImagesArray type!!")
    if(!mainImage)
        throw new Error("Invalid mainImage type!!")
    const [current, setCurrent] = useState(0)
    const [haveSlides, setHaveSliders] = useState(inputImagesArray.length>1)
    const [imagesArr, setImagesArr] = useState([mainImage, ...inputImagesArray])

    useEffect(() => {
        setImagesArr([mainImage, ...inputImagesArray])
    },[mainImage, inputImagesArray])

const length = inputImagesArray.length;

    const scrollLeft = useCallback(() => {
        if (current > 0)
            setCurrent(s => s - 1);
        else
            setCurrent(length);
    }, [length, current,inputImagesArray])

    const scrollRight = useCallback(() => {
        if (current < length)
            setCurrent(s => s + 1);
        else
            setCurrent(0);
    }, [length, current])
    return (
        <SliderStyle>
            {haveSlides && <FaChevronLeft className={"chevronLeft"} onClick={scrollLeft}/>}
            <ItemPageImageBook src={imagesArr[current]}/>
            {haveSlides && <FaChevronRight className={"chevronRight"} onClick={scrollRight}/>}
        </SliderStyle>
    )
}

export default Slider;
