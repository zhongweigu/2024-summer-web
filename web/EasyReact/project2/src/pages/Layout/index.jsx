import Header from "./Header_LoggedIn.jsx";
import Card from "../../components/Card.jsx";
import {useAuth} from "../../utils/index.jsx";
import FloatingButton from "../../components/FloatingButton.jsx";


// 初始化本地存储中的 cardData
const initializeCardData = () => {
    const storedData = localStorage.getItem('cardData');
    return storedData ? Object.values(JSON.parse(storedData)) : [];
};



// 初始化本地存储中的 cardData
const Layout = () => {

    const { isLoggedIn, uid, nickname, avatar } = useAuth();
    // const [cardData, setCardData] = useState(initializeCardData());


    const checkLogin = () => {
        console.log("isLoggedIn? " ,isLoggedIn)
        console.log("uid: " ,uid)
        console.log("nickname: " ,nickname)
        console.log("avatar: " ,avatar)
    }

    const listStyle = {
        display: 'flex',
        flexDirection: 'column', // 竖直列表形式
        alignItems: 'center', // 垂直居中
        padding: '20px',
    };

    const cardData = initializeCardData()

    return (
        <>
            <Header/>

            {checkLogin()}
            {console.log(JSON.parse(localStorage.getItem('users')))}
            {console.log(JSON.parse(localStorage.getItem('cardData')))}

            <FloatingButton></FloatingButton>


            <div style={listStyle}>
                {cardData.map((data) => (
                    <Card
                        key={data.rpid}  // 使用唯一的 rpid 作为 key
                        uname={data.nickname}
                        title={data.title}
                        paragraph={data.paragraph}
                        images={data.images}
                        avatarSrc={data.avatarSrc}
                    />
                ))}
            </div>


        </>
    )
}

export default Layout
