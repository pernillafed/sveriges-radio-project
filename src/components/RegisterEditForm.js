import { useEffect, useState } from 'react';
import styles from '../css/Login.module.css';

function RegisterEditForm({ formFunction, setShowPopup, errorMsg, title, btnText, loggedInUser }) {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        if (loggedInUser) {
            setFirstName(loggedInUser.title);
            setLastName(loggedInUser.author);
            setEmail(loggedInUser.snippet);
            setPassword(loggedInUser.content);
        }
    }, [loggedInUser]);

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
        let result = await formFunction(newUser);
        if (result.success) {
            setShowPopup(true);
        } else {
            setError(errorMsg);
        }
    };

    return (
        <div>
            <h2>{title}</h2>
            <form className={styles.inputForm} onSubmit={handleSubmit}>
                <div className={styles.inputFields}>
                    <input type="text" placeholder="förnamn" onChange={handleFirstNameChange} required />
                    <input type="text" placeholder="efternamn" onChange={handleLastNameChange} required />
                    <input type="email" placeholder="email" onChange={handleEmailChange} required />
                    <input type="password" placeholder="lösenord" onChange={handlePasswordChange} required />
                </div>
                {error && <p>{error}</p>}
                <button className={styles.formBtn}>{btnText}</button>
            </form>
        </div>
    );
}

export default RegisterEditForm;