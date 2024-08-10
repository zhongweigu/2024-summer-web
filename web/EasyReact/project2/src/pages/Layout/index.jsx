import Header from "./Header_LoggedIn.jsx";
import Card from "../../components/Card.jsx";
import {useAuth} from "../../utils/index.jsx";

const Layout = () => {

    const { isLoggedIn, uid, nickname, avatar } = useAuth();

    const checkLogin = () => {
        console.log("isLoggedIn? " ,isLoggedIn)
        console.log("uid: " ,uid)
        console.log("nickname: " ,nickname)
        console.log("avatar: " ,avatar)
    }

    return (
        <>
            <Header/>

            {checkLogin()}
            <div className="mockup-window bg-base-300 border">
                <div className="bg-pink-50 flex justify-center px-4 py-16">
                    <Card/>
                </div>
            </div>

            <div>
                <textarea className="textarea textarea-bordered" placeholder="输入"></textarea>
            </div>
            {/*<div className="text-center">*/}
            {/*    <div>*/}
            {/*        <h1>用户资料</h1>*/}
            {/*        <p>昵称: {nickname}</p>*/}
            {/*        <p>UID: {uid}</p>*/}
            {/*        <img src={avatar} alt="用户头像" className="avatar"/>*/}
            {/*        /!* 这里可以添加更多用户相关的信息 *!/*/}
            {/*    </div>*/}
            {/*</div>*/}
        </>
    )
}

export default Layout
