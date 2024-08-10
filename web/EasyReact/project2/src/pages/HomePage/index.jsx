import Header from "../../components/Header.jsx";
import Card from "../../components/Card.jsx";
import {useAuth} from "../../utils/index.jsx";

const HomePage = () => {
    const {isLoggedIn, uid, logout, nickname, avatar} = useAuth();

    return (
        <>
            <Header/>
        </>
    )
}

export default HomePage;