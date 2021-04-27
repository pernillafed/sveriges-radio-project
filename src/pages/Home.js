import { useContext } from "react";
import { Link } from "react-router-dom";
import { ContentContext } from "../contexts/ContentContext";

import styles from '../css/Home.module.css';

function Home() {

    const { channels, programs, categories } = useContext(ContentContext);

    return (
        <div className="container">
            <h2>Radio för alla</h2>
            <div className={styles.contentWrapper}>
                <div className={styles.contentWrappers}>
                    <h3>Kanaler</h3>
                    <div className={styles.homeChannels}>
                        {channels && channels.slice(0, 3).map(channel => (
                            <Link to={`/channels/${channel.id}`} key={channel.id} className={styles.homeChannel}>
                                <img  src={channel.image} alt={channel.name} />
                            </Link>
                        ))}
                    </div>
                    <Link to="/channels" className={styles.goTo}>Gå vidare till alla kanaler <i className={`fas fa-arrow-right ${styles.arrowRight}`}></i></Link>
                </div>
                <div className={styles.contentWrappers}>
                    <h3>Program</h3>
                    <div className={styles.homePrograms}>
                        {programs && programs.slice(0, 4).map(program => (
                            <Link to={`/programs/${program.id}`} key={program.id} className={styles.homeProgram}>
                                {program.name}
                            </Link>
                        ))}
                    </div>
                    <Link to="/programs" className={styles.goTo}>Gå vidare till alla program <i className={`fas fa-arrow-right ${styles.arrowRight}`}></i></Link>
                </div>
                <div className={styles.contentWrappers}>
                    <h3>Kategorier</h3>
                    <div className={styles.homeCategories}>
                        {categories && categories.slice(0, 4).map(category => (
                            <Link to={`/categories/programs/${category.id}`} key={category.id} className={styles.homeCategory}>
                                {category.name}
                            </Link>
                        ))}
                    </div>
                    <Link to="/categories" className={styles.goTo}>Gå vidare till alla kategorier <i className={`fas fa-arrow-right ${styles.arrowRight}`}></i></Link>
                </div>
            </div>
        </div>
    );
}

export default Home;