import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

import RegisterPopup from '../components/RegisterPopup';
import RegisterEditForm from '../components/RegisterEditForm';

import styles from '../css/Login.module.css';

function Register() {

    const { loggedInUser, logout, register } = useContext(UserContext);

    const [showPopup, setShowPopup] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

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
            setError("Denna email används redan");
        }
    };

    const handleLogout = () => {
        logout();
    };

    return (
        <div className="container">
            {!loggedInUser ? (
                <div>
                    <RegisterEditForm
                        title={"Registrera"}
                        btnText={"Registrera"}
                        handleFirstNameChange={handleFirstNameChange}
                        handleLastNameChange={handleLastNameChange}
                        handleEmailChange={handleEmailChange}
                        handlePasswordChange={handlePasswordChange}
                        handleSubmit={handleSubmit}
                        error={error}
                    />
                    <div className={styles.switchRouteLink}>
                        <Link to="/users/login">Redan medlem? Logga in!</Link>
                    </div>
                </div>
            ) : (
                <div>
                    <h2 className={styles.logoutHeading}>Du måste logga ut för att kunna registrera ny användare!</h2>
                    <Link onClick={handleLogout} to="/users/register" className={styles.toLogin}>Logga ut</Link>
                </div>
            )}
            {showPopup && (
                <RegisterPopup setShowPopup={setShowPopup} msg={"Du är nu registrerad!"} route={"/users/login"} linkText={"Logga in"} />
            )}
        </div>
    );
}

export default Register;