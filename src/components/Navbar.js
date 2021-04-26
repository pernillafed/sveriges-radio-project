import { useState } from 'react';
import { NavLink } from 'react-router-dom';

import styles from '../css/Navbar.module.css';

function Navbar() {

    const [showDropdown, setShowDropdown] = useState(false);

    const handleClick = () => {
        setShowDropdown(!showDropdown);
    };

    const handleLinkClick = () => {
        setShowDropdown(false);
    };

    return (
        <div className={styles.navbar}>
            <h1><NavLink to="/" onClick={handleLinkClick}>radio<span className={styles.dot}>.</span></NavLink></h1>
            <i onClick={handleClick} className={`fas fa-bars ${styles.menu} ${showDropdown && styles.pink}`}></i>
            {showDropdown && (
                <div className={styles.links}>
                    <NavLink onClick={handleLinkClick} to="/" className={styles.link}>Startsida</NavLink>
                    <NavLink onClick={handleLinkClick} to="/channels" className={styles.link}>Kanaler</NavLink>
                    <NavLink onClick={handleLinkClick} to="/programs" className={styles.link}>Program</NavLink>
                    <NavLink onClick={handleLinkClick} to="/categories" className={styles.link}>Kategorier</NavLink>
                    <NavLink onClick={handleLinkClick} to="/users/login" className={`${styles.link} ${styles.newBlogLink}`}>Logga in / Registrera</NavLink>
                </div>
            )}
        </div>
    );
}

export default Navbar;