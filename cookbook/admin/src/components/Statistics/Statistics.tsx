import {Container} from "../common/StyledComponents";
import {ItemStatistic, NormalStatistic, SmallStatistic, StatisticRow, WideStatistic} from "./Statistics.styled";
import {FaEye} from "react-icons/all";

const Statistics = () => {
    return (
        <Container vertical>
            <StatisticRow>
                <SmallStatistic>
                    <h3>Cookbooks count</h3>
                    <p>345</p>
                </SmallStatistic>
                <SmallStatistic>
                    <h3>Recipes count</h3>
                    <p>1234</p>
                </SmallStatistic>
                <SmallStatistic>
                    <h3>Cookbooks views</h3>
                    <p>4455</p>
                </SmallStatistic>
                <SmallStatistic>
                    <h3>Recipes views</h3>
                    <p>454325</p>
                </SmallStatistic>
            </StatisticRow>
            <StatisticRow>
                <NormalStatistic>
                    <h3>Users</h3>
                    <p>All users 654</p>
                    <p>Blocked 120</p>
                    <p>Deleted 12</p>
                </NormalStatistic>
                <WideStatistic>
                    <h3>Most active users</h3>
                    <p>
                        <img
                            src={"https://media.istockphoto.com/photos/assortment-of-colorful-ripe-tropical-fruits-top-view-picture-id995518546?k=6&m=995518546&s=612x612&w=0&h=jUqcvzOQ4onSN5D_Dd8RJFReuO87-0WpB9RXgeju_Kg="}
                            width={32}
                            height={32}
                        />
                        Thomas Kek 23 cookbooks</p>
                    <p>Lara Kofta 233 recipes</p>
                </WideStatistic>
            </StatisticRow>
            <StatisticRow>
                <ItemStatistic>
                    <h3>Most popular cookbook</h3>
                    <Container>
                        <FaEye/> 1200 views
                    </Container>
                    <img
                        src={"https://media.istockphoto.com/photos/assortment-of-colorful-ripe-tropical-fruits-top-view-picture-id995518546?k=6&m=995518546&s=612x612&w=0&h=jUqcvzOQ4onSN5D_Dd8RJFReuO87-0WpB9RXgeju_Kg="}
                        width={258}
                        height={166}
                        />
                    <h3>Fresh fruits</h3>
                    <p>John Doe</p>
                </ItemStatistic>
                <ItemStatistic>
                    <h3>Most popular recipe</h3>
                    <Container>
                        <FaEye/> 12000 views
                    </Container>
                    <img
                        src={"https://media.istockphoto.com/photos/assortment-of-colorful-ripe-tropical-fruits-top-view-picture-id995518546?k=6&m=995518546&s=612x612&w=0&h=jUqcvzOQ4onSN5D_Dd8RJFReuO87-0WpB9RXgeju_Kg="}
                        width={258}
                        height={166}
                    />
                    <h3>Fresh meat</h3>
                    <p>John Doe</p>
                </ItemStatistic>
            </StatisticRow>

        </Container>)
}
export default Statistics