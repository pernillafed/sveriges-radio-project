import { useEffect, useContext } from 'react';
import { ContentContext } from '../contexts/ContentContext';

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
                </div>
            )}
        </div>
    );
}

export default Channel;