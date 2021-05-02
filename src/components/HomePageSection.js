import { Link } from 'react-router-dom';

import styles from '../css/Home.module.css';

function HomePageSection({ type, idRoute, route, title }) {
    return (
        <div className={styles.contentWrappers}>
            <h3>{title}</h3>
            <div className={styles.homeProgramsAndCategories}>
                {type && type.slice(0, 4).map(obj => (
                    <Link to={`${idRoute}/${obj.id}`} key={obj.id} className={styles.homeProgramAndCategory}>
                        {obj.name}
                    </Link>
                ))}
            </div>
            <Link to={route} className={styles.goTo}>Gå vidare till alla {title.toLowerCase()} <i className={`fas fa-arrow-right ${styles.arrowRight}`}></i></Link>
        </div>
    );
}

export default HomePageSection;