import { useEffect, useContext } from 'react';
import { ContentContext } from '../contexts/ContentContext';

function ChannelSchedule(props) {

    const { schedule, getChannelSchedule } = useContext(ContentContext);
    const { channelId } = props.match.params;

    useEffect(() => {
        getChannelSchedule(channelId);
    }, []);

    return (
        <div className="container">
            <h2>Tablå</h2>
            {schedule && schedule.map((episode, i) => (
                <div className="scheduleContent" key={i}>
                    <h3>{episode.title}</h3>
                    <p>{episode.starttimeutc} - {episode.endtimeutc}</p>
                </div>
            ))}
        </div>
    );
}

export default ChannelSchedule;