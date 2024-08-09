import React from 'react';

export default function Card() {
    const cardStyle = {
        width: '100%',
        maxWidth: '500px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        boxSizing: 'border-box',
    };

    const cardContainerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        padding: '20px',
    };

    const titleStyle = {
        fontSize: '30px', // 调整标题文字大小
    };

    const paragraphStyle = {
        fontSize: '16px', // 调整段落文字大小
    };

    return (
        <div style={cardContainerStyle}>
            <div style={cardStyle} className="card bg-base-100 shadow-xl">
                <figure>
                    <img
                        src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                        alt="shoes"/>
                </figure>
                <div className="card-body">
                    <h2 style={titleStyle} className="card-title text-pink-400">Shoes!</h2>
                    <p style={paragraphStyle}>If a dog chews shoes whose shoes does he choose?</p>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary">Buy Now</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
