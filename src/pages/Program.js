import { useEffect, useContext, useState } from 'react';
import { useHistory } from 'react-router';
import { ContentContext } from '../contexts/ContentContext';
import { UserContext } from '../contexts/UserContext';

import styles from '../css/Program.module.css';

function Program(props) {

    const { program, getProgramById } = useContext(ContentContext);
    const { loggedInUser, addFavoriteToDB, addFavoriteToId } = useContext(UserContext);
    const { programId } = props.match.params;

    const [showFavoriteAdded, setShowFavoriteAdded] = useState(false);
    const [showAlreadyAdded, setShowAlreadyAdded] = useState(false);

    const history = useHistory();

    useEffect(() => {
        getProgramById(programId);
        // eslint-disable-next-line
    }, []);

    const addToFavorites = async () => {
        let newFavorite = {
            favoriteId: programId,
            type: "Program",
            name: program.name,
            img: program.programimage
        };
        await addFavoriteToDB(newFavorite);
        let result = await addFavoriteToId(loggedInUser.userId, { name: program.name });
        if (result.success) {
            setShowFavoriteAdded(true);
            setShowAlreadyAdded(false);
        } else {
            setShowAlreadyAdded(true);
            setShowFavoriteAdded(false);
        };
    };

    return (
        <div className="container">
            {program && (
                <div>
                    {!loggedInUser ? (
                        <h2>{program.name}</h2>
                    ) : (
                        <div className={styles.loggedInHeadingWrapper}>
                            <div className={styles.loggedInHeading}>
                                <h2>{program.name}</h2>
                                <i className="fas fa-heart" onClick={addToFavorites}></i>
                            </div>
                            {showFavoriteAdded && <div className={styles.addedInformation}>Tillagd i favoriter</div>}
                            {showAlreadyAdded && <div className={styles.addedInformation}>Redan tillagd</div>}
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