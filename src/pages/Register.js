import { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

import styles from '../css/Login.module.css';

function Register() {

    const { register } = useContext(UserContext);

    const history = useHistory();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleFirstNameChange = (e) => {
        setFirstName(e.target.value);
    };
    const handleLastNameChange = (e) => {
        setLastName(e.target.value);
    };
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
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
            history.push("/users/login");
        } else {
            console.log(result);
        }
    };

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
                <button className={styles.formBtn}>Registrera</button>
            </form>
            <div className={styles.switchRouteLink}>
                <Link to="/users/login">Redan medlem? Logga in!</Link>
            </div>
        </div>
    );
}

export default Register;