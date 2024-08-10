import React from 'react';

export default function Card() {
    const cardStyle = {
        width: '100%',
        maxWidth: '1000px', // 限制最大宽度
        margin: '0 auto', // 水平居中
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center', // 垂直居中
        justifyContent: 'flex-start', // 从顶部开始排列内容
        padding: '20px',
        boxSizing: 'border-box',
    };

    const cardContainerStyle = {
        display: 'flex',
        justifyContent: 'center', // 水平居中
        alignItems: 'center', // 垂直居中
        height: '100vh', // 容器高度为视口高度
        padding: '20px',
    };

    const titleStyle = {
        fontSize: '30px', // 调整标题文字大小
        textAlign: 'left',
    };

    const paragraphStyle = {
        fontSize: '16px', // 调整段落文字大小
        textAlign: 'left'
    };

    const imgContainerStyle = {
        display: 'flex',
        flexWrap: 'wrap', // 允许图片在必要时换行
        justifyContent: 'flex-start',
        gap: '30px', // 图片之间的间隔
        padding: '50px'
    };

    const imgStyle = {
        maxWidth: 'calc(33.33% - 30px)', // 假设一行显示三张图片，减去间隔
        height: 'auto',
        objectFit: 'cover',
    };

    // 假设 images 是一个包含图片URLs的数组
    const images = [
        "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
        "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
        "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
        "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
        "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
        "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
        // ... 更多图片URLs
    ];

    const avatarStyle = {
        width: '50px', // 头像宽度
        height: '50px', // 头像高度
        borderRadius: '50%', // 头像圆形
        marginRight: '20px', // 头像与标题之间的间距
        objectFit: 'cover', // 保持头像比例
    };

    return (
        <div style={cardContainerStyle}>
            <div style={cardStyle} className="card bg-white shadow-xl">
                <div style={imgContainerStyle}>
                    {images.map((imageSrc, index) => (
                        <img
                            key={index}
                            src={imageSrc}
                            alt={`Image ${index}`}
                            style={imgStyle}
                        />
                    ))}
                </div>

                <div className="h-8"></div>

                <div className="card-body">
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <img
                            src="https://via.placeholder.com/50" // 示例头像URL
                            alt="Avatar"
                            style={avatarStyle}
                        />
                        <h2 style={titleStyle} className="card-title text-pink-400">Shoes!</h2>
                    </div>
                    <div className="h-4"></div>
                    <p style={paragraphStyle}>If a dog chews shoes whose shoes does he choose?</p>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary">Buy Now</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
