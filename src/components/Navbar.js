import { useContext, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

import useOutsideClick from './useOutsideClick';

import styles from '../css/Navbar.module.css';

function Navbar() {

    const [showDropdown, setShowDropdown] = useState(false);
    const { loggedInUser, logout } = useContext(UserContext);
    const navRef = useRef();

    const handleClick = () => {
        setShowDropdown(!showDropdown);
    };

    const handleLinkClick = () => {
        setShowDropdown(false);
    };
    
    const handleLogout = () => {
        logout();
        setShowDropdown(false);
    };

    const handleClickOutside = () => {
        setShowDropdown(false);
    };
    
    useOutsideClick(handleClickOutside, navRef);

    return (
        <div className={styles.navbar} ref={navRef}>
            <h1><NavLink to="/" onClick={handleLinkClick}>radio<span className={styles.dot}>.</span></NavLink></h1>
            <div className={styles.navLinks}>
                <NavLink onClick={handleLinkClick} to="/" className={styles.link}>Startsida</NavLink>
                <NavLink onClick={handleLinkClick} to="/channels" className={styles.link}>Kanaler</NavLink>
                <NavLink onClick={handleLinkClick} to="/programs" className={styles.link}>Program</NavLink>
                <NavLink onClick={handleLinkClick} to="/categories" className={styles.link}>Kategorier</NavLink>
                {loggedInUser ? (
                    <div className={styles.loggedInLinks}>
                        <NavLink onClick={handleLinkClick} to={`/users/whoami`} className={styles.link}>Min sida</NavLink>
                        <NavLink onClick={handleLogout} to="/" className={styles.link}>Logga ut</NavLink>
                    </div>  
                ) : (
                    <NavLink onClick={handleLinkClick} to="/users/login" className={`${styles.link} ${styles.loginLink}`}>Logga in / Registrera</NavLink>
                )}
            </div>
            <i onClick={handleClick} className={`fas fa-bars ${styles.menu} ${showDropdown && styles.pink}`}></i>
            {showDropdown && (
                <div className={styles.links}>
                    <NavLink onClick={handleLinkClick} to="/" className={styles.link}>Startsida</NavLink>
                    <NavLink onClick={handleLinkClick} to="/channels" className={styles.link}>Kanaler</NavLink>
                    <NavLink onClick={handleLinkClick} to="/programs" className={styles.link}>Program</NavLink>
                    <NavLink onClick={handleLinkClick} to="/categories" className={styles.link}>Kategorier</NavLink>
                    {loggedInUser ? (
                        <div className={styles.loggedInLinks}>
                            <NavLink onClick={handleLinkClick} to={`/users/whoami`} className={styles.link}>Min sida</NavLink>
                            <NavLink onClick={handleLogout} to="/" className={styles.link}>Logga ut</NavLink>
                        </div>  
                    ) : (
                        <NavLink onClick={handleLinkClick} to="/users/login" className={`${styles.link} ${styles.loginLink}`}>Logga in / Registrera</NavLink>
                    )}
                </div>
            )}
        </div>
    );
}

export default Navbar;