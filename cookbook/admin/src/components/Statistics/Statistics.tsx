import {Container} from "../common/StyledComponents";
import {
    ItemStatistic,
    NormalStatistic,
    SmallStatistic,
    StatisticRow, StatisticValue,
    UserImage,
    WideStatistic
} from "./Statistics.styled";
import {FaEye} from "react-icons/all";
import {useEffect, useState} from "react";
import {get} from "../../connector/Proxy";
import {FrontEndRoutes} from "../../constants/ServerRoutes";


const Statistics = () => {
    const [data, setData] = useState<any>();

    useEffect(()=>{
        (async () => {
            const result = await get(FrontEndRoutes.GLOBAL_STATISTICS)
            setData(result)
        })()
    },[])


    if(data)
        return (
        <Container vertical>
            <StatisticRow>
                <SmallStatistic>
                    <h3>Cookbooks count</h3>
                    <StatisticValue>{data.booksCount.booksCount}</StatisticValue>
                </SmallStatistic>
                <SmallStatistic>
                    <h3>Recipes count</h3>
                    <StatisticValue>{data.recipesCount.booksCount}</StatisticValue>
                </SmallStatistic>
                <SmallStatistic>
                    <h3>Cookbooks views</h3>
                    <StatisticValue>{data.booksViews}</StatisticValue>
                </SmallStatistic>
                <SmallStatistic>
                    <h3>Recipes views</h3>
                    <StatisticValue>{data.recipesViews}</StatisticValue>
                </SmallStatistic>
            </StatisticRow>
            <StatisticRow>
                <NormalStatistic>
                    <h3>Users</h3>
                    <Container>
                        <span>All users </span><StatisticValue>{data.users.allUsersCount}</StatisticValue>
                    </Container>
                    <Container>
                        <span>Blocked </span><StatisticValue>{data.users.blockedUsersCount}</StatisticValue>
                    </Container>
                    <Container>
                        <span>Deleted </span><StatisticValue>{data.users.deletedUsersCount}</StatisticValue>
                    </Container>
                </NormalStatistic>
                <WideStatistic>
                    <h3>Most active users</h3>
                    <Container>
                        <UserImage
                            src={data.mostActive.cookBooksMax.image}
                        />
                        <span>{data.mostActive.cookBooksMax.name}</span>
                        <span><StatisticValue>{data.mostActive.cookBooksMax.cookBooksCount}</StatisticValue> cookbooks</span>
                    </Container>
                    <Container>
                        <UserImage
                            src={data.mostActive.recipesMax.image}
                        />
                        <span>{data.mostActive.recipesMax.name}</span>
                        <span><StatisticValue>{data.mostActive.recipesMax.recipesCount}</StatisticValue> recipes</span>
                    </Container>
                </WideStatistic>
            </StatisticRow>
            <StatisticRow>
                <ItemStatistic>
                    <h3>Most popular cookbook</h3>
                    <Container>
                        <FaEye/> {data.mostPopularBook.views} views
                    </Container>
                    <img
                        src={data.mostPopularBook.image}
                        width={258}
                        height={166}
                        />
                    <h3>{data.mostPopularBook.name}</h3>
                    <p>{data.mostPopularBook.author[0].name.first} {data.mostPopularBook.author[0].name.last}</p>
                </ItemStatistic>
                <ItemStatistic>
                    <h3>Most popular recipe</h3>
                    <Container>
                        <FaEye/> {data.mostPopularRecipe.views} views
                    </Container>
                    <img
                        src={data.mostPopularRecipe.image}
                        width={258}
                        height={166}
                    />
                    <h3>{data.mostPopularRecipe.name}</h3>
                    <p>{data.mostPopularRecipe.author[0].name.first} {data.mostPopularRecipe.author[0].name.last}</p>
                </ItemStatistic>
            </StatisticRow>

        </Container>)

    return <></>
}
export default Statistics