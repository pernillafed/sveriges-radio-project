import { useEffect, useContext } from 'react';
import { ContentContext } from '../contexts/ContentContext';
import { Link } from 'react-router-dom';

import styles from '../css/Channel.module.css';

function Channel(props) {

    const { channel, getChannelById } = useContext(ContentContext);
    const { channelId } = props.match.params;

    useEffect(() => {
        getChannelById(channelId);
        // eslint-disable-next-line
    }, []);

    return (
        <div className="container">
            {channel && (
                <div>
                    <h2>{channel.name}</h2>
                    <div className={styles.contentWrapper}>
                        <div className={styles.channelInformation}>
                            <img src={channel.image} alt={channel.name} />
                            <p>{channel.tagline}</p>
                        </div>
                        <div className={styles.links}>
                            <Link to={`/channels/schedule/${channelId}`} className={styles.link}>Tablå</Link>
                            <Link to={`/channels/programs/${channelId}`} className={styles.link}>Program</Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Channel;