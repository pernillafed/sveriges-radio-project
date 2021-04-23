import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ContentContext } from '../contexts/ContentContext';

import styles from '../css/Categories.module.css';

function Categories() {

    const { categories } = useContext(ContentContext);

    return (
        <div className="container">
            <h2>Kategorier</h2>
            <div className={styles.categoryWrapper}>
                {categories && categories.map(category => (
                    <Link to={`/category/${category.id}`} key={category.id} className={styles.category}>
                        <h3>{category.name}</h3>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Categories;