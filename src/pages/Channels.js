import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ChannelContext } from '../contexts/ChannelContext';

import styles from '../css/Channels.module.css';

function Channels() {

    const { channels } = useContext(ChannelContext);

    return (
        <div className="container">
            <h2>Kanaler</h2>
            <div className={styles.channelWrapper}>
                {channels && channels.map(channel => (
                    <Link to={`/channel/${channel.id}`} key={channel.id} className={styles.channel}>
                        {channel.image ? (
                                <img src={channel.image} alt={channel.name} />
                            ) : (
                                <img src="https://static-cdn.sr.se/images/4866/92556cd3-3254-4424-91bb-6ba511f60f4c.jpg?preset=api-default-square" alt={channel.name} />
                            )
                        }
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Channels;