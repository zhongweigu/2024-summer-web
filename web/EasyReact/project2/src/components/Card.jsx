
import PropTypes from 'prop-types';

export default function Card({ title, paragraph, images, avatarSrc }) {
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


    const avatarStyle = {
        width: '50px', // 头像宽度
        height: '50px', // 头像高度
        borderRadius: '50%', // 头像圆形
        marginRight: '20px', // 头像与标题之间的间距
        objectFit: 'cover', // 保持头像比例
    };

    return (
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
                        src={avatarSrc}
                        alt="Avatar"
                        style={avatarStyle}
                    />
                    <h2 style={titleStyle} className="card-title text-pink-400">{title}</h2>
                </div>
                <div className="h-4"></div>
                <p style={paragraphStyle}>{paragraph}</p>
                <div className="card-actions justify-end">
                    <button className="btn btn-primary">Buy Now</button>
                </div>
            </div>
            <div className="h-8"></div>
            <svg width="2000" height="200">
                <line x1="550" y1="10" x2="1450" y2="10" stroke="black" strokeWidth="2"/>
            </svg>
        </div>
    );
}

Card.propTypes = {
    title: PropTypes.string.isRequired,
    paragraph: PropTypes.string,
    images: PropTypes.arrayOf(PropTypes.string),
    avatarSrc: PropTypes.string,
};