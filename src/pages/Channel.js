import { useEffect, useContext, useState } from 'react';
import { ContentContext } from '../contexts/ContentContext';
import { UserContext } from '../contexts/UserContext';
import { Link, useHistory } from 'react-router-dom';

import styles from '../css/Channel.module.css';

function Channel(props) {

    const { channel, getChannelById } = useContext(ContentContext);
    const { loggedInUser, addFavoriteToDB, addFavoriteToId } = useContext(UserContext);
    const { channelId } = props.match.params;

    const [showFavoriteAdded, setShowFavoriteAdded] = useState(false);
    const [showAlreadyAdded, setShowAlreadyAdded] = useState(false);

    const history = useHistory();

    useEffect(() => {
        getChannelById(channelId);
        // eslint-disable-next-line
    }, []);

    const addToFavorites = async () => {
        let newFavorite = {
            favoriteId: channelId,
            type: "Channel",
            name: channel.name,
            img: channel.image
        };
        await addFavoriteToDB(newFavorite);
        let result = await addFavoriteToId(loggedInUser.userId, { name: channel.name });
        if (result.success) {
            setShowFavoriteAdded(true);
            setShowAlreadyAdded(false);
        } else {
            setShowAlreadyAdded(true);
            setShowFavoriteAdded(false);
        };
    };

    return (
        <div className="container">
            {channel && (
                <div>
                    {!loggedInUser ? (
                        <h2>{channel.name}</h2>
                    ) : (
                        <div className={styles.loggedInHeadingWrapper}>
                            <div className={styles.loggedInHeading}>
                                <h2>{channel.name}</h2>
                                <i className="fas fa-heart" onClick={addToFavorites}></i>
                            </div>
                            {showFavoriteAdded && <div className={styles.addedInformation}>Tillagd i favoriter</div>}
                            {showAlreadyAdded && <div className={styles.addedInformation}>Redan tillagd</div>}
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