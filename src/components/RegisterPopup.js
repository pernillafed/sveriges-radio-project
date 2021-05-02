import { useRef } from 'react';
import { Link } from 'react-router-dom';

import useOutsideClick from '../components/useOutsideClick';

import styles from '../css/Login.module.css';

function RegisterPopup({ setShowPopup, msg, route, linkText }) {

    const popupRef = useRef();

    const handleClickOutside = () => {
        setShowPopup(false);
    };

    useOutsideClick(handleClickOutside, popupRef);

    return (
        <div className={styles.popupBackground}>
            <div className={styles.popup} ref={popupRef}>
                <p>{msg}</p>
                <Link to={route}>{linkText}</Link>
            </div>
        </div>
    );
}

export default RegisterPopup;