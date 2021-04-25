import { useEffect, useContext } from 'react';
import { ContentContext } from '../contexts/ContentContext';

import styles from '../css/Channel.module.css';

function ChannelSchedule(props) {

    const { channelSchedule, getChannelSchedule } = useContext(ContentContext);
    const { channelId } = props.match.params;

    useEffect(() => {
        getChannelSchedule(channelId);
    }, []);

    return (
        <div className="container">
            <h2>Tablå</h2>
            {channelSchedule && channelSchedule.map((episode, i) => (
                <div className={styles.scheduleContent} key={i}>
                    <h3>{episode.starttimeutc}</h3>
                    <p>{episode.title}</p>
                </div>
            ))}
        </div>
    );
}

export default ChannelSchedule;