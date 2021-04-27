import { useEffect, useContext } from 'react';
import { useHistory } from 'react-router';
import { ContentContext } from '../contexts/ContentContext';

import styles from '../css/Channel.module.css';

function ChannelSchedule(props) {

    const { channelSchedule, getChannelSchedule } = useContext(ContentContext);
    const { channelId } = props.match.params;

    const history = useHistory();

    useEffect(() => {
        getChannelSchedule(channelId);
        // eslint-disable-next-line
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
            <p onClick={() => history.goBack()} className={styles.goBack}><i className="fas fa-arrow-left"></i>Tillbaka</p>
        </div>
    );
}

export default ChannelSchedule;