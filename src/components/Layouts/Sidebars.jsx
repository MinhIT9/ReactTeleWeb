// src/Components/Layouts/Sidebar.jsx

import { Link } from 'react-router-dom';

export const Sidebars = () => {
    return (
        <div id='sidebars_cus' className="sidebar border border-right col-md-3 col-lg-2 p-0 bg-body-tertiary">
            <div className="offcanvas-md offcanvas-end bg-body-tertiary" tabIndex={-1} id="sidebarMenu" aria-labelledby="sidebarMenuLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="sidebarMenuLabel">Company name</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" data-bs-target="#sidebarMenu" aria-label="Close" />
                </div>
                <div className="offcanvas-body d-md-flex flex-column p-0 pt-lg-3 overflow-y-auto">
                    <ul className="nav flex-column">
                        <li className="nav-item">
                            <Link className="nav-link d-flex align-items-center gap-2 active" aria-current="page" to="/">
                                <i className="fa-solid fa-house" />
                                Dashboard
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link d-flex align-items-center gap-2" to="/manage-message">
                                <i className="fa-solid fa-message" />
                                Quản Lý Tin Nhắn
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link d-flex align-items-center gap-2" to="/manage-channels">
                                <i className="fa-sharp fa-solid fa-list" />
                                Quản Lý Channels
                            </Link>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link d-flex align-items-center gap-2" href="#">
                                <i className="fa-solid fa-link"></i>
                                Quản Lý API-LINK
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link d-flex align-items-center gap-2" href="#">
                                <i className="fa-solid fa-chart-simple"></i>
                                Reports
                            </a>
                        </li>
                    </ul>
                    <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-body-secondary text-uppercase">
                        <span>Saved reports</span>
                        <a className="link-secondary" href="#" aria-label="Add a new report">
                            <i className="fa-solid fa-square-plus"></i>
                        </a>
                    </h6>
                    <ul className="nav flex-column mb-auto">
                        <li className="nav-item">
                            <a className="nav-link d-flex align-items-center gap-2" href="#">
                                <i className="fa-solid fa-book"></i>
                                Current month
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link d-flex align-items-center gap-2" href="#">
                                <i className="fa-solid fa-book"></i>
                                Last quarter
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link d-flex align-items-center gap-2" href="#">
                                <i className="fa-solid fa-book"></i>
                                Social engagement
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link d-flex align-items-center gap-2" href="#">
                                <i className="fa-solid fa-book"></i>
                                Year-end sale
                            </a>
                        </li>
                    </ul>
                    <hr className="my-3" />
                    <ul className="nav flex-column mb-auto">
                        <li className="nav-item">
                            <a className="nav-link d-flex align-items-center gap-2" href="#">
                                <i className="fa-solid fa-gear"></i>
                                Settings
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link d-flex align-items-center gap-2" href="#">
                                <i className="fa-solid fa-door-closed"></i>
                                Sign out
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

    );
};
