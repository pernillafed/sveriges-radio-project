import { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ContentContext } from '../contexts/ContentContext';

import styles from '../css/Channels.module.css';

function Channels() {

    const { channels } = useContext(ContentContext);
    const [showChannels, setShowChannels] = useState([]);
    const [number, setNumber] = useState(10);

    useEffect(() => {
        if (channels) {
            const showing = channels.slice(0, number);
            setShowChannels(showing);
        }
    }, [number, channels]);

    const handleClick = () => {
        setNumber(number + 10);
    };

    return (
        <div className="container">
            <h2>Kanaler</h2>
            <div className={styles.channelWrapper}>
                {channels && showChannels.map(channel => (
                    <Link to={`/channels/${channel.id}`} key={channel.id} className={styles.channel}>
                        {channel.image ? (
                                <img src={channel.image} alt={channel.name} />
                            ) : (
                                <img src="https://static-cdn.sr.se/images/4866/92556cd3-3254-4424-91bb-6ba511f60f4c.jpg?preset=api-default-square" alt={channel.name} />
                            )
                        }
                    </Link>
                ))}
                {channels && showChannels.length < channels.length && (
                        <button className={styles.showMore} onClick={handleClick}>Visa fler kanaler</button>
                    )
                }
            </div>
        </div>
    );
}

export default Channels;