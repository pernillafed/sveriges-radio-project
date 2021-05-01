import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { Link } from "react-router-dom";

import styles from '../css/Favorites.module.css';

function Favorites(props) {

    const { loggedInUser, favorites, getUserFavoritesById, removeFavoriteFromId } = useContext(UserContext);
    const { userId } = props.match.params;

    const [showFavorites, setShowFavorites] = useState(false);

    useEffect(() => {
        getUserFavoritesById(userId);
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (favorites) {
            setShowFavorites(true);
        };
    }, [favorites]);

    const handleClick = async (e) => {
        if (favorites.length > 1) {
            await removeFavoriteFromId(userId, { favoriteId: e.target.id });
            getUserFavoritesById(userId);
        } else {
            await removeFavoriteFromId(userId, { favoriteId: e.target.id });
            setShowFavorites(false);
        };
    };

    return (
        <div className="container">
            {loggedInUser ? (
                <div>
                    <h2>Mina favoriter</h2>
                    {showFavorites ? (
                        <div className={styles.loggedInWrapper}>
                            <div className={styles.contentWrappers}>
                                <h3>Kanaler</h3>
                                <div className={styles.favoriteObjects}>
                                    {favorites.filter(favorite => favorite.type === "Channel").map(favorite => (
                                        <div key={favorite.favoriteId}  className={styles.favoriteObject}>
                                            <Link to={`/channels/${favorite.favoriteId}`}>
                                                <img src={favorite.img} alt={favorite.name} />
                                            </Link>
                                            <i className="fas fa-times-circle" id={favorite.favoriteId} onClick={handleClick}></i>
                                            <p>{favorite.name}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className={styles.contentWrappers}>
                                <h3>Program</h3>
                                <div className={styles.favoriteObjects}>
                                    {favorites.filter(favorite => favorite.type === "Program").map(favorite => (
                                        <div key={favorite.favoriteId}  className={styles.favoriteObject}>
                                            <Link to={`/programs/${favorite.favoriteId}`}>
                                                <img src={favorite.img} alt={favorite.name} />
                                            </Link>
                                            <i className="fas fa-times-circle" id={favorite.favoriteId} onClick={handleClick}></i>
                                            <p>{favorite.name}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <p className={styles.noFavorites}>Du har inga favoritmarkerade kanaler eller program</p>
                    )}
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