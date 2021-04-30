import { useEffect, useContext, useState } from 'react';
import { ContentContext } from '../contexts/ContentContext';
import { UserContext } from '../contexts/UserContext';
import { Link, useHistory } from 'react-router-dom';

import styles from '../css/Channel.module.css';

function Channel(props) {

    const { channel, getChannelById } = useContext(ContentContext);
    const { loggedInUser, favorites, whoami, getUserFavoritesById, addFavoriteToDB, addFavoriteToId, removeFavoriteFromId } = useContext(UserContext);
    const { channelId } = props.match.params;

    const [inFavorites, setInFavorites] = useState(false);

    const history = useHistory();

    useEffect(() => {
        getChannelById(channelId);
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (loggedInUser) {
            console.log("In channel: ", loggedInUser);
        }
    }, []);

    const addToFavorites = async () => {
        setInFavorites(true);
        let newFavorite = {
            favoriteId: channelId,
            type: "Channel",
            name: channel.name,
            img: channel.image
        };
        await addFavoriteToDB(newFavorite);
        await addFavoriteToId(loggedInUser.userId, { name: channel.name });
    };

    const removeFromFavorites = async () => {
        setInFavorites(false);
        await removeFavoriteFromId(loggedInUser.userId, { favoriteId: channelId });
    };

    return (
        <div className="container">
            {channel && (
                <div>
                    {!loggedInUser ? (
                        <h2>{channel.name}</h2>
                    ) : (
                        <div className={styles.loggedInHeading}>
                            <h2>{channel.name}</h2>
                            {!inFavorites ? (
                                <i className="far fa-heart" onClick={addToFavorites}></i>
                            ) : (
                                <i className="fas fa-heart" onClick={removeFromFavorites}></i>
                            )}
                        </div>
                    )}
                    <div className={styles.contentWrapper}>
                        <div className={styles.channelInformation}>
                            <img src={channel.image} alt={channel.name} />
                            <p>{channel.tagline}</p>
                        </div>
                        <div className={styles.links}>
                            <Link to={`/channels/schedule/${channelId}`} className={styles.link}>Tablå</Link>
                            <Link to={`/channels/programs/${channelId}`} className={styles.link}>Program</Link>
                        </div>
                        <p onClick={() => history.goBack()} className={styles.goBack}><i className="fas fa-arrow-left"></i>Tillbaka</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Channel;