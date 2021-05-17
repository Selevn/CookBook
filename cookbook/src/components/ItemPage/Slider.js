import {ItemPageImageBook, SliderStyle} from "./style/ItemPageComponentStyle";
import React, {useCallback, useEffect, useState} from "react";
import {FaChevronLeft, FaChevronRight} from "react-icons/all";

const Slider = ({mainImage, imagesArray}) => {

    const [current, setCurrent] = useState(0)
    const [haveSlides, setHaveSliders] = useState(true)
    let arr = [];
    useEffect(()=>{
        if (imagesArray === null) {
            setHaveSliders(false)
            arr = [
                /*"https://image.shutterstock.com/image-photo/grilled-salmon-fish-fillet-fresh-600w-1912049980.jpg",
                "https://image.shutterstock.com/image-photo/chicken-fillet-salad-healthy-food-600w-1721943142.jpg",
                "https://image.shutterstock.com/image-photo/grilled-chicken-breast-fillet-fresh-600w-1713446386.jpg"*/
            ];
        }
    },[])

    arr.unshift(mainImage);
    const length = arr.length-1;
    const scrollLeft = useCallback(() => {
        if(current > 0)
            setCurrent(s=>s-1);
        else
            setCurrent(length);
    },[length,current])

    const scrollRight = useCallback(() => {
        if(current < length)
            setCurrent(s=>s+1);
        else
            setCurrent(0);
    },[length,current])
    return (
        <SliderStyle>
            {haveSlides && <FaChevronLeft className={"chevronLeft"} onClick={scrollLeft}/>}
                <ItemPageImageBook src={arr[current]}/>
            {haveSlides && <FaChevronRight className={"chevronRight"} onClick={scrollRight}/>}
        </SliderStyle>
    )
}

export default Slider;
