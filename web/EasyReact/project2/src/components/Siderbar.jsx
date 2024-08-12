import React, {useEffect, useState} from 'react';
import './Siderbar.css'; // 假设你的CSS样式在Sidebar.css文件中

const Sidebar = () => {
    const [sortedUsers, setSortedUsers] = useState([]);

    useEffect(() => {
        const sortedUsers = getSortedUsersByActivity();
        setSortedUsers(sortedUsers);
    }, []);

    let registeredUsers = JSON.parse(localStorage.getItem('users') || '{}');

// 获取所有用户数据的函数
    function getAllUsersData() {
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

        return allUsersData;
    }

    // 根据活跃度对用户进行排序
    function getSortedUsersByActivity() {
        const allUsersData = getAllUsersData();
        // 将对象转换为数组并排序
        const sortedUsers = Object.values(allUsersData).sort((a, b) => b.active - a.active);
        return sortedUsers;
    }

    return (
        <div className="sidebar">
            <div className="sidebar-header">
                活跃榜
            </div>

            {console.log(getAllUsersData())}
            {console.log(getSortedUsersByActivity())}


            {sortedUsers.map((user) => (
                <li key={user.uid}>
                    <img src={user.avatar} alt={`Avatar of ${user.nickname}`} width="50" height="50" />
                    <span>{user.nickname}</span>
                </li>
            ))}

        </div>
    );
};

export default Sidebar;
