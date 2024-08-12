
import PropTypes from 'prop-types';
import { openDB } from 'idb';
import { useEffect, useState } from 'react';
import CommentList from "./comment.jsx";

export default function Card({uname, title, paragraph, images, avatarSrc, tag}) {

    const [imageSrcs, setImageSrcs] = useState([]);

    useEffect(() => {
        const fetchImages = async () => {
            const urls = [];
            for (const id of images) {
                const db = await openDB('imageStore', 1);
                const store = db.transaction('images').objectStore('images');
                const file = await store.get(id);
                if (file) {
                    urls.push(URL.createObjectURL(file));
                }
            }
            setImageSrcs(urls);
        };
        fetchImages();
    }, [images]);


    const cardStyle = {
        width: '100%',
        maxWidth: '1000px', // 限制最大宽度
        margin: '0 auto', // 水平居中
        display: 'flex',
        flexDirection: 'column',

        justifyContent: 'flex-start', // 从顶部开始排列内容
        padding: '20px',
        boxSizing: 'border-box',
    };
    const titleStyle = {
        fontSize: '30px', // 调整标题文字大小
        textAlign: 'left',
    };
    const paragraphStyle = {
        fontSize: '16px', // 调整段落文字大小
        textAlign: 'center'
    };
    const imgContainerStyle = {
        display: 'flex',
        flexWrap: 'wrap', // 允许图片在必要时换行
        justifyContent: 'flex-start',
        gap: '30px', // 图片之间的间隔
        padding: '50px'
    };
    const imgStyle = {
        maxWidth: 'calc(100% - 30px)',
        height: 'auto',
        objectFit: 'cover',
    };
    const avatarStyle = {
        width: '50px', // 头像宽度
        height: '50px', // 头像高度
        borderRadius: '50%', // 头像圆形
        marginRight: '20px', // 头像与标题之间的间距
        objectFit: 'cover', // 保持头像比例
        float: 'left'
    };

    return (
        <div style={cardStyle} className="card bg-white shadow-xl">
            <span
                className="inline-flex items-center rounded-md bg-pink-50 px-2 py-1 text-xs font-medium text-pink-700 ring-1 ring-inset ring-pink-700/10"
            >
                {tag}
            </span>
            <div style={imgContainerStyle}>
                {images.map((imageSrc, index) => (
                    <img
                        key={index}
                        src={imageSrcs}
                        alt={`Image ${index}`}
                        style={imgStyle}
                    />
                ))}
            </div>

            <div className="h-8"></div>

            <div className="card-body text-left">
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <img
                        src="/defaultAvatar.jpg"
                        alt="Avatar"
                        style={avatarStyle}
                    />
                    <h2 style={titleStyle} className="card-title text-pink-400">{title}</h2>
                </div>
                <div>{uname}</div>
            </div>
            <div className="h-4"></div>
            <p style={paragraphStyle}>{paragraph}</p>
            <div className="h-8"></div>
            <svg width="2000" height="30">
                <line x1="100" y1="10" x2="850" y2="10" stroke="black" strokeWidth="2"/>
            </svg>
            <CommentList/>
            <svg width="2000" height="100">
                <line x1="25" y1="10" x2="925" y2="10" stroke="black" strokeWidth="2"/>
            </svg>
        </div>
    );
}

Card.propTypes = {
    uname: PropTypes.string,
    title: PropTypes.string.isRequired,
    paragraph: PropTypes.string,
    images: PropTypes.arrayOf(PropTypes.string),
    avatarSrc: PropTypes.string,
};