import React, { useCallback, useEffect, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/all';
import { ItemPageImageBook, SliderStyle } from './style/ItemPageComponentStyle';

const Slider = ({ mainImage, inputImagesArray = [] }) => {
  if (typeof inputImagesArray !== typeof []) throw new Error('Invalid inputImagesArray type!!');
  if (!mainImage) throw new Error('Invalid mainImage type!!');
  const [current, setCurrent] = useState(0);
  const [length, setLength] = useState(1);
  const [haveSlides] = useState(inputImagesArray.length > 0);
  const [imagesArr, setImagesArr] = useState([mainImage, ...inputImagesArray]);

  useEffect(() => {
    setImagesArr([mainImage, ...inputImagesArray]);
    setLength(inputImagesArray.length);
  }, [mainImage, inputImagesArray.length]);

  const scrollLeft = useCallback(() => {
    setCurrent((s) => (s > 0 ? s - 1 : length));
  }, [length]);

  const scrollRight = useCallback(() => {
    setCurrent((s) => (s < length ? s + 1 : 0));
  }, [length]);
  return (
    <SliderStyle>
      {haveSlides && <FaChevronLeft className="chevronLeft" onClick={scrollLeft} />}
      <ItemPageImageBook src={imagesArr[current]} />
      {haveSlides && <FaChevronRight className="chevronRight" onClick={scrollRight} />}
    </SliderStyle>
  );
};

export default Slider;
