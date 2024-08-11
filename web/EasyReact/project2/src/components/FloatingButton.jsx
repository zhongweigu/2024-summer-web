import React from 'react';

const FloatingButton = () => {
    // 定义内联样式
    const buttonStyle = {
        position: 'fixed', // 使用fixed定位使按钮固定在视口上
        bottom: '20px',    // 距离页面底部20px
        right: '20px',     // 距离页面右边20px
        width: '50px',     // 按钮的宽度
        height: '50px',    // 按钮的高度
        backgroundColor: 'pink', // 按钮的背景颜色
        color: 'white',    // 按钮文字颜色
        border: 'none',    // 无边框
        borderRadius: '50%', // 圆形按钮
        cursor: 'pointer', // 鼠标悬停时显示指针
        fontSize: '24px',  // 按钮文字大小
        outline: 'none',   // 移除焦点时的轮廓线
        boxShadow: '0 2px 5px rgba(0,0,0,0.2)', // 添加阴影效果
        zIndex: 1000       // 确保按钮在最顶层
    };

    return (
        // 将内联样式应用于按钮
        <button style={buttonStyle} onClick={()=>{window.location.href = '/release'}}>+</button>
    );
};

export default FloatingButton;
