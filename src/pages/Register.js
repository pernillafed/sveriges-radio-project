import { useContext, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

import useOutsideClick from '../components/useOutsideClick';

import styles from '../css/Login.module.css';

function Register() {

    const { register } = useContext(UserContext);

    const popupRef = useRef();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showPopup, setShowPopup] = useState(false)

    const handleFirstNameChange = (e) => {
        setFirstName(e.target.value);
    };
    const handleLastNameChange = (e) => {
        setLastName(e.target.value);
    };
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setError("");
    };
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        let newUser = {
            firstName,
            lastName,
            email,
            password
        };
        let result = await register(newUser);
        if (result.success) {
            setShowPopup(true);
        } else {
            setError("Användare med denna email finns redan");
        }
    };

    const handleClickOutside = () => {
        setShowPopup(false);
    };

    useOutsideClick(handleClickOutside, popupRef);

    return (
        <div className="container">
            <h2>Registrera</h2>
            <form className={styles.inputForm} onSubmit={handleSubmit}>
                <div className={styles.inputFields}>
                    <input type="text" placeholder="förnamn" onChange={handleFirstNameChange} required />
                    <input type="text" placeholder="efternamn" onChange={handleLastNameChange} required />
                    <input type="email" placeholder="email" onChange={handleEmailChange} required />
                    <input type="password" placeholder="lösenord" onChange={handlePasswordChange} required />
                </div>
                {error && <p>{error}</p>}
                <button className={styles.formBtn}>Registrera</button>
            </form>
            <div className={styles.switchRouteLink}>
                <Link to="/users/login">Redan medlem? Logga in!</Link>
            </div>
            {showPopup && (
                <div className={styles.popupBackground}>
                    <div className={styles.popup} ref={popupRef}>
                        <p>Du är nu registrerad!</p>
                        <Link to={"/users/login"}>Logga in</Link>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Register;