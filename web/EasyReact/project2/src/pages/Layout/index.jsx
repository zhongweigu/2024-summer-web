import Header from "./Header_LoggedIn.jsx";
import Card from "../../components/Card.jsx";
import {useAuth} from "../../utils/index.jsx";

// 假设 cardData 是一个包含多个卡片数据的数组
const cardData = [
    {
        title: "Shoes!",
        paragraph: "If a dog chews shoes whose shoes does he choose?",
        images: [
            "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
            "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
            "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
            "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
            "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
            "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
            // ... 更多图片URLs
        ],
        avatarSrc: "https://via.placeholder.com/50" // 示例头像URL
    },
    {
        title: "Fire!",
        paragraph: "If a dog chews shoes whose shoes does he choose?",
        images: [
            // ... 图片URLs
        ],
        avatarSrc: "https://via.placeholder.com/50" // 示例头像URL
    }
    // ... 更多卡片数据
];

const Layout = () => {

    const { isLoggedIn, uid, nickname, avatar } = useAuth();

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



    return (
        <>
            <Header/>

            {checkLogin()}


            {/*<div className="text-center">*/}
            {/*    <div>*/}
            {/*        <h1>用户资料</h1>*/}
            {/*        <p>昵称: {nickname}</p>*/}
            {/*        <p>UID: {uid}</p>*/}
            {/*        <img src={avatar} alt="用户头像" className="avatar"/>*/}
            {/*        /!* 这里可以添加更多用户相关的信息 *!/*/}
            {/*    </div>*/}
            {/*</div>*/}
            <div style={listStyle}>
                {cardData.map((data, index) => (
                    <Card
                        key={index}
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
