import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

import styles from '../css/MyPage.module.css';

function MyPage() {

    const { loggedInUser, whoami, logout } = useContext(UserContext);

    useEffect(() => {
        whoami();
        // eslint-disable-next-line
    }, []);

    const handleLogout = () => {
        logout();
    };

    return (
        <div className="container">
            {loggedInUser ? (
                <div>
                    <h2>Min sida</h2>
                    <div className={styles.contentWrapper}>
                        <div className={styles.contactWrapper}>
                            <h3>Mina uppgifter</h3>
                            <div className={styles.contactInformation}>
                                <h4>Förnamn</h4>
                                <p>{loggedInUser.firstName}</p>
                                <h4>Efternamn</h4>
                                <p>{loggedInUser.lastName}</p>
                                <h4>Email</h4>
                                <p>{loggedInUser.email}</p>
                                <h4>Lösenord</h4>
                                <p>*****</p>
                            </div>
                            <Link to={`/users/edit/${loggedInUser.userId}`} className={styles.editLink}>Ändra uppgifter</Link>
                        </div>
                        <div className={styles.links}>
                            <Link to={`/users/favorites/${loggedInUser.userId}`} className={styles.btnLink}>Mina favoriter</Link>
                            <Link onClick={handleLogout} to="/" className={styles.btnLink}>Logga ut</Link>
                        </div>
                    </div>
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

export default MyPage;