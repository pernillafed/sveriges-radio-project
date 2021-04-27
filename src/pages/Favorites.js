import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { Link } from "react-router-dom";

import styles from '../css/Favorites.module.css';

function Favorites() {

    const { loggedInUser } = useContext(UserContext);

    return (
        <div className="container">
            {loggedInUser ? (
                <div className={styles.loggedInWrapper}>
                    <h2>Mina favoriter</h2>
                </div>
            ) : (
                <div className={styles.loggedOutWrapper}>
                    <h2>Du måste vara inloggad för att kunna nå denna sida!</h2>
                    <Link to="/users/login" className={styles.loginLink}>Logga in</Link>
                    <Link to="/users/register" className={styles.registerLink}>Inte medlem? Registrera dig!</Link>
                </div>
            )}
        </div>
    );
}

export default Favorites;