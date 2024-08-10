
import React, {useEffect, useState} from 'react';


export default function Index() {

    // 设置状态变量来存储邮箱和密码
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);



    // 处理邮箱输入的变化
    const handleEmailChange = (event) => {
        setEmail(event.target.value);

    };

    // 处理密码输入的变化
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);

    };
    // 处理表单提交
    const handleSubmit = (event) => {
        event.preventDefault(); // 阻止表单默认提交行为

        // 模拟登录验证过程
        const registeredUsers = JSON.parse(localStorage.getItem('users') || '{}');
        if (registeredUsers[email] && registeredUsers[email] === password) {
            // 如果账号密码正确，存储登录状态
            localStorage.setItem('isLoggedIn', 'true');
            setIsLoggedIn(true);
            // 跳转到主页
            window.location.href = '/home';
        } else {
            // 如果账号密码错误，设置错误信息
            setError('邮箱或密码错误，请重试。');
        }
    };


    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        alt="Your Company"
                        src="../../../public/Logo.bmp"
                        className="mx-auto h-13 w-1/5"
                    />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        登录进入社区
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={handleSubmit} action="#" method="POST" className="space-y-6">
                        {error && <p className="text-red-500 text-center">{error}</p>}
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
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    密码
                                </label>
                                <div className="text-sm">
                                    <a href="#" className="font-semibold text-pink-300 hover:text-pink-400">
                                        忘记密码?
                                    </a>
                                </div>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    autoComplete="current-password"
                                    value={password}
                                    onChange={handlePasswordChange}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-pink-300 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-pink-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-300"
                            >
                                登录
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        没有账号?{' '}
                        <a href="/register" className="font-semibold leading-6 text-pink-300 hover:text-pink-400">
                            注册
                        </a>
                    </p>
                </div>
            </div>
        </>
    )
}
