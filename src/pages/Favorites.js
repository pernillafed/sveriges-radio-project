import { useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import { Link } from "react-router-dom";

import styles from '../css/Favorites.module.css';

function Favorites(props) {

    const { loggedInUser, favorites, getUserFavoritesById } = useContext(UserContext);
    const { userId } = props.match.params;

    useEffect(() => {
        getUserFavoritesById(userId);
        // eslint-disable-next-line
    }, []);

    return (
        <div className="container">
            {loggedInUser ? (
                <div className={styles.loggedInWrapper}>
                    <h2>Mina favoriter</h2>
                    <div className="channels">
                        <h3>Kanaler</h3>
                        {favorites ? (
                            favorites.filter(favorite => favorite.type === "Channel").map(favorite => (
                                <img src={favorite.img} alt={favorite.name} key={favorite.favoriteId} />
                            ))
                        ): (
                            <p>Du har inga favoritmarkerade kanaler</p>
                        )}
                    </div>
                    <div className="programs">
                        <h3>Program</h3>
                        {favorites ? (
                            favorites.filter(favorite => favorite.type === "Program").map(favorite => (
                                <img src={favorite.img} alt={favorite.name} key={favorite.favoriteId} />
                            ))
                        ) : (
                            <p>Du har inga favoritmarkerade program</p>
                        )}
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

export default Favorites;