import React, { useState } from 'react';
import {useAuth} from "../../utils/index.jsx";

export default function RegisterPage() {
    // 设置状态变量来存储邮箱和密码
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [nickname, setNickname] = useState(''); // 新增状态变量存储昵称

    const { login } = useAuth();

    // 处理邮箱输入的变化
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    // 处理密码输入的变化
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    // 处理确认密码输入的变化
    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    };

    // 处理注册提交
    const HandleRegisterSubmit = (event) => {
        event.preventDefault();

        // 检查邮箱是否已经注册
        let registeredUsers = JSON.parse(localStorage.getItem('users') || '{}');
        if (registeredUsers[email]) {
            setError('该邮箱已注册');
            return;
        }

        // 检查密码和确认密码是否匹配
        if (password !== confirmPassword) {
            setError('密码和确认密码不匹配');
            return;
        }

        const uid = Math.random().toString(36).substring(2, 15);

        const newUser = {
            uid,
            password,
            nickname,
            avatar: '../../../public/defaultAvatar.jpg', // 假设这是默认头像的路径
            active: 0
        };
        localStorage.setItem(email, JSON.stringify(newUser)); // 保存单个用户信息
        // 更新已注册用户列表
        registeredUsers = JSON.parse(localStorage.getItem('users') || '{}');
        registeredUsers[email] = password; // 仍然只保存邮箱和密码的映射关系
        localStorage.setItem('users', JSON.stringify(registeredUsers));

        // 更新context中的状态
        login(uid, nickname, '../../../public/defaultAvatar.jpg');

        // 注册成功后，显示成功消息并跳转到登录页面
        setSuccessMessage('注册成功, 2秒后跳转到登录页面');
        setTimeout(() => {
            window.location.href = '/login';
        }, 2000); // 2000毫秒后跳转
    };

    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        alt="Your Company"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        className="mx-auto h-10 w-auto"
                    />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        注册新账号
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={HandleRegisterSubmit} className="space-y-6">
                        {error && <p className="text-red-500 text-center">{error}</p>}
                        {successMessage && <p className="text-green-500 text-center">{successMessage}</p>}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                邮箱地址
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    autoComplete="email"
                                    value={email}
                                    onChange={handleEmailChange}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                密码
                            </label>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    autoComplete="new-password"
                                    value={password}
                                    onChange={handlePasswordChange}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="confirmPassword"
                                   className="block text-sm font-medium leading-6 text-gray-900">
                                确认密码
                            </label>
                            <div className="mt-2">
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    required
                                    autoComplete="new-password"
                                    value={confirmPassword}
                                    onChange={handleConfirmPasswordChange}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="nickname" className="block text-sm font-medium leading-6 text-gray-900">
                                昵称
                            </label>
                            <div className="mt-2">
                                <input
                                    id="nickname"
                                    name="nickname"
                                    type="text"
                                    required
                                    value={nickname}
                                    onChange={(e) => setNickname(e.target.value)}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-pink-300 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-pink-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-300"
                            >
                                注册
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        已有账号?{' '}
                        <a href="/login" className="font-semibold leading-6 text-pink-300 hover:text-pink-400">
                            登录
                        </a>
                    </p>
                </div>
            </div>
        </>
    );
}
