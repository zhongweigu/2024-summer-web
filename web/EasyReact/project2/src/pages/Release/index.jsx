
'use client'

import {useAuth} from "../../utils/index.jsx";
import {useState} from "react";
import {openDB} from "idb";

export default function Release() {
    const { isLoggedIn, uid, nickname, avatar, active } = useAuth();
    const [title, setTitle] = useState('');
    const [paragraph, setParagraph] = useState('');
    const [images, setImages] = useState([]);
    const [tag, setTag] = useState([]);


    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleParagraphChange = (event) => {
        setParagraph(event.target.value);
    };

    const handleImageChange = async (event) => {
        const files = event.target.files;
        const imageUrls = [];

        // 限制图片数量，比如最多上传3张
        const maxImages = 6;
        for (let i = 0; i < Math.min(files.length, maxImages); i++) {
            const file = files[i];
            const db = await openDB('imageStore', 1, {
                upgrade(db) {
                    db.createObjectStore('images');
                }
            });
            const tx = db.transaction('images', 'readwrite');
            const store = tx.objectStore('images');
            const id = `image-${Date.now()}-${i}`;
            store.put(file, id);
            imageUrls.push(id); // 保存图片的唯一ID
            await tx.done;
        }

        // 更新状态，保存图片URL数组
        setImages(imageUrls);
    };

    const handleTagChange = (event) => {
        setTag(event.target.value);
    };

    function IncreaseActivity(){
        let registeredUsers = JSON.parse(localStorage.getItem('users') || '{}');
        let allUsersData = {};

        // 遍历已注册用户的邮箱
        for (const email in registeredUsers) {
            // 从localStorage获取单个用户的数据
            const userData = localStorage.getItem(email);
            if (userData) {
                // 将用户数据添加到allUsersData对象中
                allUsersData[email] = JSON.parse(userData);
            }
        }

        for (const email in allUsersData) {
            if (allUsersData[email].uid === uid) {
                allUsersData[email].active += 1;
                localStorage.setItem(email, JSON.stringify(allUsersData[email]));
                break;
            }
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        const rpid = Math.random().toString(36).substring(2, 15);

        const newData = {
            rpid,
            nickname: nickname,
            title,
            paragraph,
            images: images,
            avatarSrc: avatar,
            tag: tag,
        }

        IncreaseActivity();

        localStorage.setItem(rpid, JSON.stringify(newData));
        let data = JSON.parse(localStorage.getItem('cardData')) || {};
        data[rpid] = newData;
        localStorage.setItem('cardData', JSON.stringify(data));

        console.log('cardData:', data);

        window.location.href = '/home';
    };

    return (

        <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">

            <button
                type="button"
                className="inline-flex items-center rounded-md bg-pink-200 px-3 py-2 text-sm font-semibold text-pink-400 shadow-sm ring-1 ring-inset ring-pink-300 hover:bg-pink-50"
            >
                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    <a href="/home" className="text-sm font-semibold leading-6 text-gray-900">
                        <span aria-hidden="true">&larr;</span> 返回
                    </a>
                </div>
            </button>

            <div
                aria-hidden="true"
                className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
            >
                <div
                    style={{
                        clipPath:
                            'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                    }}
                    className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
                />
            </div>
            <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">发布新内容</h2>

            </div>


            <form onSubmit={handleSubmit} action="#" method="POST" className="mx-auto mt-16 max-w-xl sm:mt-20">
                <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">

                    <div className="sm:col-span-2">
                        <label htmlFor="title" className="block text-sm font-semibold leading-6 text-gray-900">
                            标题
                        </label>
                        <div className="mt-2.5">
                            <input
                                id="title"
                                name="title"
                                type="title"
                                onChange={handleTitleChange}
                                autoComplete="title"
                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div className="sm:col-span-2">
                        <label htmlFor="message" className="block text-sm font-semibold leading-6 text-gray-900">
                            内容
                        </label>
                        <div className="mt-2.5">
              <textarea
                  id="content"
                  name="content"
                  onChange={handleParagraphChange}
                  rows={4}
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue={''}
              />
                        </div>
                    </div>
                </div>

                <div className="sm:col-span-2">
                    <label htmlFor="tag" className="block text-sm font-semibold leading-6 text-gray-900">
                        兴趣圈
                    </label>
                    <div className="mt-2.5">
                        <input
                            id="tag"
                            name="tag"
                            type="tag"
                            onChange={handleTagChange}
                            autoComplete="tag"
                            className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>

                <div className="h-8"></div>


                {/* 图片上传输入框 */}
                <div className="sm:col-span-2">
                    <label htmlFor="images" className="block text-sm font-semibold leading-6 text-gray-900">
                        上传图片
                    </label>
                    <div className="mt-2.5">
                        <input
                            type="file"
                            className="file-input w-full max-w-xs"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                    </div>
                </div>


                <div className="mt-10">
                    <button
                        type="submit"
                        className="block w-full rounded-md bg-pink-400 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        发布！
                    </button>
                </div>
            </form>
        </div>
    )
}
