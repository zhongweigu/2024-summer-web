import './comment.scss'
import {useAuth} from "../utils/index.jsx";
import {useState} from "react";
import dayjs from "dayjs";


const CommentList = () => {

    const { uid, nickname, avatar} = useAuth()

// 评论列表数据
    const defaultList = [
    ]
// 当前登录用户信息
    const user = {
        // 用户id
        uid: uid,
        // 用户头像
        avatar : avatar,
        // 用户昵称
        uname: nickname,
    }

    const [commentList, setCommentList] = useState(defaultList)



    const handleDel = (id) => {
        console.log(id)
        // 删除评论
        setCommentList(commentList.filter(item => item.rpid !== id))
    }

    const [content , setContent] = useState('');

    const handlePublish = () => {
        const rpid = Math.random().toString(36).substring(2, 15);
        if(content){
            setCommentList([
                ...commentList,
                {
                    // 评论id
                    rpid: rpid,
                    // 用户信息
                    user: {
                        uid: uid,
                        avatar: avatar,
                        uname: nickname,
                    },
                    // 评论内容
                    content: content,
                    // 评论时间
                    ctime: dayjs(new Date()).format('MM-DD hh:mm'),
                },
            ])
        }
    }


    return (
        <div className="commentList">

            <div className="reply-wrap">
                {/* 发表评论 */}
                <div className="box-normal">
                    {/* 当前用户头像 */}
                    <div className="reply-box-avatar">
                        <div className="bili-avatar">
                            <img className="bili-avatar-img" src={avatar} alt="用户头像" />
                        </div>
                    </div>
                    <div className="reply-box-wrap">
                        {/* 评论框 */}
                        <textarea
                            className="reply-box-textarea"
                            placeholder="发一条评论"
                            value={content}
                            onChange = {(e)=>setContent(e.target.value)}
                        />
                        {/* 发布按钮 */}
                        <div className="reply-box-send">
                            <div className="send-text" onClick={handlePublish}>发布</div>
                        </div>
                    </div>
                </div>
                {/* 评论列表 */}
                <div className="reply-list">
                    {/* 评论项 */}
                    {commentList.map(item => (
                        <div key={item.rpid} className="reply-item">
                            {/* 头像 */}
                            <div className="root-reply-avatar">
                                <div className="bili-avatar">
                                    <img
                                        className="bili-avatar-img"
                                        alt=""
                                        src={item.user.avatar}
                                    />
                                </div>
                            </div>

                            <div className="content-wrap">
                                {/* 用户名 */}
                                <div className="user-info">
                                    <div className="user-name">{item.user.uname}</div>
                                </div>
                                {/* 评论内容 */}
                                <div className="root-reply">
                                    <span className="reply-content">{item.content}</span>
                                    <div className="reply-info">
                                        {/* 评论时间 */}
                                        <span className="reply-time">{item.ctime}</span>
                                        {/* 删除按钮 */}
                                        {user.uid === item.user.uid &&
                                            <span className='delete-btn' onClick={() => handleDel(item.rpid)}>
                          删除
                        </span>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default CommentList