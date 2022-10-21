import React, { useState } from 'react';
import './Sidebar.css';
import { Link } from 'react-router-dom';



const Sidebar = () => {
    const [show, setShow] = useState(false);

    return (
        <main className={show ? 'space-toggle' : null}>
            <header className={`header ${show ? 'space-toggle' : null}`}>
                <div className='header-toggle' onClick={() => setShow(!show)}>
                    <i className={`fas fa-bars ${show ? 'fa-solid fa-xmark' : null}`}></i>
                </div>
            </header>

            <aside className={`sidebar ${show ? 'show' : null}`}>
                <nav className='nav'>
                    <div>
                        <Link to='/' className='nav-logo'>
                            <i className={`fas fa-home-alt nav-logo-icon`}></i>
                            <span className='nav-logo-name'>Homepage</span>
                        </Link>

                        <div className='nav-list'>

                            <Link to='/dashboard' className='nav-link active'>
                                <i class="fa-solid fa-user"></i>
                                <span className='nav-link-name'>Hey ana flan</span>
                            </Link>

                            <Link to='/gallery' className='nav-link'>
                                <i class="fa-solid fa-file-lines"></i>
                                <span className='nav-link-name'>Mes réclamations</span>
                            </Link>

                            <Link to='/Notification' className='nav-link'>
                                <i class="fa-solid fa-bell"></i>
                                <span className='nav-link-name'>Notifications</span>
                            </Link>

                        </div>
                    </div>
                    <Link to='/logout' className='nav-link'>
                        <i className='fas fa-sign-out nav-link-icon'></i>
                        <span className='nav-link-name'>Se déconnecter </span>
                    </Link>
                </nav>
            </aside>



        </main>
    );
};

export default Sidebar;