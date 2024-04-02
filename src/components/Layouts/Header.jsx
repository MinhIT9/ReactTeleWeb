// src/Components/Layouts/Header.jsx

import { useContext } from 'react';
import { Link } from "react-router-dom";
import { AuthContext } from '../../context/AuthContext'; // Đảm bảo đường dẫn đến AuthContext đúng


export const Header = () => {
    const { authData } = useContext(AuthContext); // Sử dụng AuthContext để truy cập dữ liệu xác thực

    return (
        <header className="navbar sticky-top bg-dark flex-md-nowrap p-0 shadow" data-bs-theme="dark">
            <Link className="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6 text-white" to="/">System Telegram PRO</Link>
            <ul className="navbar-nav px-3">
                {/* Kiểm tra trạng thái đăng nhập để hiển thị nút đúng */}
                {!authData ? (
                    // Nếu không có dữ liệu xác thực, hiển thị nút đăng nhập và đăng ký
                    <>
                        <li className="nav-item text-nowrap">
                            <Link className="nav-link text-white" to="/login">Login</Link>
                        </li>
                        <li className="nav-item text-nowrap">
                            <Link className="nav-link text-white" to="/register">Register</Link>
                        </li>
                    </>
                ) : (
                    // Nếu đã đăng nhập, có thể hiển thị tên người dùng hoặc nút đăng xuất tại đây
                    <li className="nav-item text-nowrap">
                        <span className="nav-link text-white">Hello, {authData.name}</span>
                    </li>
                )}
            </ul>
            <ul className="navbar-nav flex-row d-md-none">
                <li className="nav-item text-nowrap">
                    <button className="nav-link px-3 text-white" type="button" data-bs-toggle="offcanvas" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
                        <i className="fa-solid fa-list-ul"></i>
                    </button>
                </li>
            </ul>
        </header>

    )
}
