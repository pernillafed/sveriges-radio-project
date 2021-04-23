import { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ContentContext } from '../contexts/ContentContext';

import styles from '../css/Programs.module.css';

function Programs() {

    const { programs } = useContext(ContentContext);
    const [showPrograms, setShowPrograms] = useState([]);
    const [number, setNumber] = useState(20);

    useEffect(() => {
        if (programs) {
            const showing = programs.slice(0, number);
            setShowPrograms(showing);
        }
    }, [number, programs]);

    const handleClick = () => {
        setNumber(number + 20);
    };

    return (
        <div className="container">
            <h2>Program</h2>
            <div className={styles.programWrapper}>
                {programs && showPrograms.map(program => (
                        <Link to={`/program/${program.id}`} key={program.id} className={styles.program}>
                            <img src={program.programimage} alt={program.name} />
                            <h3>{program.name}</h3>
                        </Link>
                )).sort(function(a, b) {
                    var x = a["name"];
                    var y = b["name"];
                    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
                })}
                {programs && showPrograms.length < programs.length && (
                        <button className={styles.showMore} onClick={handleClick}>Visa fler program</button>
                    )
                }
            </div>
        </div>
    );
}

export default Programs;