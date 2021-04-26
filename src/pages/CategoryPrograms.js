import { useEffect, useContext, useState } from 'react';
import { ContentContext } from '../contexts/ContentContext';
import { Link } from 'react-router-dom';

import styles from '../css/Programs.module.css';

function CategoryPrograms(props) {

    const { category, categoryPrograms, getCategoryById, getProgramsByCategory } = useContext(ContentContext);
    const { categoryId } = props.match.params;
    const [showPrograms, setShowPrograms] = useState([]);
    const [number, setNumber] = useState(20);

    useEffect(() => {
        getCategoryById(categoryId);
        getProgramsByCategory(categoryId);
    }, []);
    
    useEffect(() => {
        if (categoryPrograms) {
            const showing = categoryPrograms.slice(0, number);
            setShowPrograms(showing);
        }
    }, [number, categoryPrograms]);

    const handleClick = () => {
        setNumber(number + 20);
    };

    return (
        <div className="container">
            {category && (
                <div className={styles.programWrapper}>
                    <h2>{category.name}</h2>
                    {categoryPrograms && showPrograms.map(program => (
                        <Link to={`/programs/${program.id}`} key={program.id} className={styles.program}>
                            <img src={program.programimage} alt={program.name} />
                            <h3>{program.name}</h3>
                        </Link>
                    ))}
                    {categoryPrograms && showPrograms.length < categoryPrograms.length && (
                        <button className={styles.showMore} onClick={handleClick}>Visa fler program</button>
                    )}
                </div>
            )}
        </div>
    );
}

export default CategoryPrograms;