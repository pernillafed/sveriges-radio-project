import { useEffect, useContext } from 'react';
import { ContentContext } from '../contexts/ContentContext';

import styles from '../css/Program.module.css';

function Program(props) {

    const { program, getProgramById } = useContext(ContentContext);
    const { programId } = props.match.params;

    useEffect(() => {
        getProgramById(programId);
        // eslint-disable-next-line
    }, []);

    return (
        <div className="container">
            {program && (
                <div>
                    <h2>{program.name}</h2>
                    <div className={styles.contentWrapper}>
                        <div className={styles.programInformation}>
                            <img src={program.programimage} alt={program.name} />
                            <p>{program.description}</p>
                        </div>
                        {program.email && (
                            <div className={styles.contact}>
                                <h3>Kontakt</h3>
                                <div className={styles.contactInformation}>
                                    <p>{program.email}</p>
                                    <div className={styles.socialMediaLinks}>
                                        {program.socialmediaplatforms && program.socialmediaplatforms.map((platform, i) => (
                                            <a key={i} href={platform.platformurl}>
                                                {platform.platform === "Facebook" ? (
                                                    <i className="fab fa-facebook-square"></i>
                                                ) : platform.platform === "Twitter" ? (
                                                    <i className="fab fa-twitter-square"></i>
                                                ) : (
                                                    <i className="fab fa-instagram-square"></i>
                                                )}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Program;