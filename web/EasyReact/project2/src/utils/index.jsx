import React, {createContext, useState, useContext, useEffect} from 'react';
import PropTypes from 'prop-types';

// 创建一个context对象，提供一个初始的context对象
const AuthContext = createContext({
    isLoggedIn: false,
    uid: null,
    nickname: '',
    avatar: '',
    active: 0,
    login: () => {},
    logout: () => {}
});

// 创建一个provider组件
export function AuthProvider({ children }) {


    const [authState, setAuthState] = useState({
        isLoggedIn: false,
        uid: null,
        nickname: '',
        avatar: '',
        active: 0
    });

    // 从localStorage恢复状态
    useEffect(() => {
        const savedState = localStorage.getItem('authState');
        if (savedState) {
            setAuthState(JSON.parse(savedState));
        }
    }, []);

    // 登录函数，用于更新context中的状态
    const login = (uid, nickname, avatar) => {
        const newState = {
            isLoggedIn: true,
            uid,
            nickname,
            avatar,
            active: 0
        };
        setAuthState(newState);
        // 将状态保存到localStorage
        localStorage.setItem('authState', JSON.stringify(newState));
    };

    // 登出函数，用于清除context中的状态
    const logout = () => {
        const newState = {
            isLoggedIn: false,
            uid: null,
            nickname: '',
            avatar: '',
            active: 0
        };
        setAuthState(newState);
        // 清除localStorage中的状态
        localStorage.removeItem('authState');
    };

    return (
        <AuthContext.Provider value={{ ...authState, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired
};

// 自定义hook，用于访问context
export function useAuth() {
    return useContext(AuthContext);
}
