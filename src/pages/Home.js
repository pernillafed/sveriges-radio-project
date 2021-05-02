import { useContext } from "react";
import { Link } from "react-router-dom";
import HomePageSection from "../components/HomePageSection";
import { ContentContext } from "../contexts/ContentContext";
import { UserContext } from '../contexts/UserContext';

import styles from '../css/Home.module.css';

function Home() {

    const { channels, programs, categories } = useContext(ContentContext);
    const { loggedInUser } = useContext(UserContext);

    return (
        <div className="container">
            {!loggedInUser ? <h2>Radio för alla</h2> : <h2>Hej {loggedInUser.firstName}!</h2>}
            <div className={styles.contentWrapper}>
                <div className={styles.contentWrappers}>
                    <h3>Kanaler</h3>
                    <div className={styles.homeChannels}>
                        {channels && channels.slice(0, 3).map(channel => (
                            <Link to={`/channels/${channel.id}`} key={channel.id} className={styles.homeChannel}>
                                <img src={channel.image} alt={channel.name} />
                            </Link>
                        ))}
                    </div>
                    <Link to="/channels" className={styles.goTo}>Gå vidare till alla kanaler <i className={`fas fa-arrow-right ${styles.arrowRight}`}></i></Link>
                </div>
                <HomePageSection type={programs} idRoute={"/programs"} route={"/programs"} title={"Program"} />
                <HomePageSection type={categories} idRoute={"/categories/programs"} route={"/categories"} title={"Kategorier"} />
            </div>
        </div>
    );
}

export default Home;