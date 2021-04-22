import { useState } from 'react';
import { NavLink } from 'react-router-dom';

import styles from '../css/Navbar.module.css';

function Navbar() {

    const [clicked, setClicked] = useState(false);

    const handleClick = (e) => {
        setClicked(!clicked);
    };

    return (
        <div className={styles.navbar}>
            <h1><NavLink to="/">radio<span className={styles.dot}>.</span></NavLink></h1>
            <i onClick={handleClick} className={`fas fa-bars ${styles.menu} ${clicked && styles.pink}`}></i>
            {clicked && (
                <div className={styles.links}>
                    <NavLink to="/" className={styles.link}>Startsida</NavLink>
                    <NavLink to="/channels" className={styles.link}>Kanaler</NavLink>
                    <NavLink to="/programs" className={styles.link}>Program</NavLink>
                    <NavLink to="/categories" className={styles.link}>Kategorier</NavLink>
                    <NavLink to="/login" className={`${styles.link} ${styles.newBlogLink}`}>Logga in</NavLink>
                </div>
            )}
        </div>
    );
}

export default Navbar;