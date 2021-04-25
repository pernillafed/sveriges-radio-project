import { useEffect, useContext } from 'react';
import { ContentContext } from '../contexts/ContentContext';
import { Link } from 'react-router-dom';

import styles from '../css/Channel.module.css';

function Channel(props) {

    const { channel, getChannelById } = useContext(ContentContext);
    const { channelId } = props.match.params;

    useEffect(() => {
        getChannelById(channelId);
    }, []);

    return (
        <div className="container">
            {channel && (
                <div className={styles.channelContent}>
                    <h2>{channel.name}</h2>
                    <img src={channel.image} alt={channel.name} />
                    <p>{channel.tagline}</p>
                    <Link to={`/channels/schedule/${channelId}`}>Tablå</Link>
                </div>
            )}
        </div>
    );
}

export default Channel;