import { useEffect, useContext, useState } from 'react';
import { ContentContext } from '../contexts/ContentContext';
import { Link } from 'react-router-dom';

import styles from '../css/Programs.module.css';

function ChannelPrograms(props) {

    const { channelPrograms, getProgramsByChannel } = useContext(ContentContext);
    const { channelId } = props.match.params;
    const [showPrograms, setShowPrograms] = useState([]);
    const [number, setNumber] = useState(20);

    useEffect(() => {
        getProgramsByChannel(channelId);
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (channelPrograms) {
            const showing = channelPrograms.slice(0, number);
            setShowPrograms(showing);
        }
    }, [number, channelPrograms]);

    const handleClick = () => {
        setNumber(number + 20);
    };

    return (
        <div className="container">
            <h2>Program</h2>
            <div className={styles.programWrapper}>
                {channelPrograms && showPrograms.map(program => (
                    <Link to={`/programs/${program.id}`} key={program.id} className={styles.program}>
                        <img src={program.programimage} alt={program.name} />
                        <h3>{program.name}</h3>
                    </Link>
                ))}
                {channelPrograms && showPrograms.length < channelPrograms.length && (
                    <button className={styles.showMore} onClick={handleClick}>Visa fler program</button>
                )}
            </div>
        </div>
    );
}

export default ChannelPrograms;