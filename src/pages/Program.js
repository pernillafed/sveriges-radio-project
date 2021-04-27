import { useEffect, useContext, useState } from 'react';
import { useHistory } from 'react-router';
import { ContentContext } from '../contexts/ContentContext';
import { UserContext } from '../contexts/UserContext';

import styles from '../css/Program.module.css';

function Program(props) {

    const { program, getProgramById } = useContext(ContentContext);
    const { loggedInUser } = useContext(UserContext);
    const { programId } = props.match.params;

    const [inFavorites, setInFavorites] = useState(false);

    const history = useHistory();

    useEffect(() => {
        getProgramById(programId);
        // eslint-disable-next-line
    }, []);

    const addToFavorites = () => {
        setInFavorites(true);
    };

    const removeFromFavorites = () => {
        setInFavorites(false);
    };

    return (
        <div className="container">
            {program && (
                <div>
                    {!loggedInUser ? (
                        <h2>{program.name}</h2>
                    ) : (
                        <div className={styles.loggedInHeading}>
                            <h2>{program.name}</h2>
                            {!inFavorites ? (
                                <i className="far fa-heart" onClick={addToFavorites}></i>
                            ) : (
                                <i className="fas fa-heart" onClick={removeFromFavorites}></i>
                            )}
                        </div>
                    )}
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
                        <p onClick={() => history.goBack()} className={styles.goBack}><i className="fas fa-arrow-left"></i>Tillbaka</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Program;