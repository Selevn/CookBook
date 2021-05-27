import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
    ButtonStyled,
    Container,
    H1Styled,
    ImageStyled, LinkAsButton,
    ParagraphStyled,
} from '../common/StylesComponent';

import FoodImg from '../common/images/mainFood.jpg';
import {
    CookBooksList,
    PopularBooksContainer,
    WelcomeDiv,
    WelcomeFoodDiv,
} from './style/MainPageComponentStyle';
import {MenuCard, CookCard} from '../MultyUsed/CookCard';
import {fetchData} from '../../Connectors/dataProvider';
import {COMMON, ROUTES} from '../../constants';
import {searchSorter} from '../CookBookSearch/sortFunction';
import {Loading} from '../MultyUsed/Loading/Loading';

const MainComponent = () => {
    let sliderRef = useRef();

    const [cookbooks, setCookbooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const mostPopularCookBooks = useMemo(() => {
        return cookbooks.sort(searchSorter(COMMON.POPULAR)).slice(0, 4);
    }, [cookbooks]);
    const pickedByUs = useMemo(() => {
        return cookbooks.sort(searchSorter(COMMON.OURCHOISE)).slice(0, 4);
    }, [cookbooks]);

    const [trendingCookbooks, setTrendingCookbooks] = useState()

    useEffect(() => {
        setTrendingCookbooks(cookbooks.sort(searchSorter(COMMON.LIKED)).slice(0, 3))
        let i = 3;
        sliderRef?.current?.classList.add("slider")
        const interval = setInterval(()=>{
            setTrendingCookbooks(cookbooks.sort(searchSorter(COMMON.LIKED)).slice(i, i+3))
            i+=3;
            if(i>12)
                i=0;
        }, 10000)
        return () => {
            clearInterval(interval)
        }
    }, [cookbooks])

    // Можно заюзать мемо
    useEffect(() => {
        (async () => {
            const data = await fetchData(ROUTES.COOKBOOKS, setLoading);
            console.log(data);
            setCookbooks(data.docs);
        })();
    }, []);

    return (
        <>
            <Container minHeight="680px" containerHeight="680px" maxHeight="780px">
                <Container
                    padding="0 0 0 20px"
                    height="100%"
                    flex="2"
                    color="var(--light-black)"
                    justifyContent="center"
                    alignItems="center"
                >
                    <WelcomeDiv>
                        <ParagraphStyled>Find and create your favourite cookbooks And Recipies</ParagraphStyled>
                        <LinkAsButton to="/login">Create Account</LinkAsButton>
                    </WelcomeDiv>
                </Container>
                <WelcomeFoodDiv>
                    <ImageStyled src={FoodImg} alt="Food image"/>
                </WelcomeFoodDiv>
            </Container>
            <PopularBooksContainer vertical>
                <H1Styled>Most Popular Cookbooks</H1Styled>
                <CookBooksList>
                    {loading && <Loading/>}
                    {mostPopularCookBooks &&
                    mostPopularCookBooks.map((item) => {
                        return <CookCard type="small" key={item._id} {...item} />;
                    })}
                </CookBooksList>
            </PopularBooksContainer>
            <PopularBooksContainer vertical>
                <H1Styled>Picked By Us</H1Styled>
                {loading && <Loading/>}
                <CookBooksList puzzle>
                    {pickedByUs && <MenuCard type="large" {...pickedByUs[0]} />}
                    <Container vertical className="centier">
                        {pickedByUs && <MenuCard type="long" {...pickedByUs[1]} />}
                        <Container className="centier">
                            {pickedByUs && <MenuCard type="small" {...pickedByUs[2]} />}
                            {pickedByUs && <MenuCard type="small" {...pickedByUs[3]} />}
                        </Container>
                    </Container>
                </CookBooksList>
            </PopularBooksContainer>
            <Container color="var(--primary-color)" overflow={"hidden"}>
                <PopularBooksContainer vertical>
                    <H1Styled>Trending Cookbooks</H1Styled>
                    {trendingCookbooks &&
                    <CookBooksList ref={sliderRef}>
                        {loading && <Loading/>}
                        {trendingCookbooks.map((item) => (
                        <CookCard key={item._id} type="bigImage" {...item} />
                        ))}
                    </CookBooksList>}
                </PopularBooksContainer>
            </Container>
        </>
    );
};

export default MainComponent;
